
export default function Secondinformation() {
    return (
        <>
            <div className="w-full h-4/5 font-inria-sans text-white">
                <div className="flex flex-col h-full w-full items-center justify-center gap-14 slidedown">
                    <div className="flex w-2/3 justify-between text-4xl ">
                        <p className="underline underline-offset-8 ">EDUCATION</p>
                        <p className="underline underline-offset-8"></p>
                    </div>
                    <div className="flex w-2/3 flex-col gap-5">
                        <div className="flex flex-col w-full uppercase">
                            <h1 className="text-3xl font-black ">elementary</h1>
                            <p className="px-4 text-slate-300"><b className="text-[20px]">2010 - 2012 : </b> bangkulasi elementary school</p>
                            <p className="px-4 text-slate-300"><b className="text-[20px]">2012 - 2017 : </b> malabon elementary school</p>
                        </div>
                        <div className="flex flex-col w-full uppercase">
                            <h1 className="text-2xl font-black">junior highschool</h1>
                            <p className="px-4 text-slate-300"><b className="text-[20px]">2017 - 2020 : </b> MALABON NATIONAL HIGH SCHOO</p>
                        </div>
                        <div className="flex flex-col w-full uppercase">
                            <h1 className="text-2xl font-black">senior highschool</h1>
                            <p className="px-4 text-slate-300"><b className="text-[20px]">2020 - 2022 : </b>arellano university : jose rizal campus</p>
                        </div>
                        <div className="flex flex-col w-full uppercase">
                            <h1 className="text-2xl font-black">college</h1>
                            <p className="px-4 text-slate-300"><b className="text-[20px]">2022 - 2024 :</b> city of malabon university</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}