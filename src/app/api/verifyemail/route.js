import { connect } from "@/db/db";
import { User } from "@/model/users/register";
import { NextResponse } from "next/server";

connect();
export async function POST(request) {
    try {
        let reqBody = await request.json();
        let { verifyToken } = reqBody;
        console.log("recieved token :",verifyToken);
 
        let user = await User.findOne({
            verifyToken,
            verifyTokenExpiry: { $gt: Date.now() },
        });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid token !!!", success:false, message:"invalid token " },
                { status: 400 }
            );
        }
        // console.log(user.verifyTokenExpiry, Date.now());

        (user.verifyToken = undefined), (user.verifyTokenExpiry = undefined);
        user.isVerified = true;
        await user.save();

        return NextResponse.json(
            { success: true, message: "email verified successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
