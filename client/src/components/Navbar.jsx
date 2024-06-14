import { useAuth } from "../context/UserProvider";
import axios from "axios";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, userData } = useAuth();

  const handleLogout = async () => {
      try {
        await axios.post(
          "http://localhost:8000/user/logout",
          {},
          { withCredentials: true }
        );
        setIsLoggedIn(false);
      } 
      catch (error) {
        console.log(error);
    };
  };

  return (
    <div className=" flex  items-center justify-center flex-wrap my-5  min-w-[50%]">
    <div className='flex flex-row justify-center w-[30rem] bg-indigo-600 p-6 text-white text-lg font-bold  shadow-xl shadow-black flex-wrap px-[20%] rounded-2xl py-2'>
    <Link to='/'>
      <h1>Home</h1>
    </Link>
    <div className='flex items-center space-x-4 mx-20'>
      {isLoggedIn ? (
        <div className='space-x-4'>
          <Link to='/post' className='cursor-pointer hover:opacity-80'>
            POST
          </Link>
          <button onClick={handleLogout}>LOGOUT</button>
          <p className='text-sm'>Welcome {userData.firstName}</p>
        </div>
      ) : (
        <Link to='/login' className='cursor-pointer hover:opacity-80'>
          LOGIN
        </Link>
      )}
    </div>
  </div>
  </div>
  )
}

export default Navbar;