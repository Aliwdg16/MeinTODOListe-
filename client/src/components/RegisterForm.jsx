import axios from "axios";
import { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
// import { toast } from "react-toastify";

function RegisterForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    const deploy=import.meta.env.VITE_DEPLOY_URL;
    try {
      const response = await axios.post(
        `${deploy}/user/signup`,
        {
             firstname,
             lastname,
             username,
             email,
             password },
        { withCredentials: true }
      );

      if (response.status === 201) {
      //  toast.success('You are registered! Welcome');
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.error || 'Registration failed');
    }
  };

  



  return (
    <>
    <div className=" flex  justify-center  my-5  min-w-[50%] ">
                     
      <div className=" flex flex-col justify-center min-h-full w-[30rem] px-6 py-12 lg:px-8 bg-gradient-to-r from-[#e9e3db] to-[#eac39f] bg-center rounded-3xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-32 w-auto"
            src="./todofoto.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleRegister}
          >

            {/* Firstname */}
            <div>
              <label
                htmlFor="email"
                className="block text-l font-medium leading-6 text-gray-900 " 
              >
                Firstname
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={firstname}
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
            </div>

            {/* Lastname */}
            <div>
              <label
                htmlFor="Lastname"
                className="block text-l font-medium leading-6 text-gray-900"
              >
                Lastname
              </label>
              <div className="mt-2">
                <input
                type='text'
                 value={lastname}
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label
               htmlFor="username"
                className="block text-l font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={username}
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

              {/* email */}
            <div>
              <label
                htmlFor="email"
                className="block text-l font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  
                  type="email"
                  value={email}
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-l font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                   type='password'
                   value={password}
                  
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
  
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
                Register
              </button>
              
            </div>
          </form>
          <p className='mt-2'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue underline'>
            Login here
          </Link>
        </p>
        </div>
      </div>
      </div>
    </>
  );
}
export default RegisterForm;
