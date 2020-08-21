import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import signUp from "./endpoints/signUp"
import login from "./endpoints/login";
import getRecipesFeed from "./endpoints/getRecipesFeed";
import getOwnProfile from "./endpoints/getOwnProfile";
import getProfileById from "./endpoints/getUserById";
import getUserById from "./endpoints/getUserById";



dotenv.config()

const app = express()
app.use(express.json())

app.post('/signup', signUp)
app.post('/login', login)
app.get('/user/profile', getOwnProfile)
app.get('/user/feed', getRecipesFeed)
app.get('/user/:id', getUserById)



const server = app.listen(process.env.PORT || 3000, () => {
  if(server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`)
  } else {
    console.error(`Failure upon starting server`)
  }
})