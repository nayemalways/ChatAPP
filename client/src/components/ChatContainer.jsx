/* eslint-disable react-hooks/exhaustive-deps */
 import { useContext, useEffect, useRef, useState } from 'react';
import assets from '../assets/assets';
import DefaultChatInterface from './DefaultChatInterface';
import { formatMessageTime } from '../lib/utils';
import { AuthContext, ChatContext } from '../../context/Context';

const ChatContainer = () => {

    const [text, setText] = useState("");
    const [file, setFile] = useState(null);

    const {setSelectedUser, selectedUser , message, sendMessage, loadSelectedMessage} = useContext(ChatContext);
    const { onlineUsers, authUser } = useContext(AuthContext);

    console.log(authUser);

    // console.log(message);
    const scrollEnd = useRef();

    const messageSendHandler = () => {
        const formdata = new FormData();
        formdata.append("text", text);
        formdata.append("file", file);

        sendMessage(formdata);
        setText("");
        setFile(null);
    }

    useEffect(() => {
        loadSelectedMessage();
    }, [selectedUser]);

    useEffect(() => {
        if (scrollEnd.current) {
            scrollEnd.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [message, selectedUser]);



    return selectedUser ? (
        <div className='h-full  overflow-auto relative backdrop-blur-lg border-r-2 border-slate-600'>
            {/* ----------Header area ----------- */}
             <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <img
                        src={`${selectedUser?.picture || 'https://avatars.githubusercontent.com/u/124289808?v=4'}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>

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
                        <div key={i} className={`flex items-end gap-2 justify-end ${msg.sender_id === selectedUser._id && 'flex-row-reverse'}`}>
                             {msg.img ? (
                                <img src={ msg?.img} alt='image' className='w-38 my-5 rounded relative z-0' />
                             ): (
                                <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.sender_id === selectedUser._id ? 'rounded-br-none' : 'rounded-bl-none'} `}>{msg.text}</p>
                             )}


                             <div className='text-center text-xs w-7 h-7 rounded-full overflow-hidden'>
                                <img src={msg.sender_id === selectedUser._id ? selectedUser.picture : authUser.picture} alt="avatar" className='w-full' />
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
                <div ref={scrollEnd}></div>
             </div>

             {/* ----------bottom area ---------- */}
             <div className="flex items-center gap-1 max-w-[90%] m-auto mb-5 transform">
                <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
                    {file && (
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Profile Image"
                            className={`w-18 h-18 bottom-12 absolute rounded`}
                        />
                    )
                    }
                    <input onChange={(e) => setText(e.target.value)} value={text} type="text" placeholder='Send a message' className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400' />
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