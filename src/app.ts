import { Route } from "core/interfaces";
import express, { Router } from "express";
import mongoose, { connect } from "mongoose";

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 5000;

    this.initializeRoutes(routes);
    this.connectToDatabase();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private connectToDatabase() {
    try {
      const cnn = process.env.MONGODB_URI;
      if (!cnn) {
        console.log("Connection string invalid");
        return;
      }
      mongoose.connect(cnn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
      console.log("Database connected...");
    } catch (error) {
      console.log("Connect to database error");
    }
  }
}

export default App;
