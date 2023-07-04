// import React from 'react'

// export default function Mail() {
//     const sendMail =()=>{
//         var data = {
//             service_id: 'service_6jj4e0f',
//             template_id: 'template_h3q755e',
//             user_id: 'wPdDHVvi7s6mVDFr1',
//             template_params: {
//                 'from_name': 'auto-drive',
//                 'to_name':`${user.first_name} ${user.last_name} היקר`,
//                 'message':`עליך לשלם `
//             }
//         };
         
//         $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
//             type: 'POST',
//             data: JSON.stringify(data),
//             contentType: 'application/json'
//         }).done(function() {
//             alert('Your mail is sent!');
//         }).fail(function(error) {
//             alert('Oops... ' + JSON.stringify(error));
//         });
//     }
   
//   return (
//     <div>Mail</div>
//   )
// }
