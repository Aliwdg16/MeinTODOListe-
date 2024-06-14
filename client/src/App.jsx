import { Route, Routes } from "react-router"
import Home from "./components/Home"
import LoginForm from "./components/LoginForm"
import Navbar from "./components/Navbar"
import RegisterForm from "./components/RegisterForm"
import NotFound from "./components/Notfound"


function App() {

  return (
    <>

    <Navbar />

     {/* <Home />  */}
 {/* <RegisterForm /> */}
 {/* <LoginForm /> */}

 <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterForm />} />
         <Route path='*' element={<NotFound />} />
      </Routes> 
    </>
  )
  }
  
  export default App
  
  {/* <Route path='/post' element={<CreatePost />} /> */}



//   <TaskItem
//   key={task._id}
//   task={task}
//   toggleTask={toggleTask}
//   removeTask={removeTask}
//   updateTask={updateTask}
// />