const firebaseConfig = {
  apiKey: "AIzaSyDAkMVsSWkMf-7FGj0usOK-1Qx03UI4pnk",
  authDomain: "parcial-2-f8f26.firebaseapp.com",
  databaseURL: "https://parcial-2-f8f26-default-rtdb.firebaseio.com",
  projectId: "parcial-2-f8f26",
  storageBucket: "parcial-2-f8f26.appspot.com",
  messagingSenderId: "478137296598",
  appId: "1:478137296598:web:ff7edce8bab967b3610b77",
  measurementId: "G-KMR375ZGD7"
};



export function getFirebaseConfig(){
  if (!firebaseConfig || !firebaseConfig.apiKey){
      throw new Error("Firebase configuration error");
  } else {
      return firebaseConfig;
  }
}