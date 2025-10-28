/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState} from 'react';
import assets from './../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AuthContext, ChatContext } from '../../context/Context';

const Sidebar = () => {

    const navigate = useNavigate();
    const {logout, onlineUsers} = useContext(AuthContext);
    const {getUsers, users, unseenMessage, setSelectedUser, selectedUser} = useContext(ChatContext);

    const [input, setInput] = useState(false);

    useEffect(() => {
        getUsers();
    }, [onlineUsers])

    const logoutHandler = () => {
        logout();
    }


    const filterUsers = input ? users.filter((user) => user.full_name.toLowerCase().includes(input.toLowerCase())) : users
 
    
    return (
        <div   className={`bg-[#8185B2]/10 h-full border-r-2 border-slate-600 p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? 'max-md:hidden': ""}`}>
            <div className='pb-5'>
            <div className="flex justify-between items-center">
                <img src={assets.logo} alt="Logo" className='max-w-40' />
                <div className="relative py-2 group">
                    <img src={assets.menu_icon} alt="Menue" className='max-h-5 cursor-pointer' />
                    <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block '>
                        <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
                        <hr className='my-2 border-t border-gray-50 ' />
                        <p onClick={logoutHandler} className='cursor-pointer text-sm'>Logout</p>
                    </div>
                </div>
            </div>

            {/* Search Bar  */}
            <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5 '>
                <img src={assets.search_icon} alt="Search" className='w-3' />
                <input onChange={(e) => setInput(e.target.value)} type="text" className='bg-transparent border-none outline-none text-white text-xs placeholder:[#c8c8c8] flex-1' placeholder='Search User...' />
            </div>

            {/* User list  */}
            <div className='flex flex-col md:mt-6'>
                {
                   users && filterUsers.map((user, i) => (
                        <div key={i} onClick={()=> {setSelectedUser(user)}} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && 'bg-[282142/50]'}`} >
                            <div className='w-[35px] h-[35px] rounded-full overflow-hidden shrink-0 '>
                                <img src={user?.picture || assets.avatar_icon} alt="User Image" className='w-full object-cover ' />
                            </div>
                            <div className='flex flex-col leading-5'>
                                <p>{user.full_name}</p>
                                {
                                    onlineUsers.includes(user._id)
                                    ? <span className='text-green-400 text-xs'>Online</span>
                                    : <span className='text-neutral-400 text-xs'>Offline</span>
                                }
                            </div>
                            {
                                unseenMessage[user._id] > 0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{unseenMessage[user._id]}</p>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
        </div>
    );
};

export default Sidebar;<h1>Sidebar</h1>