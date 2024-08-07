import { useAuth } from "../context/UserProvider";
import axios from "axios";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, userData } = useAuth();

  const handleLogout = async () => {
    const deploy=import.meta.env.VITE_DEPLOY_URL;
    // ${deploy}
      try {
        await axios.post(
          `${deploy}/user/logout`,
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
    <div className=" flex  justify-center my-5 min-w-[40%]">
    <div className='flex flex-row  justify-around bg-[#004c3f] text-[#ffcb65] text-lg font-bold shadow-xl shadow-black rounded-2xl py-2 min-w-[40%]'>
      <Link to='/'>
      <h1>Home</h1>
    </Link>
    <div className=''>
      {isLoggedIn ? (
        <div className=''>
          <button onClick={handleLogout}>LOGOUT</button>
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