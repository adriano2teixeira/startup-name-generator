import express from "express";
import Routes from "./Routes";

const App = express();

// Middlewares
App.use(Routes);

export default App;
