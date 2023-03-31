import { useNavigate} from "react-router-dom";

export function Success() {
    const navigate = useNavigate();

    return ( <div className="h-[100vh] lg:absolute lg:left-[35%] lg:top-[12%] lg:w-[60%] flex flex-col items-center justify-center">
       <svg fill="#000000" width="200px" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>success-standard-line</title> <path class="clr-i-outline clr-i-outline-path-1" d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z"></path><path class="clr-i-outline clr-i-outline-path-2" d="M28,12.1a1,1,0,0,0-1.41,0L15.49,23.15l-6-6A1,1,0,0,0,8,18.53L15.49,26,28,13.52A1,1,0,0,0,28,12.1Z"></path> <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect> </g></svg>
        <p className="text-center mt-[1rem] text-2xl mx-[1rem]">THANK YOU!! Your Order Is Being Processed</p>
        <button className="text-white rounded-[20px] bg-[#deab24] font-bold w-[50%] mt-[2rem] py-[0.5rem] px-[1rem]" onClick={() => {
            navigate("/");
        }} >Continue Shopping</button>
    </div> );
}

