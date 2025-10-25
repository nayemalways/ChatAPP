import React from 'react';
import assets from '../assets/assets';

const ChatContainer = ({selectedUser, setSelectedUser}) => {
 
    return (
        <div className='border-l border-r border-slate-500'>
             <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
                <img className='w-12 rounded-full' src={`${selectedUser?.profilePic || 'https://avatars.githubusercontent.com/u/124289808?v=4'} `} alt="Profile martin" />
                <div className='flex flex-col'>
                    <p className='text-slate-200 text-md'>{selectedUser?.fullName || "Nayem Ahmed"}</p>
                    <p className='text-green-400 text-sm'>Online</p>
                </div>
             </div>
        </div>
    );
};

export default ChatContainer;