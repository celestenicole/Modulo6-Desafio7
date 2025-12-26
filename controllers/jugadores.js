const { getPlayers, addPlayer } = require('../db/consultas')

const obtenerJugadores = async (req, res) => {
    try {

        const { teamID } = req.params
        const jugadores = await getPlayers(teamID)
        res.status(200).json(jugadores)
        
    } catch (error) {
        console.error("Error al obtener jugadores: " + error.message);
        res.status(500).json({ message: "Error al obtener jugadores" });
    }
}

const registrarJugador = async (req, res) => {
    try {

        const { teamID } = req.params
        const jugador = req.body
        await addPlayer({ jugador, teamID })
        res.status(201).json({ message: "Jugador agregado con éxito" })
        
    } catch (error) {
        console.error("Error al registrar jugador: " + error.message);
        res.status(500).json({ message: "Error al registrar jugador" });
    }
}


module.exports = { obtenerJugadores, registrarJugador }