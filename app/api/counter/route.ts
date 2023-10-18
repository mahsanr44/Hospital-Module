import Counter from "@/lib/models/counter.model";
import Token from "@/lib/models/token.model";
import { connectDB } from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    // Database Connection
    connectDB();

    // Destructuring
    const requestBody = await request.json();
    const { tokenNumber, patientType, counterNumber,counterId } = requestBody;

    console.log(requestBody);

    // Check if the request body has the required fields
    if (tokenNumber && patientType && counterNumber) {
      // Saving the patient data to the database
      const counter = new Counter({
        tokenNumber,
        patientType,
        counterNumber,
      });
      await counter.save();
    } else {
      console.log("Missing currentToken or patientType or counterNumber ");
    }

    // Saving the data to Token Table
    const tokenTable = new Token({
      patientType,
      tokenNumber,
      counterId
    });
    await tokenTable.save();

    // Sending response to the frontend
    return Response.json({ message: "Patient data added successfully" });
  } 
  catch (error) {

    console.log(error);
    // Sending error response to the frontend
    return Response.json({
      error: "Error",
    });
  }
};




export const GET = async (request: NextRequest, response: NextResponse) =>{
  try {
    connectDB();

    const data = await Counter.find().select("_id").exec();

    if (!data) throw new Error("No product fetched");

    // Map the data to extract and convert _id values to ObjectId
    const ids = data.map(item => new mongoose.Types.ObjectId(item._id));
    return NextResponse.json({
      message: "OK",
      data: ids,
    });
  }
  catch{
    console.log('error in catch')
  }
}