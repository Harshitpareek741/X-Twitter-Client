import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function Header({title , subtitle,button,href}){
    return (
        <div className="h-17  grid grid-cols-12  sticky top-0 ">
        
        <div className="col-span-1 flex flex-col justify-center mx-3">
        <Link href={`${href}`}>
          <FaArrowLeft />
          </Link>
        </div>
      
        <div className="flex flex-col col-span-8 mx-5">
          <h2 className="font-bold text-xl">{title}</h2>
          <p className="text-sm opacity-40">{subtitle}</p>
        </div>
        <form action={`${href}`}></form>
        <button className="col-span-2 -mx-1 text-black text-lg my-2 bg-white rounded-full px-2 font-semibold ">
          {button}
        </button>
      </div>
    )
}