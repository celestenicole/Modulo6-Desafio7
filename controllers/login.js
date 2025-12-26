const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {

    const { username, password } = req.body;

    if (username !== "admin" || password !== "1234") {
      return res.status(400).json({
        message: "Credenciales inválidas"
      });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  } catch (error) {
    res.status(500).json({
      message: "Error realizando login: " + error.message
    });
  }
};

module.exports = login;