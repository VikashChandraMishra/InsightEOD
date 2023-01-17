const Report = require("../models/Report");
const User = require("../models/User");


exports.fetchUserEods = async (req, res) => {
    try {
        const {
            begin,
            end
        } = req.body;

        const beginDate = new Date(begin);
        const endDate = new Date(end);

        const user = await User.findById(req.id);
        if (!user) {
            return res.json({
                success: false,
                message: "user does not exist"
            });
        }

        const eods = await Report.find({ "empID": user.empID, "date": { "$gte": beginDate, "$lt": endDate } });

        return res.json({
            success: true,
            message: "eods' list successfully fetched",
            eods: eods
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error!");
    }
}


exports.fetchSubordinateEods = async (req, res) => {
    try {
        const {
            begin,
            end
        } = req.body;

        const beginDate = new Date(begin);
        const endDate = new Date(end);

        const eods = await Report.find({ "empID": req.header('empID'), "date": { "$gte": beginDate, "$lt": endDate } });
        return res.json({
            success: true,
            message: "eods' list successfully fetched",
            eods: eods
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error!");
    }
}


exports.approveEod = async (req, res) => {
    try {
        const userId = req.id;
        const eodId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.json({
                success: false,
                message: "user does not exist"
            });

        }
        const eod = await Report.findById(eodId);

        if (!eod) {
            return res.json({
                success: false,
                message: "eod does not exist"
            });

        } else {
            eod.status = "approved";

            await eod.save();

            return res.json({
                success: true,
                message: "eod approved successfully"
            });
        }

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error!");
    }
}


exports.rejectEod = async (req, res) => {
    try {
        const userId = req.id;
        const eodId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.json({
                success: false,
                message: "user does not exist"
            });

        }

        const eod = await Report.findById(eodId);

        if (!eod) {
            return res.json({
                success: false,
                message: "eod does not exist"
            });

        } else {
            eod.status = "rejected";

            await eod.save();

            return res.json({
                success: true,
                message: "eod rejected successfully"
            });
        }

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error!");
    }
}