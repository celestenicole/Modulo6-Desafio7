const jwt = require('jsonwebtoken')
require('dotenv').config()

const validarToken = (req, res, next) => {

  const Authorization = req.header("Authorization")
  if (!Authorization) {
    return res.status(401).json({
      message: "Token no enviado"
    });
  }

  const token = Authorization.replace("Bearer ", "");

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Token inválido"
    });
  }

};



module.exports = validarToken;