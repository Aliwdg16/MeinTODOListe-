import ToDo from "../models/ToDolistSchema.js"
import asyncHandler from "../utils/asyncHandler.js"
import ErrorResponse from "../utils/ErrorResponse.js"


export const getAllTasks = asyncHandler(async(req,res,next)=>{
  
  const list =await ToDo.find({author:req.uid}).populate('author');
    res.json(list)
});



// export const getAllTasksforlogged = asyncHandler(async (req, res, next) => { 
//   const list = await ToDo.find({author:req.uid}).populate('author');
// });

// export const getAllTasks = asyncHandler(async (req, res, next) => {
//   if (req.uid) {
//     const list = await ToDo.find({author:req.uid}).populate('author');
//     res.json(list)
//   } else {
   
//   }
// });


export const getSingleTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
  
    const list = await ToDo.findById(id).populate('author');
    if (!list) throw new ErrorResponse(`list ${id} does not exist`, 404);
    res.send(list);
  });
  


export const createTask = asyncHandler(async (req, res, next) => {
    const { body, uid } = req;
  
    const newTask = await ToDo.create({ ...body,author: uid });
    const populatedPost = await ToDo.findById(newTask._id).populate('author');
    res.status(201).json(populatedPost);
  });


  //Update
  export const updateTask = asyncHandler(async (req, res, next) => {
    const {
      body,
      params: { id },
      uid,
    } = req;
  
    const found = await ToDo.findById(id);
    if (!found) throw new ErrorResponse(`list ${id} does not exist`, 404);
  
    if (uid !== found.author.toString())
      throw new ErrorResponse('You have no permission to update this list', 401);
  
    const updatedlist = await ToDo.findByIdAndUpdate(id, body, {
      new: true,
    }).populate('author');
    res.json(updatedlist);
  });



  export const deleteTask = asyncHandler(async (req, res, next) => {
    const {
      body,
      params: { id },
      uid,
    } = req;
  
    const found = await ToDo.findById(id);
    if (!found) throw new ErrorResponse(`list ${id} does not exist`, 404);
  
    if (uid !== found.author.toString())
      throw new ErrorResponse('You have no permission to delete this list', 401);
  
    await ToDo.findByIdAndDelete(id, body, { new: true }).populate('author');
    res.json({ success: `List ${id} was deleted` });
  });
  