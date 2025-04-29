import Firstprofile from "./profile/mendeja";
import Firstinformation from "./profile/mInfo";



export default function Mendeja() {
    return (
        <div className="w-screen h-screen flex justify-center items-center  " id="mendeja">
            <div className="flex justify-between items-center gap-5 h-full w-3/5 animate-[.4s_slideup_ease-in-out]">
                <div className="rounded-2xl w-[30%] h-4/5 py-12  bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 overflow-hidden">
                    <Firstprofile />
                </div>
                <div className="w-2/3 h-4/5 py-[20%] rounded-2xl  bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 overflow-hidde">
                    <Firstinformation />
                </div>
            </div>
        </div>
    );
}