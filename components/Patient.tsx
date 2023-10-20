import { patients } from "@/constants";
import CustomFilter from "./CustomFilter";
import Button from "./Button";

const Patient = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-10'>
      <h1 className='text-xl font-bold'>Select Options</h1>
      <div className="my-10 pb-10">
        <CustomFilter title='patient' options={patients} />
      </div>
      <Button />
    </div>
  )
};

export default Patient;
