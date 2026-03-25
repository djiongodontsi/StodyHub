const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
app.use(express.json());

const PUBLIC_DIR = path.join(__dirname, "..", "public");
app.use(express.static(PUBLIC_DIR));

const DB_PATH = path.join(__dirname, "posts.json");

function readDB(){
  try{
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
  }catch(e){
    return [];
  }
}
function writeDB(posts){
  fs.writeFileSync(DB_PATH, JSON.stringify(posts, null, 2), "utf-8");
}

app.get("/api/posts", (req,res)=>{
  const posts = readDB().sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));
  res.json(posts);
});

app.post("/api/posts", (req,res)=>{
  const {title, category, body} = req.body || {};
  if(!title || !body) return res.status(400).send("title and body required");
  const posts = readDB();
  const post = {
    id: String(Date.now()),
    title: String(title).slice(0,120),
    category: String(category || "Autre").slice(0,40),
    body: String(body).slice(0,4000),
    votes: 0,
    createdAt: new Date().toISOString()
  };
  posts.push(post);
  writeDB(posts);
  res.json(post);
});

app.post("/api/posts/:id/vote", (req,res)=>{
  const {delta} = req.body || {};
  const posts = readDB();
  const p = posts.find(x=>x.id===req.params.id);
  if(!p) return res.status(404).send("not found");
  const d = Number(delta || 0);
  p.votes = Math.max(-99, Math.min(999, (p.votes||0) + d));
  writeDB(posts);
  res.json(p);
});

app.delete("/api/posts/:id", (req,res)=>{
  let posts = readDB();
  const before = posts.length;
  posts = posts.filter(x=>x.id!==req.params.id);
  if(posts.length===before) return res.status(404).send("not found");
  writeDB(posts);
  res.json({ok:true});
});

// Fallback
app.get("*",(req,res)=> res.sendFile(path.join(PUBLIC_DIR, "index.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log("StudyHub running on http://localhost:"+PORT));
