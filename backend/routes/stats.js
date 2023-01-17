const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/verifyUser.js');
const {
    fetchApprovalStatus,
    fetchSubmissionStats
} = require('../controllers/statsController.js')


router.get('/eod-approval-status', fetchUser, fetchApprovalStatus);


router.get('/subordinate-current-eod-submission-status', fetchUser, fetchSubmissionStats);



module.exports = router;