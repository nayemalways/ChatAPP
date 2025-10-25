import React from 'react';
import assets from '../assets/assets';

const DefaultChatInterface = () => {
    return (
        <div className='border-l border-r border-slate-500 flex flex-col gap-1.5 justify-center items-center'>
             <img src={assets.logo_icon} alt="Logo" className='max-w-16' />
             <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
        </div>
    );
};

export default DefaultChatInterface; 