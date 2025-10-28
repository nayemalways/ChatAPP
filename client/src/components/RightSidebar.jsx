import { useContext } from 'react';
import assets, { imagesDummyData } from '../assets/assets';
import { AuthContext, ChatContext } from '../../context/Context';

const RightSidebar = () => {
    const { selectedUser } = useContext(ChatContext);
    const { logout, onlineUsers } = useContext(AuthContext);

    return (
        <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden": ""} `}>
             <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
                <div className='w-[100px] h-[100px] rounded-full overflow-hidden shrink-0 '>
                    <img src={ selectedUser?.picture || assets.avatar_icon } alt="Avatar"  className='w-full object-cover '/>
                </div>
                <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
                    <p className={`w-2 h-2 rounded-full ${onlineUsers.includes(selectedUser._id) ? "bg-green-500" : "bg-slate-500" }`}></p>
                    { selectedUser?.full_name }
                </h1>
                <p className='px-10 mx-auto'>{ selectedUser?.bio }</p>
             </div>

             <hr className='border-[#ffffff50] my-4' />

             <div className="px-5  text-xs">
                <p>Media</p>
                <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
                    {
                        imagesDummyData.map((url, i) => (
                            <div key={i} onClick={() => window.open(url)} className='cursor-pointer rounded'>
                                <img src={url} alt="" className='h-full rounded-md' />
                            </div>
                        ))
                    }
                </div>
             </div>

             <button onClick={() => logout()} className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer '>
                Logout
             </button>
        </div>
    );
};

export default RightSidebar;