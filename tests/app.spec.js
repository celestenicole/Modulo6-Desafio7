const request = require("supertest")
const app = require("../index")


describe("Tests a API FutScript", () => {

  test("GET a /equipos retorna un array y retorna status 200", async () => {

    const response = await request(app).get("/equipos");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

  });

  test("POST /login con credenciales correctas y retorna un objeto", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "admin",
        password: "1234"
      });

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("object");
    expect(response.body.token).toBeDefined();

  });


  test("POST /login con credenciales incorrectas y retorna status 400", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "admin2",
        password: "asdf"
      });

    expect(response.status).toBe(400);

  });

  test("POST /equipos/:teamID/jugadores con token válido debe retornar status 201", async () => {

    // Obtener token valido
    const loginResponse = await request(app)
        .post("/login")
        .send({
          username: "admin",
          password: "1234"
        });

    const token = loginResponse.body.token;

    const response = await request(app)
            .post("/equipos/1/jugadores")
            .set("Authorization", `Bearer ${token}`)
            .send({
              name: "Jugador AAAA",
              position: 3
            });

    expect(response.status).toBe(201);

  });


})