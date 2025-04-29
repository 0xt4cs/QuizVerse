import Navigation  from "../navigation/nav";
import Taculad from "./taculad";
export default function Mendeja(){

    return(
        <div className="h-screen">
            <Navigation className='fixed'/>
            <div className="h-full flex items-center justify-center gap-5">
                <div className="h-[70%] w-[25%] border-2 rounded-[10px] bg-[#050820] flex flex-col items-center justify-center">
                    <div className="border-2 h-[10%] ra">
                        <img src="" alt="" />
                    </div>
                    <div className="flex items-center justify-center">
                        
                        <div>
                        <div className="text-white p-2 px-4">
                            <p>Leivi</p>
                            <p>John Rayvie</p>
                            <p>Mendeja</p>
                            <p>N/A</p>
                            <p>Filipino</p>
                            <p>January 16 2004</p>
                            <p>20</p>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="h-[70%] w-[45%] border-2 rounded-[10px] bg-[#050820]">

                </div>
            </div>
        </div>
    );
}
