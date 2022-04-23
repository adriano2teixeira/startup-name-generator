import http from "http";
import App from "./App";

class Server {
  constructor(app) {
    this.Server = http.createServer(app);
  }
  launch(port = process.env.PORT || 8888) {
    this.Server.listen(port, () =>
      console.log(`App Running at http://localhost:${port}`)
    );
  }
}

new Server(App).launch();
