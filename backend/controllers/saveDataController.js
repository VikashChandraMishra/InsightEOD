const Report = require("../models/Report");
const User = require("../models/User");

const {
    ADMIN_USERNAME,
} = process.env;


// SAVE EOD
exports.saveEOD = async (req, res) => {
    try {
        const id = req.id;
        const {
            task
        } = req.body;

        // If user does not exist the function returns
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.json({
                success: false,
                message: "user does not exist"
            });

        }

        // If eod submission is done for the current date the function returns 
        if (existingUser.currentSubmission == "done") {
            return res.json({
                success: false,
                message: "Only one EOD can be submitted per day"
            })
        }

        // If eod submission is not done for the current date it is set as done for the user and
        // the eod is saved
        if (existingUser.currentSubmission == "not done") {
            existingUser.currentSubmission = "done";
        }

        await existingUser.save();

        await Report.create({
            empID: existingUser.empID,
            task: task
        });

        return res.json({
            success: true,
            message: "eod successfully submitted"
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error!");
    }
}


// REGISTER USERS
exports.register = async (req, res) => {
    try {
        const {
            username,
            password,
            name,
            empID,
            gender,
            mobile,
            email,
            designation,
            reportingManagerID,
            branch
        } = req.body;

        const existingUser = await User.findOne({
            $or: [{ username: username }, { empID: empID }, { mobile: mobile }, { email: email }]
        });

        if (existingUser) {
            return res.json({
                success: false,
                message: "user already registered"
            });

        }

        // Reporting manager ID '0' refers to the Admin
        // Checks if the user to be reported to exists
        // If not, registration terminates
        // Else, the reporting manager's subordinate-count is increased by one
        var reportingManager = {};
        if (reportingManagerID != 0) {
            reportingManager = await User.findOne({ empID: reportingManagerID });

            if (!reportingManager) {
                return res.status(404).json({
                    success: false,
                    message: "reporting manager with the given ID does not exist"
                });

            } else {
                reportingManager.subordinateCount = reportingManager.subordinateCount + 1;
                await reportingManager.save();
            }

        } else if (reportingManagerID == 0) {
            reportingManager.name = "admin";
        }
        // User data is saved 
        // Except the fields 'subordinateCount' and 'currentSubmission'
        await User.create({
            username: username,
            password: password,
            name: name,
            empID: empID,
            gender: gender,
            mobile: mobile,
            email: email,
            designation: designation,
            reportingManagerID: reportingManagerID,
            reportingManagerName: reportingManager.name,
            branch: branch
        });

        return res.json({
            success: true,
            message: "user successfully registered"
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error!");
    }
}