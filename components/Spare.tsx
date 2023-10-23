// // GET Function
// export const getData = async () => {
//     try {
//       // Send a GET request to the backend API
//       const res = await fetch('http://localhost:3000/api/counter', {
//         method: 'GET',
//         cache: "no-store",
//         headers: { 'Content-Type': 'application/json' }
//       });
  
//       if (!res.ok) {
//         throw new Error(`Error fetching data`)
//       }
  
//       const Counterdata = await res.json();
  
//       const data = Counterdata.data;
//       const alldata = data.slice(-1);  // Slicing to get last value in Array
//       return alldata
  
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   GET API
//   export const GET = async (request: NextRequest, response: NextResponse) => {
//     try {
//       connectDB();
  
//       const data = await Counter.find().select("_id").exec();
  
//       if (!data) throw new Error("No product fetched");
  
//       // Map the data to extract and convert _id values to ObjectId
//       const ids = data.map((item) => new mongoose.Types.ObjectId(item._id));
//       return NextResponse.json({
//         message: "OK",
//         data: ids,
//       });
//     } catch {
//       console.log("error in catch");
//     }
//   };
  