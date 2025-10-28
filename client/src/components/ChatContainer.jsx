 import { useContext, useEffect, useState } from 'react';
import assets from '../assets/assets';
import DefaultChatInterface from './DefaultChatInterface';
import { formatMessageTime } from '../lib/utils';
import { AuthContext, ChatContext } from '../../context/Context';

const ChatContainer = () => {

    const [text, setText] = useState("");
    const [file, setFile] = useState(null);

    const {setSelectedUser, selectedUser , message, sendMessage, loadSelectedMessage} = useContext(ChatContext);
    const { onlineUsers } = useContext(AuthContext);

    // console.log(message);

    const messageSendHandler = () => {
        const formdata = new FormData();
        formdata.append("text", text);
        formdata.append("file", file);

        sendMessage(formdata);
    }

    useEffect(() => {
        loadSelectedMessage();
    }, [selectedUser])


    return selectedUser ? (
        <div className='h-full  overflow-auto relative backdrop-blur-lg border-r-2 border-slate-600'>
            {/* ----------Header area ----------- */}
             <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
                <img className='w-12 rounded-full' src={`${selectedUser?.picture || 'https://avatars.githubusercontent.com/u/124289808?v=4'} `} alt="Profile martin" />
                <div className='flex  justify-between items-center w-full'>
                    <p className='text-slate-200 text-md'>
                        {selectedUser?.full_name || "Nayem Ahmed"}
                        <div className={`  ${onlineUsers.includes(selectedUser._id) ? 'text-green-400':'text-slate-400'}`}>
                            {
                                onlineUsers.includes(selectedUser._id) ? "Active now" : "Offline"
                            }
                        </div>
                    </p>
                    <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="Arrow" className='md:hidden max-w-7 ' />
                    <img src={assets.help_icon} alt="helop_icon" className='max-w-5 max-h-5 md:max-w-9' />
                </div>
             </div>

             {/* -------chat area ------------- */}
             <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6 ">
                {
                  message.length !== 0 ? (
                    message.map((msg, i) => (
                        <div key={i} className={`flex items-end gap-2 justify-end ${msg.senderId !== msg.receiver_id && 'flex-row-reverse'}`}>
                             {msg.image ? (
                                <img src={ msg?.image} alt='image' className='w-38 my-5 rounded relative z-0' />
                             ): (
                                <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === selectedUser._id ? 'rounded-br-none' : 'rounded-bl-none'} `}>{msg.text}</p>
                             )}


                             <div className='text-center text-xs'>
                                <img src={msg.senderId === selectedUser._id ? assets.avatar_icon : assets.profile_martin} alt="avatar" className='w-7 rounded-full' />
                                <p className="text-gray-500"> {formatMessageTime(msg.createdAt)} </p>
                             </div>
                        </div>
                    ))
                  ) : (
                    <div className='w-full h-full flex justify-center items-center text-white'>
                        <p className='text-3xl '>Start new chat</p>
                    </div>
                  ) 
                }
                {/* <div ref={scrollEnd}></div> */}
             </div>

             {/* ----------bottom area ---------- */}
             <div className="flex items-center gap-1 max-w-[90%] m-auto mb-5 transform">
                <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
                    <input onChange={(e) => setText(e.target.value)} type="text" placeholder='Send a message' className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400' />
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" name="image" id="image" accept='image/png, image/jpeg' hidden />
                    <label htmlFor="image">
                        <img src={assets.gallery_icon} alt="Gallery" className='w-5 mr-2 cursor-pointer' />
                    </label>
                </div>
                <img onClick={messageSendHandler} src={assets.send_button} className='w-7 cursor-pointer' alt="Send Button" />
             </div>
        </div>
    ): <DefaultChatInterface/>
};

export default ChatContainer;