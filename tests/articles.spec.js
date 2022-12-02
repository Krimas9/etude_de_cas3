const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.models");


describe("tester API articles", () => {
  let token;
  const ARTICLE_ID = "article_fake";
  const USER_ID = "fake";
  const MOCK_DATA = [
    {
      _id: ARTICLE_ID,
      title: "article1",
      content: "contenu1",
      user: "user_id",
      state: "draft",
    },
  ];
  const MOCK_DATA_CREATED = {
    title: "article1",
    content: "contenu2",
    user: "user_id",
    state: "draft",
  };
  beforeEach(() => {
    token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
    mockingoose(Article).toReturn(MOCK_DATA, "find");
    mockingoose(Article).toReturn(MOCK_DATA_CREATED, "save");
  });
  // test("[Articles] Get All", async () => {
  //   const res = await request(app)
  //     .get("/api/articles")
  //     .set("x-access-token", token);
  //   expect(res.status).toBe(200);
  //   expect(res.body.length).toBeGreaterThan(0);
  // });
test("[Articles] Create", async () => {
    const res = await request(app)
      .post("/api/articles")
      .send(MOCK_DATA_CREATED)
      .set("x-access-token", token);
    expect(res.status).toBe(201);    
  });
  test("[Articles] Up Date", async () => {
    const res = await request(app)
      .put("/api/articles/ARTICLE_ID")
      .send(MOCK_DATA)
      .set("x-access-token", token);
    expect(res.status).toBe(200);
  });
  test("[Articles] Delete", async () => {
    const res = await request(app)
      .delete("/api/articles/ARTICLE_ID")
      .set("x-access-token", token);
    expect(res.status).toBe(204);
  });
});
