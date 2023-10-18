import { patients } from "@/constants";
import CustomFilter from "./CustomFilter";


export const getData = async () => {

  try {
    // Send a GET request to the backend API
    const res = await fetch('http://localhost:3000/api/counter', {
      method: 'GET',
      cache: "no-store",
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      throw new Error(`Error fetching data`)
    }

    const Counterdata = await res.json();
    const data = Counterdata.data;
     return data
  } catch (error) {
    console.log(error)
  }
}

const Patient = async () => {
  const dataId = await getData();

  

  return (
    <div className='flex flex-col justify-center items-center mt-10'>
      <h1 className='text-xl font-bold'>Select Options</h1>
      <div className="my-10 pb-20">
        <CustomFilter title='patient' options={patients} dataId={dataId}/>
        {/* <div className=" flex gap-4 justify-center items-center">
          {
            Counterdata.data?.map((item: any) => {
              return (
                <div key={item.counterNumber}>
                  <h2 className='font-bold'>Patinet Type:</h2> {item.patientType}
                  <h2 className='font-bold'>Token Assigned: </h2>  {item.tokenNumber}
                  <h2 className='font-bold'>Counter Assigned: </h2> {item.counterNumber}
                </div>
              )
            })}
        </div> */}
      </div>
    </div>
  )
};

export default Patient;
