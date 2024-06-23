import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const getTokenFromRequest = (req) => {
  if (req.cookies.token) {
    return req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const verifyToken = asyncHandler(async (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ error: 'Please login' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = decoded.uid;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized, token failed' });
  }
});

export default verifyToken;









// import jwt from 'jsonwebtoken';
// import asyncHandler from '../utils/asyncHandler.js';
// import ErrorResponse from '../utils/ErrorResponse.js';

// const verifyToken = asyncHandler(async (req, res, next) => {
//   let token;  

//   // Check for token in both cookies and Authorization header
//   if (req.cookies.token) {
//     token = req.cookies.token;  
//   } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
//     token = req.headers.authorization.split(' ')[1];  
//   }

//   if (!token) throw new ErrorResponse('Please login', 401);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);  
//     req.uid = decoded.uid;
//     next();
//   } catch (error) {
//     // Handle invalid token error  
//     throw new ErrorResponse('Not authorized, token failed', 401);
//   }
// });

// export default verifyToken;













// import jwt from 'jsonwebtoken';
// import asyncHandler from '../utils/asyncHandler.js';
// import ErrorResponse from '../utils/ErrorResponse.js';

// const verifyToken = asyncHandler(async (req, res, next) => {
//   /*  
//     Check if token is present in request [X]
//         - If not, return an error [X]
//         - If present:
//             - verifyToken using jwt.verify [X]
//             - If invalid return an error [X]
//             - If valid
//                 - create uid property in request [X]
//                 - next();
// */

//   // const token = req.headers['authorization'];
//   const token = req.cookies.token;

//   if (!token) throw new ErrorResponse('Please login', 401);

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   req.uid = decoded.uid;
//   next();
// });

// export default verifyToken;
