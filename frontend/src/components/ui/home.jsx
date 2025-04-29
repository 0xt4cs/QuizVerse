import { Link } from 'react-router-dom';

export default function Homebtn() {
    return (
        <div className='flex gap-10'>
            <Link
                className="border-[1px] border-white text-[20px] py-[5px] px-[25px] hover:bg-white hover:text-[#050820]"
                to={"/"}>Home</Link>
            <Link
                className="border-[1px] border-white text-[20px] py-[5px] px-[25px] hover:bg-white hover:text-[#050820]"
                to={"/quiz"}>
                Try again
            </Link>
        </div>
    );
}