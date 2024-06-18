import User from "../models/userSchema.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// REGISTER
export const signUp = asyncHandler(async (req, res, next) => {
  /*
      Check if user exist(email) []
          - If user exists, return an Error []
          - If user does not exist:
              - Secure the password using bcrypt []
              - Store the user in DB []
              - Sign a token []
              - Return the token []    
  */
  const { firstname, lastname, username, email, password } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser)
    throw new ErrorResponse("THis User already exist whith this email", 409);

  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstname,
    lastname,
    username,
    email,
    password: hash,
  });
  const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET);
  res.status(201).send({ token });
});

// LOGIN
// Check if user exist(email) []
// If user does not exist, return an Error []
// If user exists:

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existUser = await User.findOne({ email }).select("+password");
  if (!existUser) throw new ErrorResponse("This Email does not exist", 404);

  const match = await bcrypt.compare(password, existUser.password);
  if (!match) throw new ErrorResponse("Invalid Password", 401);

  const token = jwt.sign({ uid: existUser._id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });

  res.cookie("token", token, { maxAge: 1800000 }); // 30mn
  res.send({ status: "you are login" });
});

//geet all user
export const getalluser = asyncHandler(async (req, res, next) => {
  const user = await User.find(req._id).populate("");
  res.json(user);
});

//verify User
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.uid);
  res.json(user);
});

// LOGOUT
export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.send({ status: "you are logout" });
});

// // UPDATE USER
//  export const updateUser = asyncHandler(async (req, res, next) => {
//   const user = await User.findByIdAndUpdate(req.uid, req.body, { new: true }).populate('todos');
//   res.json(user); });

//   //delete
// export const deleteProfiel = asyncHandler(async(req,res,next)=>{
// const deleteUser =await User.findByIdAndDelete(req.uid);
// res.json(User);

// })

