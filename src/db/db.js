import mongoose from "mongoose";

export async function connect() {
 try {
    mongoose.connect(process.env.MONGO_URL+"/authjs2")
    const connection = mongoose.connection;

    connection.on("connected",()=>{
        console.log(`MongoDB connected successfully`)
    })
    connection.on("error",(error)=>{
        console.log(`DB not connected, Some error`,error)
        process.exit();
    })
 } catch (error) {
    console.log(`Something went wrong in DB connection`)
    console.log(error)
    
 }   
}