import {Link} from 'react-router-dom';

export default function getStarted(){
    return(
        <>
             <Link
             className="border-[1px] border-white text-[20px]"
             to={"/quiz"}>Get Started</Link>
        </>
    );
}