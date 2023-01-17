const express = require('express');
const {
    fetchUserEods,
    fetchSubordinateEods,
    rejectEod,
    approveEod
} = require('../controllers/eodController');
const fetchUserID = require('../middleware/verifyUser');
const router = express.Router();


router.post('/fetch-user-eods', fetchUserID, fetchUserEods);


router.post('/fetch-subordinate-eods', fetchUserID, fetchSubordinateEods);


router.get('/approve-eod/:id', fetchUserID, approveEod);


router.get('/reject-eod/:id', fetchUserID, rejectEod);


module.exports = router;