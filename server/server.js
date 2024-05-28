const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/dbconfig')
const eventRoutes = require('./routes/eventRoutes')
const { google } = require('googleapis');




const app = express()
dotenv.config()
app.use(cors())
connectDB()
app.use(express.json())

app.use('/api/events', eventRoutes)


const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);



const SCOPES = ['https://www.googleapis.com/auth/calendar'];


let tokens = null

app.get('/api/google/auth', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: SCOPES,
    });
    res.redirect(url);
});


app.get('/api/google/callback', async (req, res) => {

    const { code } = req.query;
    try {
        const { tokens: receivedTokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(receivedTokens);
        tokens = receivedTokens
        const redirectUrl = `http://localhost:3000/calendar`;
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('Error retrieving tokens:', error);
        res.status(500).send('Authentication failed');
    }
});



app.post('/api/google/create-event', async (req, res) => {
    if (!tokens) {
        return res.status(401).send('Not authenticated');
    }

    oauth2Client.setCredentials(tokens);

    const { summary, description, start, end, attendees } = req.body;

    const event = {
        summary,
        description,
        start: { dateTime: start, timeZone: 'Asia/Kolkata' },
        end: { dateTime: end, timeZone: 'Asia/Kolkata' },
        attendees: attendees,
    };

    try {
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error creating event');
    }
});


const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`App running on port ${process.env.PORT}`)
})