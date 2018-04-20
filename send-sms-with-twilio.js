/**
 * Typescript
 * Twilio version: ^3.15.0
 */
 
import * as Twilio from 'twilio';

// getting ready
const twilioNumber = 'your-twilio-number';
const accountSid = 'AC-something';
const authToken = 'something-something';

const client = new Twilio(accountSid, authToken);

// start sending message

function sendText(){
    const phoneNumbers = [ 'phone-number-1', 'phone-number-2']    

    phoneNumbers.map(phoneNumber => {
        console.log(phoneNumber);
        
        if ( !validE164(phoneNumber) ) {
            throw new Error('number must be E164 format!')
        }
    
        const textContent = {
            body: `You have a new sms from Dale Nguyen :)`,
            to: phoneNumber,
            from: twilioNumber
        }
    
        client.messages.create(textContent)
        .then((message) => console.log(message.to))
    })
}

// Validate E164 format
function validE164(num) {
    return /^\+?[1-9]\d{1,14}$/.test(num)
}
