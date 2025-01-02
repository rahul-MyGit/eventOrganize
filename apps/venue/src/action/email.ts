"use server"

import sgMail from "@sendgrid/mail"

interface sendEmailTypes {
    to: string;
    subject: string;
    text: string
}
export async function sendEmail ({to, subject, text}: sendEmailTypes) {
    if(!process.env.SENDGRID_API_KEY) {
        throw new Error("SENDGRID_API_KEY env varisble is not set");
    }
    if(!process.env.EMAIL_FROM) {
        throw new Error("EMAIL_FROM env variable is not set");
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const message = {
        to: to.toLocaleLowerCase().trim(),
        from: process.env.EMAIL_FROM,
        subject: subject.trim(),
        text: text.trim()
    }

    try {
        const [response] = await sgMail.send(message)
        console.log("Email sent", response)

        if(response.statusCode !== 202){
            throw new Error("sendGrid response status is: " + response.statusCode);
        }

        return {
            success: true,
            messageId: response.headers["x-message-id"]
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to send email. Please try again later"
        }
    }
}