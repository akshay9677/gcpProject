const request = require("supertest");
const app = require("../app");

describe("API testing", () => {
  test("PUT Request", () => {
    const data = {
      name: "Arjun.D",
      age: 21,
      number: "3764736473",
      active: true,
    };
    return request(app)
      .put("/121")
      .send(data)
      .then(() => {
        return request(app)
          .get("/")
          .then((response) => {
            expect(response.body).toStrictEqual([
              "Akshay",
              "Arjun.D",
              "John Smith",
            ]);
          });
      });
  });
});
