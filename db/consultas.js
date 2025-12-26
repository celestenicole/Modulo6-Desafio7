const { Pool } = require('pg')
const format = require("pg-format");

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234567',
    database: 'futscript',
    allowExitOnIdle: true
})

const getTeams = async () => {
    try {

        const query = "SELECT id, name FROM equipos";
        const { rows } = await pool.query(query);
        return rows;
        
    } catch (error) {
        throw new Error("Error al obtener equipos: " + error.message);
    }
}

const getPlayers = async (teamID) => {
    try {

        const query = format(
            `SELECT j.name, p.name as posicion
            FROM jugadores as j
            INNER JOIN equipos e ON e.id = j.id_equipo
            INNER JOIN posiciones p on p.id = j."position" 
            WHERE e.id = %L`,
            teamID
        );

        const { rows } = await pool.query(query);
        return rows;
        
    } catch (error) {
        throw new Error("Error al obtener jugadores: " + error.message);
    }
}

const addTeam = async (equipo) => {
    try {

        const { name } = equipo;
        const query = format(
            `INSERT INTO equipos (name) VALUES (%L)`,
            name
        );

        await pool.query(query);
        return;

    } catch (error) {
        throw new Error("Error al agregar equipo: " + error.message);
    }
}

const addPlayer = async ({ jugador, teamID }) => {
    try {

        const { name, position } = jugador;
        const query = format(
            `INSERT INTO jugadores (name, position, id_equipo) VALUES (%L, %L, %L)`,
            name, position, teamID
        );

        await pool.query(query);
        return;

    } catch (error) {
        throw new Error("Error al agregar jugador: " + error.message);
    }
}

module.exports = { getTeams, addTeam, getPlayers, addPlayer }