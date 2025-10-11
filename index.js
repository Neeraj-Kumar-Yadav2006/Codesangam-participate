import express from "express";
import path from "path"
import { fileURLToPath } from "url";
const app = express();
const port = 3000;

const _dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static('public'));
app.get("/", (req,res)=>{
    res.sendFile(_dirname + "/index.html");
});

app.listen(port , ()=>{
    console.log(`Server is running on ${port}`);
});