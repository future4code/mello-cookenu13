import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import { CreateRecipe } from "./endpoints/createRecipe";
import { GetRecipe } from "./endpoints/GetRecipe";
import { CreateFollow } from "./endpoints/createFollow";
import { RemoveFollow } from "./endpoints/removeFollow";

dotenv.config();

const app = express();
app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});

app.post('/recipe', CreateRecipe);
app.get('/recipe/:id', GetRecipe);
app.post('/user/follow', CreateFollow);
app.post('/user/unfollow', RemoveFollow);
