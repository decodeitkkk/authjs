import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { User } from "@/model/users/register";

export const sendmail = async ({ email, emailType, userId }) => { 
    try {
        console.log(email, emailType, userId)
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        const transporter = nodemailer.createTransport({
            // host: "smtp.ethereal.email",
            // port: 587,
            // secure: false, // Use `true` for port 465, `false` for all other ports
            // auth: {
            //     user: "maddison53@ethereal.email",
            //     pass: "jn7jnAPss4f63QBp6D",
            // },
            // host: process.env.SERVICE,
            service:process.env.SERVICE,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            
            to: email, // list of receivers
            subject:
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password",
            html: `<p>Click 
            <a href=" ${
                emailType === "VERIFY"
                    ? process.env.DOMAIN + "/verifyemail?token=" + hashedToken
                    : process.env.DOMAIN + "/resetpassword?token=" + hashedToken
            } ">Here</a> to ${
                emailType === "VERIFY"
                    ? "Verify Your Email"
                    : "Reset Your Password"
            }. or copy and paste the link below in your browser. <br> ${
                process.env.DOMAIN
            }/${emailType ==="VERIFY"? "verifyemail" : "resetpassword"}?token=${hashedToken} </p>`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error) {
        throw new Error(error.message);
    }
};
