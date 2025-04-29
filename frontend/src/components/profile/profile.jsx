import Mendeja from './mendeja';
import Taculad from './taculad';
import Navigation from '../navigation/nav';
import FooterName from '../footer/footerName';

export default function Profile(){
    return(
        <div className='h-fit w- screen'>
        <Navigation/>
        <div>
            <Mendeja />
            <Taculad />
        </div>
            <div className='w-screen h-fit grid place-content-center'>
            <FooterName/>
            </div>

        </div>
    );
}