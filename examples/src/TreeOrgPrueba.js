import avatarPersonnel from './assets/avatar-personnel.svg'

let tree = {
  id: 1,
  nivel: 1,
  person: {
    avatar: avatarPersonnel,
    departament: "",
    name: "Driver Company",
    title: "Empresa",
    totalReports: 0
  },
  hasChild: true,
  hasParent: false,
  children: []
}

let array = [
  { id: 1, name: "Hernan", title: "CEO", idparent: 1, nivel: 1 },
  { id: 2, name: "Camiala", title: "CEO", idparent: 1, nivel: 2 },
  { id: 3, name: "Isaura", title: "CEO", idparent: 1, nivel: 2 },
  { id: 4, name: "Guadalupe", title: "CEO", idparent: 2, nivel: 3 },
  { id: 5, name: "Fernando", title: "CEO", idparent: 4, nivel: 4 },
  { id: 6, name: "Lisi", title: "CEO", idparent: 4, nivel: 5 }
];

/*for (let persona of array){
  let padre = ObtenerPadrePrincipal();
  console.log(padre);
}*/

let copyarray = array;

while (copyarray.length > 0) {
  let persona = ObtenerPadrePrincipal();
  let nodo = CrearNodo(persona);
  array.splice(padre);
}

function CrearNodo(persona) {
  let nodo = {
    id: persona.id,
    person: {
      avatar: avatarPersonnel,
      departament: "",
      name: persona.name,
      title: persona.title,
      totalReports: getTotalReport(persona.id)
    },
    hasChild: false,
    hasParent: false,
    children: []
  }

  if (nodo.totalReport > 0){
    hasChild = true;
  }

  if (!(persona.id == persona.idparent)){
    nodo.hasParent = true;
  }

  return nodo;
}

function getTotalReport(id){
  let totalReport = 0;
  for (let persona of copyarray){
    if (persona.idparent == id){
      totalReport++;
    }
  }

  return totalReport;
}

function ObtenerPadrePrincipal() {
  for (let persona of array) {
    if (persona.id == persona.idparent) {
      return persona;
    }
  }

  return null;
}



export default tree;