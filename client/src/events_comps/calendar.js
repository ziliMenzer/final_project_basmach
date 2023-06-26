import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
export default function Calendar() {
  const [accessToken, setAccessToken] = useState('');
  const [events, setEvents] = useState([]);

  const handleLogin = (response) => {
    // Extract the access token from the response
    const { accessToken } = response;
    setAccessToken(accessToken);
  };

  const fetchEvents = async () => {
    try {
      // Send a GET request to your Node.js backend to fetch the user's events
      const response = await fetch('/api/events', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Handle the response from the backend
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events', error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchEvents();
    }
  }, [accessToken]);

  return (
    <div>
      <h1>Calendar</h1>
      {accessToken ? (
        <div>
          <button onClick={fetchEvents}>Refresh Events</button>
          {events.length > 0 ? (
            <div className="calendar">
              {events.map((event) => (
                <div key={event.id} className="event">
                  <div className="event-title">{event.summary}</div>
                  {event.attendees && event.attendees.length > 0 && (
                    <div className="event-participants">
                      Participants:{' '}
                      {event.attendees.map((participant) => (
                        <span key={participant.email}>
                          {participant.email},{' '}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No events to display.</p>
          )}
        </div>
      ) : (
        <GoogleLogin
          clientId="YOUR_CLIENT_ID"
          buttonText="Login with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy="single_host_origin"
        />
      )}
    </div>
  );
};