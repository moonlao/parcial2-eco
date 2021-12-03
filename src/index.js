import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, get, ref } from "firebase/database";
import { getFirebaseConfig} from "./utils";

const firebaseAppConfig = getFirebaseConfig(); 
const app = initializeApp(firebaseAppConfig);
const auth = getAuth();
const database = getDatabase(app);

const username = document.getElementById('username');
const correo = document.getElementById('correo');
const logoutBtn = document.getElementById('logoutBtn');
const bookContainer = document.getElementById("bookContainer");
const rateBtn = document.getElementById('rateBtn');

let arrayBook = [];

let usuario;
let hasVoted;


auth.onAuthStateChanged(
    (user)=>{
        if(user !== null){
            database.ref('parcial2/users/'+user.uid).once(
                'value',
                (data)=>{
                    let userDB = data.val();
                    username.innerHTML ="Username: " + userDB.username;
                    correo.innerHTML ="Correo: " + userDB.correo;
                    usuario=userDB.id;
                    hasVoted=userDB.voto;

                    if(hasVoted==1){
                        alert("Usted ya ha votado, redirigiendo al login...");
                        auth.signOut().then(
                            ()=>{
                                window.location.href="login.html";
                            }
                        ).catch(
                            (error)=>{
                                alert(error.message);
                            }
                        );
                    }
                }
                
            );
        }else{
            window.location.href='login.html';
        }
    }
);

logoutBtn.addEventListener('click', ()=>{
    auth.signOut().then(
        ()=>{
            window.location.href="login.html";
        }
    ).catch(
        (error)=>{
            alert(error.message);
        }
    );
});

database.ref('parcial2/books').on('value', function(data){
    bookContainer.innerHTML='';
    data.forEach((id)=>{
        let valor = id.val();
        let book = new Book(valor);
        bookContainer.appendChild(book.render());
        arrayBook.push(book);
    })
});

rateBtn.addEventListener('click', ()=>{

    if(arrayBook[0].valorVoto==null || arrayBook[1].valorVoto==null || arrayBook[2].valorVoto==null ||
        arrayBook[3].valorVoto==null || arrayBook[4].valorVoto==null){
        alert("Vote por todos los libros");
        return;
    }   

    for (let i = 0; i < arrayBook.length; i++) {
        database.ref('parcial2/books/'+arrayBook[i].book.id).once(
            'value',
            (data)=>{

            let bookDB=data.val();

            let rateUsuario=parseInt(arrayBook[i].valorVoto,10);
            let rateActual=parseInt(bookDB.calificacion,10);
            let votosActuales=parseInt(bookDB.votos,10);

            let promedio= (rateUsuario+(votosActuales*rateActual))/(votosActuales+1);
            let bookPromedio = {
                calificacion: promedio,
                id: bookDB.id,
                nombre: bookDB.nombre,
                votos: votosActuales+1
            };
            database.ref('parcial2/books/'+bookDB.id).set(bookPromedio);
        });
    }

    console.log("User UID>>>"+usuario);
    database.ref('parcial2/users/'+usuario).once(
        'value',
        (data)=>{
            let userDB = data.val();
            let userVoto={
                correo: userDB.correo,
                id: userDB.id,
                password: userDB.password,
                username: userDB.username,
                voto: 1
            };
            database.ref('parcial2/users/'+userVoto.id).set(userVoto);
        }
    );

    alert("Gracias por votar, redirigiendo al login en 3 segundos...");
        setTimeout(()=>{
            
            auth.signOut().then(
                ()=>{
                    window.location.href="login.html";
                    
                }
            ).catch(
                (error)=>{
                    alert(error.message);
                }
            );
        },3000);
});