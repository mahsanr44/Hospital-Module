'use client'
import { useRouter } from "next/navigation";

const Button = () => {

  const router = useRouter()

  const handleButtonClick = () => {
    router.push('/process');
  };

  return (
    <div className="">
      <button
        onClick={handleButtonClick}
        className="border-[3px] hover:border-blue-900 border-blue-700 hover:bg-blue-600 bg-blue-500 text-white rounded-lg py-2 px-2">Proceed Next</button>
    </div>
  )
}

export default Button