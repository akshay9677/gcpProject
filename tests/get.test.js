const request = require("supertest");
const app = require("../app");

describe("API testing", () => {
  test("GET Request", () => {
    return request(app)
      .get("/")
      .then((response) => {
        expect(response.body).toStrictEqual(["Akshay", "Jim", "John Smith"]);
      });
  });
});
