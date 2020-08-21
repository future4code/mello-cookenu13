import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net"
import { CreateRecipe } from "./endpoints/createRecipe";
import { GetRecipe } from "./endpoints/GetRecipe";
import { CreateFollow } from "./endpoints/createFollow";
import { RemoveFollow } from "./endpoints/removeFollow";
import signUp from "./endpoints/signUp";
import login from "./endpoints/login";
import getOwnProfile from "./endpoints/getOwnProfile";
import getRecipesFeed from "./endpoints/getRecipesFeed";
import getUserById from "./endpoints/getUserById";

dotenv.config();

const app = express()
app.use(express.json())

app.post('/signup', signUp)
app.post('/login', login)
app.get('/user/profile', getOwnProfile)
app.get('/user/feed', getRecipesFeed)
app.get('/user/:id', getUserById)

app.post('/recipe', CreateRecipe);
app.get('/recipe/:id', GetRecipe);
app.post('/user/follow', CreateFollow);
app.post('/user/unfollow', RemoveFollow);


const server = app.listen(process.env.PORT || 3000, () => {
  if(server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`)
  } else {
    console.error(`Failure upon starting server`)
  }
});