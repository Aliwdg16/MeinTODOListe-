import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const verifyToken = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in both cookies and Authorization header
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) throw new ErrorResponse('Please login', 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = decoded.uid;
    next();
  } catch (error) {
    // Handle invalid token error
    throw new ErrorResponse('Not authorized, token failed', 401);
  }
});

export default verifyToken;