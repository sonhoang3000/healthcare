import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/hoidanIT", (req, res) => {
    return res.send("Hello hoidanIT");
  });
  router.get("/about", homeController.getAboutPage);
  router.get("/example", homeController.getExamplePage);

  return app.use("/", router);
};

module.exports = initWebRoutes;
