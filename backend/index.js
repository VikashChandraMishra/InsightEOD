require("dotenv").config();

const cors = require('cors');
const bodyParser = require('body-parser')
const express = require('express');
const schedule = require('node-schedule');

const User = require("./models/User.js");

const app = express();
const port = process.env.PORT;

const connectToMongo = require('./db.js');
connectToMongo();

// TO ALLOW CROSS-ORIGIN-RESOURCE-SHARING
app.use(cors());

// TO MAKE RECEIVED DATA COMPREHENSIBLE
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/save-data', require('./routes/saveData.js'));
app.use('/api/fetch-stats', require('./routes/stats.js'));
app.use('/api/user', require('./routes/user.js'));
app.use('/api/eod', require('./routes/eod.js'));


// app.use('/api/admin', require('./routes/admin.js'));
// app.use('/api/employee', require('./routes/user.js'));
// app.use('/api/common-path', require('./routes/commonPath.js'));


// TO RESET CURRENT SUBMISSION STATUS OF ALL USERS 
schedule.scheduleJob('59 4 0 * * *', async () => {
    const users = await User.find();

    for (let i = 0; i < users.length; i++) {
        users[i].currentSubmission = "not done";
        await users[i].save();
    }
});


app.listen(port, () => {
    console.log(`API listening on port ${port}`);
}); 