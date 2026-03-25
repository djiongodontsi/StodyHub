
async function api(path, options){
  const res = await fetch(path, {headers:{'Content-Type':'application/json'}, ...options});
  if(!res.ok) throw new Error(await res.text());
  return res.json();
}

function fmtDate(iso){
  const d = new Date(iso);
  return d.toLocaleString('fr-FR', {dateStyle:'medium', timeStyle:'short'});
}

function renderPosts(posts){
  const wrap = document.querySelector("#posts");
  wrap.innerHTML = "";
  if(!posts.length){
    wrap.innerHTML = "<div class='small'>Aucun post pour le moment. Sois le premier !</div>";
    return;
  }
  posts.forEach(p=>{
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;">
        <div>
          <div style="font-weight:900;font-size:16px">${p.title}</div>
          <div class="meta">
            <span class="badge">${p.category}</span>
            <span>•</span>
            <span>${fmtDate(p.createdAt)}</span>
            <span>•</span>
            <span><b>${p.votes}</b> vote(s)</span>
          </div>
        </div>
      </div>
      <div class="small" style="margin-top:10px; white-space:pre-wrap;">${p.body}</div>
      <div class="actions">
        <button class="btn secondary" data-act="up" data-id="${p.id}">+1</button>
        <button class="btn secondary" data-act="down" data-id="${p.id}">-1</button>
        <button class="btn secondary" data-act="del" data-id="${p.id}">Supprimer</button>
      </div>
    `;
    div.querySelectorAll("button").forEach(btn=>{
      btn.addEventListener("click", async ()=>{
        const id = btn.getAttribute("data-id");
        const act = btn.getAttribute("data-act");
        try{
          if(act==="up") await api(`/api/posts/${id}/vote`, {method:"POST", body:JSON.stringify({delta:1})});
          if(act==="down") await api(`/api/posts/${id}/vote`, {method:"POST", body:JSON.stringify({delta:-1})});
          if(act==="del") await api(`/api/posts/${id}`, {method:"DELETE"});
          await load();
        }catch(e){
          document.querySelector("#status").textContent = "Erreur: " + e.message;
        }
      });
    });
    wrap.appendChild(div);
  });
}

async function load(){
  const posts = await api("/api/posts");
  renderPosts(posts);
}

document.querySelector("#submit").addEventListener("click", async ()=>{
  const title = document.querySelector("#title").value.trim();
  const category = document.querySelector("#category").value;
  const body = document.querySelector("#body").value.trim();
  const status = document.querySelector("#status");
  status.textContent = "";
  if(!title || !body){
    status.textContent = "Titre et description obligatoires.";
    return;
  }
  try{
    await api("/api/posts", {method:"POST", body:JSON.stringify({title, category, body})});
    document.querySelector("#title").value = "";
    document.querySelector("#body").value = "";
    status.textContent = "Post publie.";
    await load();
  }catch(e){
    status.textContent = "Erreur: " + e.message;
  }
});

load();
