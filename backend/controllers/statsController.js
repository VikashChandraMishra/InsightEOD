const User = require('../models/User.js');
const Report = require('../models/Report.js');


exports.fetchApprovalStatus = async (req, res) => {
    try {
        var approved = 0;
        var rejected = 0;

        const user = await User.findById(req.id);

        if (!user) {
            return res.json({
                success: false,
                message: "user does not exist"
            });

        }

        eods = await Report.find({ "empID": user.empID });

        for (let i = 0; i < eods.length; i++) {
            if (eods[i].status == "approved") approved += 1;
            else if (eods[i].status == "rejected") rejected += 1;
        }

        const approvalPercentage = Math.round(((approved * 100) / eods.length) * 100) / 100;
        const rejectionPercentage = Math.round(((rejected * 100) / eods.length) * 100) / 100;

        return res.json({
            success: true,
            message: "status data fetched",
            data: { approvalPercentage: approvalPercentage, rejectionPercentage: rejectionPercentage }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}


exports.fetchSubmissionStats = async (req, res) => {
    try {
        var employees = [];
        var submitted = 0;
        var notSubmitted = 0;

        if (req.id == 'admin') {
            employees = await User.find();
        
        } else {
            const user = await User.findById(req.id);

            if (!user) {
                return res.json({
                    success: false,
                    message: "user does not exist"
                });

            }

            employees = await User.find({ "reportingManagerID": user.empID });
        }

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].currentSubmission == "done") submitted += 1;
            else if (employees[i].currentSubmission == "not done") notSubmitted += 1;
        }

        const submissionPercentage = Math.round(((submitted * 100) / employees.length) * 100) / 100;
        const nonSubmissionPercentage = Math.round(((notSubmitted * 100) / employees.length) * 100) / 100;

        return res.json({
            success: true,
            message: "submission data fetched",
            data: { submissionPercentage: submissionPercentage, nonSubmissionPercentage: nonSubmissionPercentage }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}