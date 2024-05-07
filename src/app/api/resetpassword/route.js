import { User } from "@/model/users/register";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request) {
    try {
        let reqBody = await request.json();
        let { token, password } = reqBody;
        console.log(password, token);

        let user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });

        console.log(user);

        if (!user) {
            return NextResponse.json(
                { error: "Invalid token !!!" },
                { status: 400 }
            );
        }

        // hashing password
        
        const salt = await bcryptjs.genSalt(10);
        let hashedPassword = await bcryptjs.hash(password, salt);



        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json(
            { success: true, message: "password changed successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
