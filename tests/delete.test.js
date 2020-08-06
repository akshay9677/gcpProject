const request = require("supertest");
const app = require("../app");

describe("API testing", () => {
  test("DELETE Request", () => {
    return request(app)
      .delete("/121")
      .then(() => {
        return request(app)
          .get("/")
          .then((response) => {
            expect(response.body).toStrictEqual([
              "Akshay",
              "Jim",
              "John Smith",
            ]);
          });
      });
  });
});
