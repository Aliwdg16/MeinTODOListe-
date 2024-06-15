import axios from 'axios';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserProvider';


function LoginForm() {
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [error,setError] = useState('');
const { isLoggedIn, setIsLoggedIn, checkUser } = useAuth();


const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      'http://localhost:8000/user/login',
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    if (response.status === 200) {
      setIsLoggedIn(true);
      checkUser();
      navigate('/');
    }
  } catch (error) {
    setError(error.message || 'Something went wrong with Login');
  }
};
      
 

    return (
      <>
     <div className=" flex  justify-center  my-5  min-w-[50%] ">
        <div className="flex flex-col justify-center min-h-full w-[30rem] px-6 py-12 lg:px-8 bg-gradient-to-r from-[#e9e3db] to-[#eac39f] bg-center rounded-3xl  ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
            <img
              className="mx-auto h-32 w-auto"
              src="../src/assets/todofoto.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          {error && <p className='text-red-500 mb-4'>{error}</p>}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm  ">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    value={email}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 onChange={(e)=>setEmail(e.target.value)}
                 />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="text-sm font-medium leading-6 text-gray-900  hover:text-blue-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 onChange={(e)=>setPassword(e.target.value)}
                 />
                </div>
              </div>
  
              <div>
                  <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                  </button>
              </div>
            </form>
  
            <p className="mt-10 text-center block text-sm font-medium leading-6 text-gray-900">
             Don't have Account?{' '}
      
      <Link to='/register'> <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#36a420] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                > Create new account
              </button>

              </Link> 
            </p>
          </div>
        </div>
        </div>
      </>
    )
  }
  export default LoginForm;
  