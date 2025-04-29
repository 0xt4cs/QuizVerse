import Navigation from "../navigation/nav";
import { useNavigate } from 'react-router-dom';
import Footer from "../footer/footerName"

export default function Home(){
    const navigate = useNavigate();

    const goToQuiz = () => {
      navigate('/quiz');
    };
    return(
        <div className='flex flex-col justify-center items-center w-screen h-screen'>
            <Navigation />
            <div className='flex flex-col justify-center items-center  w-[70%] h-[92%] gap-8'>
                <div className=" flex items-center h-[160px] gap-5 animate-slideup">
                    <img
                    className="h-full w-auto"
                    src="/quizverse.png"
                    alt="CCS Logo"
                    />
                </div>

                <div className="w-[73%] text-[20px] text-white animate-slideup">
                    <p className=" text-center font-Josefin-Sans">
                    A Quiz App using Open Trivia Database (OpenTDB) generates trivia questions from various categories by fetching them from the OpenTDB API. Users can select categories, difficulty levels, and question types, with the app tracking their scores for a fun and interactive experience.
                    </p>
                </div>
                <div className="mt-[30px] animate-slideup">
                <button className="border-[1px] bg-[#050820] border-white text-[22px] text-white px-[60px] py-[10px] rounded-full hover:bg-white hover:text-[#050820] transition-all duration-500"
                 onClick={goToQuiz}>Get Started</button>
                </div>
                <div className="absolute bottom-5 animate-slideup">
                    <Footer />
                </div>
            </div>
        </div>
    );
}