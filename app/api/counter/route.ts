import Counter from "@/lib/models/counter.model";
import Token from "@/lib/models/token.model";
import { connectDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    // Database Connection
    connectDB();

    // Destructuring
    const requestBody = await request.json();
    const { tokenNumber, patientType, counterNumber } = requestBody;

    console.log(requestBody);

    // Check if the request body has the required fields
    if (tokenNumber && patientType && counterNumber) {
      // Saving the patient data to the database
      const counter = new Counter({
        tokenNumber,
        patientType,
        counterNumber,
      });
      const counterData = await counter.save();
      var counterId = counterData._id;

      console.log(counterData._id);
    } else {
      console.log("Missing currentToken or patientType or counterNumber ");
    }

    // Saving the data to Token Table
    const tokenTable = new Token({
      patientType,
      tokenNumber,
      counterId,
    });
    await tokenTable.save();

    // Sending response to the frontend
    return Response.json({
      message: "Patient data added successfully",
      currId: counterId,
      paType: patientType,
    });
  } catch (error) {
    console.log(error);
    // Sending error response to the frontend
    return Response.json({
      error: "Error",
    });
  }
};

export const DELETE = async (request: NextRequest, response: NextResponse) => {
  try {
    // Database Connection
    connectDB();

    // Find the last record in the Counter collection
    const lastCounter = await Counter.findOne().sort({ _id: -1 });

    if (lastCounter) {
      // Delete the last record from the Counter collection
      await Counter.deleteOne({ _id: lastCounter._id });

      // Delete the corresponding record from the Token collection
      await Token.findOneAndDelete({ counterId: lastCounter._id });

      // Sending a success response to the frontend
      return Response.json({
        success: "Lat Record Deleted Successfully",
      });
    } else {
      // Sending a response indicating there was no data to delete
      return Response.json({
        error: "Error in else",
      });
    }
  } catch (error) {
    console.error(error);
    // Sending an error response to the frontend
    return Response.json({
      error: "Error deleting the record",
    });
  }
};
