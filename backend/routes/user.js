const express = require('express');
const router = express.Router();
const fetchUserID = require('../middleware/verifyUser.js');
const userController = require('../controllers/userController.js');
const {
    fetchUserProfile,
    fetchSubordinatesByLocation
} = userController;


router.get('/fetch-user-profile', fetchUserID, fetchUserProfile);


router.post('/fetch-subordinates-by-location', fetchUserID, fetchSubordinatesByLocation);


module.exports = router;