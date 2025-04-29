import Secondprofile from "./profile/taculad.jsx";
import Secondinformation from "./profile/tInfo.jsx";
import FooterName from "../footer/footerName.jsx";
export default function Taculad(){
    return(
        <div className="w-screen h-screen flex justify-center items-center "
        id="tacs">
            <div className="flex justify-between items-center gap-5 h-full w-3/5 animate-[.4s_slideup_ease-in-out]">
                <div className="rounded-2xl w-[30%] h-4/5 py-12  bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 overflow-hidden">
                    <Secondprofile />
                </div>
                <div className="w-2/3 h-4/5 py-[20%] rounded-2xl  bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 overflow-hidde">
                    <Secondinformation />
                </div>
            </div>
        </div>
    );
}