import { patients } from "@/constants";
import CustomFilter from "./CustomFilter";
import Button from "./Button";

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
    const alldata = data.slice(-1);
    return alldata

  } catch (error) {
    console.log(error)
  }
}

const Patient = async () => {

  
  const data = await getData()
  

  return (
    <div className='flex flex-col justify-center items-center mt-10'>
      <h1 className='text-xl font-bold'>Select Options</h1>
      <div className="my-10 pb-10">
        <CustomFilter title='patient' options={patients} data={data} />
        <div className=" flex gap-4 justify-center items-center">
          {
            data?.map((item: any) => {
              return (
                <div key={item} className="mt-40">
                  <h2 className='font-bold'>Counter Assigned: </h2> {item}
                </div>
              )
            })}
        </div>
      </div>
      <Button />
    </div>
  )
};

export default Patient;
