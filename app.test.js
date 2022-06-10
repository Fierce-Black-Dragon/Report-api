const request = require("supertest");

const app = require("./app");

describe("Reports Api", () => {
  it("GET /reports?reportId=id  -->>  get a aggreate report in json object", () => {
    request(app)
      .get("/reports?reportID=62a3436759b025f9bc99c898")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("POST /reports --> array of objects", () => {
    request(app)
      .post("/reports")
      .send({
        userID: "user-10",
        marketID: "market-2",
        marketName: "Vashi Navi Mumbai",
        cmdtyID: "cmdty-2",
        marketType: "Mandi",
        cmdtyName: "Potato",
        priceUnit: "Pack",
        convFctr: 50,
        price: 700,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
  });
});
