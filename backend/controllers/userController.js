const User = require("../models/User");
const {
    ADMIN_USERNAME
} = process.env;

// Fetches personal data of users
exports.fetchUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.id);

        if (!user) {
            return res.json({
                success: false,
                message: "user does not exist"
            });

        }

        return res.status(200).json({
            success: true,
            message: "user profile retrieved",
            user: user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error!");
    }
}


// Fetches personal data of users
exports.fetchSubordinatesByLocation = async (req, res) => {
    try {
        const { location } = req.body;
        var subordinates = [];

        if (req.id == ADMIN_USERNAME) {
            subordinates = await User.find({ branch: location });

        } else if (req.id != ADMIN_USERNAME) {
            const user = await User.findById(req.id);

            if (!user) {
                return res.json({
                    success: false,
                    message: "user does not exist"
                });

            }

            subordinates = await User.find({ reportingManagerID: user.empID, branch: location });
        }

        return res.json({
            success: true,
            subordinates: subordinates,
            message: "subordinates' list successfully fetched"
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error!");
    }
}