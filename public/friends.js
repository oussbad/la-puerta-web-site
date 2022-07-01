import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";
import { getFirestore, collection,getDoc,getDocs, addDoc,updateDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

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
//------------------------------------------------------get all users--------------------------------------------------------

     var list_friends = document.getElementById('list_friends');

     const querySnapshot = await getDocs(collection(db, "users"));
       querySnapshot.forEach((docc) => {
  
  
      var name = docc.data().username;
      var profil = docc.data().profil;
      var uid = docc.id;
     
     
     list_friends.innerHTML += '<div class="h-auto w-72  shadow-md  p-3 flex flex-col items-center gap-2 delay-75 hover:shadow-lg"><img src="'+profil+'" class="w-full h-60" alt=""><span class="h-max w-full gap-1"><p class="block ml-2 font-semibold text-gray-600 my-1">'+name+'</p></a><button '+uid+' class=" text-center w-full h-10 border text-[color:#FFA500] bg-[color:#FFEDCC] font-semibold hover:bg-[color:#fde9c4] "> <a href="Prof.html">Follow</button></span></div>'
    
    


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
          
          
          var name = document.getElementById('name');
          name.innerHTML=p.username;
           var profil= p.profil;
          

          const img_profil = document.getElementById('img_profil');
          img_profil.setAttribute('src', profil);
      }) ;

});