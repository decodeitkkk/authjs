import { connect } from "@/db/db";
import { sendmail } from "@/helper/mailer";
import { User } from "@/model/users/register";
import { NextResponse } from "next/server";

connect();
export async function POST(request) {
    try {
        let reqBody = await request.json();
        let { email } = reqBody;
        let user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid email address!!!" },
                { status: 404 }
            );
        }

        // send reset password mail
        await sendmail({email:user.email, emailType : "RESET", userId:user._id});
        return NextResponse.json(
            { message: "Verification email sent", success:true },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
