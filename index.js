import express from "express"
import urlRoutes from './routes/urlRouters.js'
import staticRoutes from './routes/staticRouters.js'
import connectDB from "./config.js"
import URL from "./models/url.js"
import path from "path"
import exp from "constants"
const app = express();
const PORT = 3000;

connectDB('mongodb://localhost:27017/short-url')
    .then(() => {
        console.log("connected to mongodb database");
    });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/url', urlRoutes);
app.use('/', staticRoutes);

// app.get("/home", async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.render('home', {
//         urls : allUrls,
//     });
// });

app.get("/:shortId", async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId: shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp:Date.now(),
                }
            }
        }
    );
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at Port :${PORT}`));