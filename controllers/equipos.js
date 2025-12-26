const { getTeams, addTeam } = require('../db/consultas')

const obtenerEquipos = async (req, res) => {
    try {

        const equipos = await getTeams()
        res.status(200).json(equipos)
        
    } catch (error) {
        console.error("Error al obtener equipos: " + error.message);
        res.status(500).json({ message: "Error al obtener equipos" });
    }
}

const agregarEquipo = async (req, res) => {
    try {

        const equipo = req.body
        await addTeam(equipo)
        res.status(201).json({ message: "Equipo agregado con éxito" });
        
    } catch (error) {
        console.error("Error al agregar equipo: " + error.message);
        res.status(500).json({ message: "Error al agregar equipo" });
    }
}

module.exports = { obtenerEquipos, agregarEquipo }