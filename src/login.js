import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push } from "firebase/database";

import { getFirebaseConfig } from "./utils";


const correo = document.getElementById('correo');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

const firebaseConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseConfig);

function registrarUsuario(user){
    // Obtener la base datos
    const db = getDatabase();
    const newUserRef = push(ref(db, 'users'));
    console.log(newUserRef);

    // injectar el id
    user["id"] = newUserRef.key
    // escribir un nuevo usuario
    set(newUserRef, user);
}

function getUsuarios(){
    const db = getDatabase();
    const dbRef = ref(db, 'users');
    onValue(dbRef, (snapshot) =>{
        const data = snapshot.val();
        console.log("lista", data);
        actualizarLista(data);
    });
}

function actualizarLista(info){
    if (info) {
        userList.innerHTML="";
        Object.keys(info).forEach((k, index)=>{
            console.log(k, index);
            console.log("Objeto", info[k])
            const card = new userCard(info[k])
            userList.appendChild(card.render());
        });

    } else {
        userList.innerHTML = "No hay usuarios registrados";
    }
}

console.log(username);

const registroEvento = (e, event) => {
    console.log("ejecutó evento")
    const user = {
        correo: correo.value,
        pass: password.value
    }
    registrarUsuario(user)
}

loginBtn.addEventListener("click", registroEvento);
getUsuarios();
