import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router';




const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newTask, setNewTask] = useState('');
  // const [update, setupdate] = useState(false);
const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/list/");
        setTasks(response.data);
        // console.log(response.data);
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

const updateTask = async (_id, newtitle) => { 
  try {
    const response = await axios.put(`http://localhost:8000/list/${_id}`, {title:newtitle,} , { withCredentials: true });
    setTasks(
      tasks.map((task) =>
        task._id === _id? { ...task, title: newtitle } : task
      )
    );
  } catch (error) {
    console.error('Error updating task', error);
  }
}





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
    <div className="max-w-md mx-auto mt-8 bg-gray-300 p-4 border-gray-700 rounded-3xl shadow-xl shadow-black w-full min-w-[50%]">
    <h1 className="text-center text-3xl font-bold mb-4">Todo List</h1>
    <div className="flex mb-4">
      <input
        className="flex-grow border-b-2 border-gray-400 outline-none focus:border-gray-700 mr-2 py-2 px-3"
        type='text'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder='Add a new task'
      />
      <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-green-600" type='submit' onClick={addTask}>Add</button>
    </div>
    <ul>
      {tasks.map((task) => (
        <li key={task._id} className="flex justify-between items-center mb-2">
          <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task._id)} />
          <span className='text-2xl font-semibold'>{task.title}</span>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={() => removeTask(task._id)}>Remove</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => updateTask(task._id, newTitle)}>Update</button>
          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => updateTask(task._id)}>Update</button> */}
        </li>
      ))}
    </ul>
    {/* {updateLoading && <p>Loading...</p>}
    {updateError && <p>Error updating task</p>} */}
  </div>
  );
};

export default Home;