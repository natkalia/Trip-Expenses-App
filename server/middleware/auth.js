const jwt = require('jsonwebtoken');
const config = require('config');

const checkAuthenticated = (req, res, next) => {
  const token = req.headers["x-auth-token"] || null;
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decrypt = jwt.verify(token, config.get('db.jwtPrivateKey'));
    req.user = decrypt;
    next();
  } catch(err) {
    return res.status(400).send("Invalid token");
  }
}

// export const checkAuthorized = async (req, res, next) => {
  
// }

module.exports = { checkAuthenticated }
