import Link from "next/link";
import { FC } from "react";
import { FaArrowLeft } from "react-icons/fa6";
// import {Button } from "@material-tailwind/react"
interface HeaderProps {
  title: string;
  subtitle: string;
  button: string;
  href: string;
}

const Header : React.FC<HeaderProps> = ({title , subtitle,button,href}) =>{
    return (
        <div className="h-17  grid grid-cols-12  sticky top-0 ">
        
        <div className="col-span-1 flex flex-col justify-center items-center mx-3">
        <Link href={`${href}`}>
          <FaArrowLeft />
          </Link>
        </div>
      
        <div className="flex flex-col col-span-8 mx-5 justify-center">
          <h2 className="font-bold text-xl">{title}</h2>
          <p className="text-sm opacity-40">{subtitle}</p>
        </div>
        <form action={`${href}`}>
        {/* <Button color="blue">
          {button}
        </Button> */}
        </form>
      </div>
    )
}

export default Header;