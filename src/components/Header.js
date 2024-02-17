import React from 'react';
import SiteHeader from '../assets/SiteHeader.png'
import { useNavigate } from "react-router-dom";

const Header = () =>{
    const navigate = useNavigate();

    const redirectToPreview = () => {
      navigate("/preview");
    };

    return(
        <section className='bg-black h-20 flex justify-between text-white flex-row align-center px-5'>
            <div className='flex flex-row items-center'>
                <img src={SiteHeader} className='pr-10 '/>
                <p className='pr-5'>Sections</p>
                <p className='pr-5'>Preferences</p>
            </div>
            <div className='flex flex-row items-center'>
                <p className='pr-5' onClick={redirectToPreview}>Preview</p>
                <p className='pr-5 bg-sky-500 p-3 rounded-3xl w-32 flex justify-center'>Publish</p>
            </div>
        </section>
    )
}

export default Header