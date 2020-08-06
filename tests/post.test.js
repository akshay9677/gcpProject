const request = require("supertest");
const app = require("../app");

describe("API testing", () => {
  test("Post Request", () => {
    const data = {
      name: "Arjun",
      age: 21,
      number: "3764736473",
      active: true,
    };
    return request(app)
      .post("/121")
      .send(data)
      .then(() => {
        return request(app)
          .get("/")
          .then((response) => {
            expect(response.body).toStrictEqual([
              "Akshay",
              "Arjun",
              "Jim",
              "John Smith",
            ]);
          });
      });
  });
});
