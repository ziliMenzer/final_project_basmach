const { google } = require('googleapis');
const { auth, authAdmin } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();


router.post("/addEvent", async (req, res) => {
  const { summary, start, end } = req.body;
  const { accessToken } = req.headers;

  // Create a new OAuth2 client with your client ID and secret
  const oAuth2Client = new google.auth.OAuth2(
    'YOUR_CLIENT_ID',
    'YOUR_CLIENT_SECRET'
  );

  try {
    // Set the access token for the client
    oAuth2Client.setCredentials({ access_token: accessToken });

    // Create a new instance of the Google Calendar API
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    // Create the event object
    const event = {
      summary,
      start: {
        dateTime: start,
        timeZone: 'YOUR_TIMEZONE',
      },
      end: {
        dateTime: end,
        timeZone: 'YOUR_TIMEZONE',
      },
};

    // Insert the event into the calendar
    const createdEvent = await calendar.events.insert({
      calendarId: 'primary', // 'primary' represents the user's primary calendar
      resource: event,
    });

    console.log('Event created:', createdEvent.data);

    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

router.get("/",async (req, res) => {
    const { accessToken } = req.headers;
  
    // Create a new OAuth2 client with your client ID and secret
    const oAuth2Client = new google.auth.OAuth2(
      'YOUR_CLIENT_ID',
      'YOUR_CLIENT_SECRET'
    );
  
    try {
      // Set the access token for the client
      oAuth2Client.setCredentials({ access_token: accessToken });
  
      // Create a new instance of the Google Calendar API
      const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  
      // Get the list of events from the user's primary calendar
      const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });
  
      const events = response.data.items;
  
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events', error);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });
module.exports =router;