import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/userProvider';
import axios from 'axios';
import emailjs from "@emailjs/browser";
import _ from 'lodash';

export default function PaymentReminder(props) {
    const { user } = useContext(AppContext);
    const [myEvents, setMyEvents] = useState(props.myEvents);
    const [eventsWithSentEmail, setEventsWithSentEmail] = useState([]);

    useEffect(() => {
        emailjs.init("wPdDHVvi7s6mVDFr1");
    }, []);

    useEffect(() => {
        let sorted = _.sortBy(myEvents, (event) => new Date(event.start));
        console.log(sorted);
        if (sorted.length > 0 && Date.parse(sorted[0].end) < Date.now()) {
            const eventsWithSentEmail = JSON.parse(localStorage.getItem('eventsWithSentEmail')) || [];
            if (!eventsWithSentEmail.includes(sorted[0].id)) {
                console.log("hi from payment");
                sendMail();
                const updatedEventsWithSentEmail = [...eventsWithSentEmail, sorted[0].id];
                localStorage.setItem('eventsWithSentEmail', JSON.stringify(updatedEventsWithSentEmail));
            }
        }
    }, [myEvents]);



    const sendMail = async () => {
        let data = {
            service_id: 'service_6jj4e0f',
            template_id: 'template_h3q755e',
            user_id: 'wPdDHVvi7s6mVDFr1',
            template_params: {
                'from_name': 'auto-drive',
                'to_name': `${user.first_name} ${user.last_name}`,
                'message': `עליך לשלם `,
                'recipient': user.email
            }
        };
        try {
            let resp = await axios({
                method: "POST",
                url: "https://api.emailjs.com/api/v1.0/email/send",
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log(resp)
            // alert("sent succeessfully");
            return resp;

        } catch (err) {
            throw err;
        }
    }
    return (
        <div></div>
    )
}
