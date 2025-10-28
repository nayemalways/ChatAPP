import { useContext, useState } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../../context/Context';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [currState, setCurrState] = useState("Sign up");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [isDataSubmitted, setIsDataSubmitted] = useState(false);

    const navigate = useNavigate();

    const {login, signup} = useContext(AuthContext);


    // Submit Handler
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if(currState === "Sign up" && !isDataSubmitted) {
            setIsDataSubmitted(true);
            return;
        }

        if(currState === "Sign up") {
            const payload = {full_name: fullName, email, password, bio};
            signup(payload);
        }else {
            const data = await login({email, password});
             
            if(data.success) {
                Cookies.set("accessToken", data.data);
                toast.success(data.message);
                navigate('/');
            }else {
                toast.error(data.message);
            }
        }

    }

    return (
        <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly mas-sm:flex-col backdrop-blur-2xl '>
            {/* --------left--------- */}
            <img src={assets.logo_big} alt="Logo" className='w-[min(30vw,250px)]' />

            {/* -------right--------- */}
            <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg ' action="">
                <h2 className='font-medium text-2xl flex justify-between items-center '> {currState} </h2>
                {isDataSubmitted && <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' /> }
                

                {
                    currState === "Sign up" && !isDataSubmitted && (                
                    <input onChange={(e) => setFullName(e.target.value)} value={fullName} type="text" className='p-2 border border-gray-500 rounded-500 rounded-md focus:outline-none' placeholder='Full Name' required />
                    )
                }

                {
                    !isDataSubmitted && (
                        <>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Enter Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
                        </>
                    )
                }

                {
                    currState === "Sign up" && isDataSubmitted && (
                        <textarea rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            placeholder='Enter your short bio'
                            onChange={(e) => setBio(e.target.value)} value={bio}
                        ></textarea>
                    )
                }

                <button type='submit' className='py-3 bg-linear-to-r from-pur to-violet-600 text-white rounded-md cursor-pointer'>
                    {currState === "Sign up" ? "Create Account": "Login Now"}
                </button>

                <div className='flex items-center gap-2 text-sm text-gray-500 '>
                    <input type="checkbox" required  />
                    <p>Agree to the terms of use & privacy policy</p>
                </div>

                <div className='flex flex-col gap-2'>
                    {currState === "Sign up" ? (
                        <p className='text-sm text-gray-600'>Already have an account? <span onClick={() => {setCurrState("Login"); setIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
                    ):(
                        <p className='text-sm text-gray-600'>Create an account? <span onClick={() => {setCurrState("Sign up"); }} className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;<h1>Login Page</h1>