import Rayvie from '../../../assets/img/mendeja.jpg';

export default function Firstprofile() {
    return (
        <div className="flex flex-col w-full h-ful justify-center gap-9">
        <div className="h-36 w-full flex justify-center align-middle ">
            <img
            className='h-full rounded-full'
            src={Rayvie}
            alt="My profile image" />
        </div>
        <div className="flex text-white font-inria-sans justify-center text-[14px]">
            <div className="text-right px-3 flex flex-col gap-2">
                <p>FIRST NAME</p>
                <p>LAST NAME</p>
                <p>M.I</p>
                <p>NICKNAME</p>
                <p>LOCATION</p>
                <p>PHONE #</p>
                <p>LANGUAGE</p>
                <p>GENDER</p>
                <p>STATUS</p>
                <p>SOCIAL MEDIA</p>
            </div>
            <div className="px-3 border-solid border-l-2 flex flex-col gap-2">
                <p>JOHN RAYVIE</p>
                <p>MENDEJA</p>
                <p>N/A</p>
                <p>LEIVI</p>
                <p>MALABON CITY</p>
                <p>09123456789</p>
                <p>TAGLISH</p>
                <p>MALE</p>
                <p>SINGLE</p>
                <p>FACEBOOK</p>
                <p>INSTAGRAM</p>
                <p>TIKTOK</p>
            </div>
        </div>
        <div className="flex w-full justify-center ">
            <a href="#tacs">

            </a>
        </div>
    </div>
    );
}