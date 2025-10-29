import jwt from 'jsonwebtoken';

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.ADMIN_ACCESS_TOKEN_SECRET, // yaha secret pass karo
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }
      req.adminId = decoded.adminId;
      next();
    }
  );
};

export default verifyAdmin;
