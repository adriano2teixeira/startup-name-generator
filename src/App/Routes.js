import { Router } from "express";
import NameGeneration from "./utils/GenerateNames";

const Routes = Router();
Routes.get("/", (request, response) => response.send("Hello world!"));
Routes.get("/generate", async (request, response) => {
  try {

    const res = await NameGeneration.__init__();

    if (res.error) {
      return response.status(500).json(res);
    }

    return response.json(res);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

export default Routes;
