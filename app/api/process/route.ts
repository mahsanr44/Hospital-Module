import ProcessFlow from "@/lib/models/processflow.model";
import { connectDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    // Database Connection
    connectDB();

    // Destructuring
    const requestBody = await request.json();
    const { processFlow } = requestBody;

    console.log(requestBody);

    // Check if the request body has the required fields
    if (processFlow) {
      // Saving the patient data to the database
      const pFlow = new ProcessFlow({
        processFlow
      });
      await pFlow.save();
    } else {
      console.log("Missing currentToken or patientType or counterNumber ");
    }

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

export const GET = async (request: NextRequest, response: NextResponse) => {
    try {
      connectDB();
  
      const data = await ProcessFlow.find().exec();
  
      if (!data) throw new Error("No product fetched");
  
      return NextResponse.json({
        message: "OK",
        data: data, // Return all the data
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
  