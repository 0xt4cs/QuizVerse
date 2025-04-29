import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterName from "../footer/footerName";
import Navigation from "../navigation/nav";
import Brain from '../ui/brain';
import Cpu from '../ui/cpu';
import Leaf from '../ui/leaf';
import { Link } from "react-router-dom";



export default function Quiz() {
        return (
            <div>
                <Navigation />

                <div className='h-[90vh] w-full flex justify-center flex-col items-center'>
                    <div className='w-full text-center text-white font-Josefin-Sans text-[6rem] font-[900] animate-slidedown'>
                        <p>Select Category</p>
                    </div>
                    <div className='w-[70%] h-[60vh] flex justify-center items-center gap-3 text-white animate-slideup'>
                        <Link className='flex justify-center flex-col items-center rounded-2xl w-[28%] h-[75%] bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 hover:bg-slate-50 hover:text-[#050820] transition-all  ease-linear' to={"easy"} >
                            <Brain />
                            <p className='font-bold text-[30px]'>General Knowledge</p>
                            <p className='text-[20px]'>( True or False )</p>
                            <p className='text-[30px] font-semibold'>Easy</p>
                        </Link>
                        <Link className='flex justify-center flex-col items-center rounded-2xl w-[28%] h-[75%] bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 hover:bg-slate-50 hover:text-[#050820] transition-all  ease-linear' to={"medium"}>
                            <Cpu  />
                            <p className='font-bold text-[30px]'>Computers</p>
                            <p className='text-[20px]'>( Multiple Choice )</p>
                            <p className='text-[30px] font-semibold'>Medium</p>
                        </Link>
                        <Link className='flex justify-center flex-col items-center rounded-2xl w-[28%] h-[75%] bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 hover:bg-slate-50 hover:text-[#050820] transition-all  ease-linear'  to={"hard"}>
                            <Leaf />
                            <p className='font-bold text-[30px]'>Science & Nature</p>
                            <p className='text-[20px]'>( Multiple Choice )</p>
                            <p className='text-[30px] font-semibold'>Hard</p>
                        </Link>
                    </div>
                    <div className='w-full flex justify-center items-center animate-slideup'>
                    <FooterName/>
                    </div>
                </div>
            </div>
        );
    }