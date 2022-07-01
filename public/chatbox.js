import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";
import { getFirestore, collection,getDoc,getDocs,query, addDoc,orderBy,onSnapshot,updateDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB8m1v7eeg5F3wZ5m0pORbNrY6AOuzX_vI",
    authDomain: "web-chat-e36e0.firebaseapp.com",
    projectId: "web-chat-e36e0",
    storageBucket: "web-chat-e36e0.appspot.com",
    messagingSenderId: "730615577539",
    appId: "1:730615577539:web:fa19c0e4e17aa71c2a1b76"
  };
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
     const db = getFirestore(app);

     const auth = getAuth();
     const user = auth.currentUser;
     const storage = getStorage();


     //-----------------------------------------------------get list friends ------------------------------------------------


     var list_friend = document.getElementById('list_friend');

     const querySnapshot = await getDocs(collection(db, "users"));
       querySnapshot.forEach((docc) => {
  
  
      var name = docc.data().username;
      var profil = docc.data().profil;
      var uid = docc.id;
      
      
      
      list_friend.innerHTML += '<a class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300  cursor-pointer hover:bg-gray-100 focus:outline-none"> <button id= ' + uid + '  class="btn w-full h-full flex flex-row items-center" > <img class="object-cover w-10 h-10 rounded-full" src="' + profil + '" alt="profil" /><div class="w-full pb-2"><div class="flex justify-between"><span class="block ml-2 font-semibold text-gray-600">' + name + '</span></div></div></button></a>'



    });


    const OnEvent = (doc) => {
        return {
            on: (type, selector, callback) => {
                doc.addEventListener(type, (event) => {
                    if (!event.target.matches(selector)) return;
                    callback.call(event.target, event);
                }, false);
            }
        }
    };
    
    
    OnEvent(document).on('click', '.btn', function(e) {
        

        
        var id = e.target.id;
       
        getDoc(doc(db, "users", id)).then(docSnap => {
        
          var p = docSnap.data();
          
          
          var name = document.getElementById('name_friend');
          name.innerHTML=p.username;
           var profil= p.profil;
          

          const img_profil = document.getElementById('img_profil');
          img_profil.setAttribute('src', profil);
      }) ;



//-----------------------------------------------------------download messages------------------------------------------------------------


onAuthStateChanged(auth, (user) => {
  var idFrom = user.uid;
  var idTo = id;

  
  var idu = idFrom > idTo ? idFrom.concat(idTo) : idTo.concat(idFrom);
 

  const msgRef = collection(db,"messages",idu,"chat");
  const q = query(msgRef, orderBy('date','asc'));

var list_msg = document.getElementById("list_msg");
  onSnapshot(q,querySnapshot => {
    querySnapshot.forEach(doc =>{
     
      if(idFrom==doc.data().idFrom){
        list_msg.innerHTML += '<li class="flex justify-end"><div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow"><span class="block">'+doc.data().message+'</span></div></li>'
      }else{
        list_msg.innerHTML += '<li class="flex justify-start"><div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow"><span class="block">'+doc.data().message+'</span></div></li>'
      }
    })
  })
  
  addDoc(collection(db, "messages",idu,"chat"), {
    message: messge_to_send,
    idFrom: idFrom,
    idTo: idTo,
    date: new Date(),
});


  
});

    
   
     
    
//----------------------------------------------------------upload messages ------------------------------------------------------------------------------


var send_btn = document.getElementById('send_btn');


  
send_btn.addEventListener('click', (e) => {

  var messge_to_send = document.getElementById('messge_to_send').value;
  

    onAuthStateChanged(auth, (user) => {
      var idFrom = user.uid;
      var idTo = id;

      
      var idu = idFrom > idTo ? idFrom.concat(idTo) : idTo.concat(idFrom);
     
      
      addDoc(collection(db, "messages",idu,"chat"), {
        message: messge_to_send,
        idFrom: idFrom,
        idTo: idTo,
        date: new Date(),
    });

   
      
    });

 
    
});


});
  






