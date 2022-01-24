const express = require("express");
const expressEdge= require("express-edge");
const mongoose= require("mongoose");
const fileUpload = require("express-fileupload"); 
const expressSession = require("express-session");
const mongoStore =require("connect-mongo");
const connectFlash = require("connect-flash");


const homePageConteroller = require("./controllers/homePage");
const getPostsController = require("./controllers/getPosts")
const postsNewController = require("./controllers/PostsNew")
const postCreateController = require("./controllers/PostsCreate");
const createUser = require("./controllers/createUser");
const storeUserController = require("./controllers/UserStore")
const loginControllers = require("./controllers/login");
const loginStoreControllers = require("./controllers/loginStore");
const logutControllers = require("./controllers/Logout");


const app = express();

const validateCreatePostMidilware = require("./Middleware/validationMidlware");
const AuthMidlware = require("./Middleware/Auth");
const RederectIfAuth = require("./Middleware/Rederect");

const MongoUrl = 'mongodb+srv://SUNNATULLOX:sunnatullox1996@cluster0.kgdx9.mongodb.net/node-app'

mongoose.connect(MongoUrl)

app.use(expressSession({
    secret:"sunnatullox",
    store: mongoStore.create({mongoUrl:MongoUrl})
}))



app.use(fileUpload())
app.use(express.static("public"))
app.use(expressEdge.engine);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(connectFlash());

app.set("views", `${__dirname}/views`);

app.use((req,res, next)=>{
    app.locals.auth = req.session.userId
    next();
});



app.get("/",homePageConteroller)
app.get("/post/:id",getPostsController)
app.get("/logout",AuthMidlware,logutControllers)
app.get("/posts/new",AuthMidlware,postsNewController)
app.post("/posts/create",AuthMidlware, validateCreatePostMidilware,postCreateController)
app.get('/reg',RederectIfAuth,createUser)
app.post("/auth/reg",storeUserController )
app.get("/login",RederectIfAuth,loginControllers )
app.post("/auth/log",loginStoreControllers )
app.use((req,res) => res.render("not_found"))

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{console.log("Server has been atarted on Port 3000...");})