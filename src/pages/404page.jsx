import { Link } from "react-router-dom";


export function Page404() {
    return ( <div className="flex flex-col items-center lg:absolute lg:top-[13%] pt-[70px] lg:left-[35%] lg:z-[-1] lg:w-[60%]">
        <div className="h-[100vh] flex flex-col items-center justify-center w-[80%] mt-[-3rem]">
            <p className="text-[8rem]">Oops!</p>
            <p className="text-[2rem]">404 - PAGE NOT FOUND</p>
            <p className="text-center">The page you are looking for might have been removed or temporarily unavailable</p>
        <Link to="/">
        <button className="text-white rounded-[20px] bg-[#deab24] font-bold mt-[2rem] py-[0.5rem] px-[1rem]">GO TO HOMEPAGE</button>
        </Link>
        </div>
    </div> );
}
