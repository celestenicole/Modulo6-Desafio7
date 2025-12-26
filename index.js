const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json())

const validarToken = require('./middlewares/validarToken')
const { obtenerJugadores, registrarJugador } = require('./controllers/jugadores')
const { obtenerEquipos, agregarEquipo } = require('./controllers/equipos')
const login = require('./controllers/login')


app.get("/equipos", obtenerEquipos)
app.post("/equipos", validarToken, agregarEquipo)

app.get("/equipos/:teamID/jugadores", obtenerJugadores)
app.post("/equipos/:teamID/jugadores", validarToken, registrarJugador)

app.post("/login", login)


module.exports = app;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`SERVER ON PORT ${PORT}`));
}