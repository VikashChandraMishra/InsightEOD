const express = require('express');
const router = express.Router();
const saveDataController = require('../controllers/saveDataController.js');
const fetchUserID = require('../middleware/verifyUser.js');

const {
    saveEOD,
    register
} = saveDataController;


router.post('/registration', register);


router.post('/save-eod', fetchUserID, saveEOD);


module.exports = router;