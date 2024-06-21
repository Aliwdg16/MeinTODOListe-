import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router';
import { format } from 'date-fns';



const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newTask, setNewTask] = useState('');
  // const [update, setupdate] = useState(false);
const navigate = useNavigate(); 
const [editTaskId, setEditTaskId] = useState(null);
const [editTaskTitle, setEditTaskTitle] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/list/`,{headers:{'Authorization':`bearer${token}`}, withCredentials: true });
        setTasks(response.data);
        console.log(response.data);
          setLoading(false);
        }
       catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
      };
      fetchTasks();
  }, [tasks]);



  // useEffect(() => {
    
  // Add a new task
  
  const addTask = async () => {
   
    try {
      const response = await axios.post("http://localhost:8000/list/", {
        title:newTask},{ withCredentials: true }
      );
      setTasks([...tasks, response.data]);
      setNewTask('');
      navigate('/');
    } catch (error) {
      
      console.error('Error adding task', error);
    }
  };


  // const addTask = useCallback(async () => {
  //   try {
  //     const response = await axios.post("http://localhost:8000/list/", {
  //       title: newTask
  //     }, { withCredentials: true });
  //     setTasks([...tasks, response.data]);
  //     setNewTask(''); // Clear the input field
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Error adding task', error);
  //   }
  // }, [newTask, tasks, navigate]);


  // Toggle task
  
  const toggleTask = async (_id) => {  
    try {
      const task = tasks.find((task) => task._id === _id);
      setTasks(
        tasks.map((task) =>
          task._id === _id? {...task, completed:!task.completed } : task
        )
      );
      await axios.put(`http://localhost:8000/list/${_id}`, {
       ...task,
        completed:!task.completed
      }, { withCredentials: true });
    } catch (error) {
      console.error('Error updating task', error);
    }
  };
  
 


   
//remove task
const removeTask = async (_id) => {
  try {
    await axios.delete(`http://localhost:8000/list/${_id}`, { withCredentials: true });
    setTasks(tasks.filter((task) => task._id !== _id));
  } catch (error) {
console.error('Error removing task', error);
    
  }
}




// Update task

// const updateTask = async (_id, newtitle) => { 
//   try {
//     const response = await axios.put(`http://localhost:8000/list/${_id}`, {title:newtitle,} , { withCredentials: true });
//     setTasks(
//       tasks.map((task) =>
//         task._id === _id? { ...task, title: newtitle } : task
//       )
//     );
//   } catch (error) {
//     console.error('Error updating task', error);
//   }
// }



const updateTask = async (_id) => { 
  try {
    const response = await axios.put(`http://localhost:8000/list/${_id}`, { title: editTaskTitle }, { withCredentials: true });
    setTasks(
      tasks.map((task) =>
        task._id === _id ? { ...task, title: editTaskTitle } : task
      )
    );
    setEditTaskId(null);
    setEditTaskTitle('');
  } catch (error) {
    console.error('Error updating task', error);
  }
};




// Loading state
if (loading) {
  return (
    <div className='h-screen flex justify-center items-center'>
      <p>Loading...</p>
    </div>
  );
}

// Error state  
if (error) {
  return (
    <div className='h-screen flex justify-center text-red-500'>
      <p>Server not available, try again later</p>
    </div>
  );
}

  return (
    <div className="container max-w-md mx-auto mt-8 bg-gradient-to-r from-[#e9e3db] to-[#eac39f] bg-center p-4 border-gray-700 rounded-3xl shadow-xl shadow-black min-w-[40%]">
    <h1 className="text-center text-3xl font-bold text-[#004c3f] mb-4 min-w-[50%]">Todo List</h1>
    <div className="flex mb-4">
      <input
        className="flex-grow border-b-2 border-gray-400 outline-none focus:border-gray-700 mr-2 py-2 px-3 bg-[#004c3f] p-6 text-[#ffcb65] shadow-md shadow-black rounded-lg"
        type='text'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder='Add a new task'
      />
      <button className="px-4 py-2 bg-[#004c3f] p-6 text-[#ffcb65] hover:bg-green-600 shadow-md shadow-black rounded-lg" type='submit' onClick={addTask}>Add</button>
    </div>
     
      <ul className='list-item'>
        {tasks.map((task) => (
          <li key={task._id} className=" container flex flex-nowrap justify-between items-center mb-2 border-b-4 border-black ">
            <input className=' h-[2rem] w-[2rem] px-2 py-2 mx-2 mb-2 rounded-full' type="checkbox"  checked={task.completed} onChange={() => toggleTask(task._id)} />
              {editTaskId === task._id ? (
              <input
                className='flex-grow border-b-2 border-gray-400 bg-gray-200 outline-none focus:border-gray-700 mb-2  mr-2 py-2 px-3 shadow-md shadow-black rounded-lg'
                type='text'
                value={editTaskTitle}
                onChange={(e) => setEditTaskTitle(e.target.value)}
                placeholder='Update task title'
              />
            ) : (
              <span className='text-2xl text-[#12221f] w-[25rem] font-semibold border-2 bg-gradient-to-r from-[#e9e3db] to-[#eac39f] bg-center border-[#9b948c] rounded-lg p-2 mb-2 mx-2'>{task.title}</span>
            )}
            {editTaskId === task._id ? (
              <button className="bg-green-500 text-gray-900  px-4 py-2 rounded-md hover:bg-green-200 font-semibold mb-2 " onClick={() => updateTask(task._id)}>Save</button>
            ) : (
              <button className="bg-gradient-to-r from-[#004c3f] to-green-500 bg-center px-4 py-2 rounded-md hover:bg-green-200 font-semibold mb-2 " onClick={() => { setEditTaskId(task._id); setEditTaskTitle(task.title); }}>Edit</button>
            )}
              <button className="bg-gradient-to-r from-[#ff8383] to-[#ce3b2e] bg-center text-gray-900 px-4 py-2 rounded-md hover:bg-red-600 font-semibold ml-2 mb-2" onClick={() => removeTask(task._id)}>Remove</button>
            <p className='border-black ml-1 text-sm border-2 rounded-lg px-2 py-0 mx-2 mb-2  font-semibold'>{task.date ? format(new Date(task.date), "dd MMM yy, HH:mm") : ""}</p>
          </li>
        ))}
      </ul>
    
  </div>
);
};

export default Home;