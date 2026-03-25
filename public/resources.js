
const RESOURCES = [
  {id:1, module:"HTML/CSS", type:"PDF", title:"Flexbox - guide rapide", desc:"Resume des proprietes flex pour layouts responsives."},
  {id:2, module:"HTML/CSS", type:"Cheatsheet", title:"Selectors CSS", desc:"Les selecteurs les plus utiles + exemples."},
  {id:3, module:"JavaScript", type:"Video", title:"Promises et async/await", desc:"Comprendre l'asynchrone simplement."},
  {id:4, module:"Linux", type:"PDF", title:"Permissions (chmod, chown)", desc:"Comprendre rwx, utilisateurs, groupes."},
  {id:5, module:"Reseau", type:"Exercices", title:"Adressage IP - exercices corriges", desc:"CIDR, sous-reseaux et plans d'adressage."},
  {id:6, module:"Base de donnees", type:"PDF", title:"SQL - joins", desc:"INNER/LEFT joins avec exemples concrets."},
];

const favKey = "studyhub_favs";

function getFavs(){
  try { return JSON.parse(localStorage.getItem(favKey) || "[]"); } catch { return []; }
}
function setFavs(f){ localStorage.setItem(favKey, JSON.stringify(f)); }

function render(list){
  const wrap = document.querySelector("#resList");
  wrap.innerHTML = "";
  const favs = new Set(getFavs());
  list.forEach(r=>{
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;">
        <div>
          <div style="font-weight:800">${r.title}</div>
          <div class="meta"><span class="badge">${r.module}</span><span class="badge">${r.type}</span></div>
          <div class="small" style="margin-top:6px;">${r.desc}</div>
        </div>
        <button class="btn secondary" data-id="${r.id}">${favs.has(r.id) ? "Retirer" : "Favori"}</button>
      </div>
    `;
    div.querySelector("button").addEventListener("click", (e)=>{
      const id = Number(e.target.getAttribute("data-id"));
      const arr = getFavs();
      const idx = arr.indexOf(id);
      if(idx>=0) arr.splice(idx,1); else arr.push(id);
      setFavs(arr);
      applyFilters();
      renderFavs();
    });
    wrap.appendChild(div);
  });
  document.querySelector("#count").textContent = `${list.length} ressource(s)`;
}

function renderFavs(){
  const ul = document.querySelector("#favList");
  ul.innerHTML = "";
  const favs = getFavs();
  if(!favs.length){
    ul.innerHTML = "<li>Aucun favori pour le moment.</li>";
    return;
  }
  favs.map(id=>RESOURCES.find(r=>r.id===id)).filter(Boolean).forEach(r=>{
    const li = document.createElement("li");
    li.textContent = `${r.title} (${r.module})`;
    ul.appendChild(li);
  });
}

function applyFilters(){
  const m = document.querySelector("#mod").value;
  const t = document.querySelector("#type").value;
  let list = RESOURCES.slice();
  if(m!=="all") list = list.filter(r=>r.module===m);
  if(t!=="all") list = list.filter(r=>r.type===t);
  render(list);
}

document.querySelector("#apply").addEventListener("click", applyFilters);
renderFavs();
applyFilters();
