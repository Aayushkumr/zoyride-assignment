import { useState } from "react";

const Login = () => {

  const [currentState, setCurrentState] = useState('Sign Up');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800" action="">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === 'Login' ? '' : <input className="border border-gray-3=800 w-full p-2 px-3" type="email" placeholder="Name" required/> }
      <input className="border border-gray-3=800 w-full p-2 px-3" type="email" placeholder="Email Address" required/>
      <input className="border border-gray-3=800 w-full p-2 px-3" type="email" placeholder="Password" required/>
      <div className="w-full flex text-sm mt-[-8px] justify-between">
        <p className="cursor-pointer">Forgot Password?</p>
        {
          currentState === 'Login' ? 
          <p onClick={()=>setCurrentState('Sign Up')} className="cursor-pointer">Create Account</p> :
          <p onClick={()=>setCurrentState('Login')} className="cursor-pointer">Already have an Account?</p>
        }
      </div>
      <button className="bg-black text-white font-light mt-4 py-2 px-8">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>

    </form>
  )
}

export default Login
