import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';

export default function  AddEvent  () {
  const [accessToken, setAccessToken] = useState('');

  const handleLogin = (response) => {
    // Extract the access token from the response
    const { accessToken } = response;
    setAccessToken(accessToken);
  };

  const handleCreateEvent = async () => {
    try {
      // Send a POST request to your Node.js backend with the access token and event details
      const response = await fetch('/api/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          summary: 'New Event',
          start: '2023-06-26T10:00:00',
          end: '2023-06-26T12:00:00',
        }),
      });

      // Handle the response from the backend
      if (response.ok) {
        console.log('Event created successfully!');
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event', error);
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      {accessToken ? (
        <button onClick={handleCreateEvent}>Create Event</button>
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

