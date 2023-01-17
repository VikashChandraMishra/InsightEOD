const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const {
    SECRET_KEY,
    ADMIN_USERNAME,
    ADMIN_PASSWORD
} = process.env;


// LOGS IN AS EITHER AN ADMIN OR A REGULAR USER
exports.login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            const authToken = jwt.sign(ADMIN_USERNAME, SECRET_KEY);

            return res.status(200).json({
                success: true,
                authToken: authToken,
                user: "admin",
                isReportingManager: true
            });
            
        } else {
            const existingUser = await User.findOne({ username, password });
            var isReportingManager = false;

            if(existingUser.subordinateCount > 0) isReportingManager = true;

            if (!existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "incorrect credentials"
                });

            } else {
                const authToken = jwt.sign(existingUser.id, SECRET_KEY);

                return res.status(200).json({
                    success: true,
                    authToken: authToken,
                    user: "user",
                    isReportingManager: isReportingManager
                });
            }
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
}