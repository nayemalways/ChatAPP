import  { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import RightSidebar from '../components/RightSidebar';
import DefaultChatInterface from '../components/DefaultChatInterface';
import { ChatContext } from '../../context/Context';


const Home = () => {
    const { selectedUser } = useContext(ChatContext);
 
 
    return (
        <div className='border w-full h-screen sm:px-[15%] sm:py-[5%] '>
            <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative ${selectedUser? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]':'md:grid-cols-2'} `}>
                <Sidebar/>
                {
                    selectedUser ? (
                        <>
                            <ChatContainer/>
                            <RightSidebar />
                        </>
                    ): <DefaultChatInterface/>
                }
            </div>
        </div>
    );
};

export default Home;<h1>Home page</h1>