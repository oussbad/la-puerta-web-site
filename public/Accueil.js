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
     
  //-------------------------------------get info profil---------------------------------------------------
    
  onAuthStateChanged(auth, (user) => {


    if (user !== null) {
        getDoc(doc(db, "users", user.uid)).then(docSnap => {
        
            var p = docSnap.data();
            
            if (docSnap.exists()) {
            var name = document.getElementById('name');
            name.innerHTML=p.username;
             var profil= p.profil;
             var backProfil= p.backProfil;
  
  const img_profil = document.getElementById('img_profil');
  img_profil.setAttribute('src', profil);

  const post_profil = document.getElementById('post_profil');
  post_profil.setAttribute('src', profil);
  
 
  


  
  const img_backProfil = document.getElementById('img_backProfil');
  img_backProfil.setAttribute('src', backProfil);
  
 
  


  
            } 

        })   
      } 




});

//-----------------------------------------download posts------------------------------------------------------------------

const querySnapshot = await getDocs(collection(db, "posts"));
querySnapshot.forEach((docc) => {
  
  
   var post = document.getElementById('posts');
    var image = docc.data().image;
    var text = docc.data().test;
    var dt = docc.data().date;
    var owner = docc.data().owner;
    var date = new Date(dt.seconds*1000);


    getDoc(doc(db, "users", owner)).then(docSnap => {
        
      var name = docSnap.data().username;
      var profile = docSnap.data().profil;
      
       //post.innerHTML += "<div class=' w-full  shadow-sm bg-white md:w-full rounded-none  flex flex-col justify-between  px-3 h-auto ' style=' min-height: 750px;' ><div class='flex flex-row justify-evenly items-center'><div class='flex flex-row items-center gap-3 w-full'><div class='relative flex items-center p-3  '><img src='"+profile+"' class='object-cover w-10 h-10 rounded-full' alt='username' /><span class='absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3'></span></div><div class=' h-max flex flex-col justify-center '><h1 class='block ml-2 font-semibold text-gray-600' >"+name+"</h1><p class='block ml-2 text-sm text-gray-600'>"+date+"</p></div></div><div class='antialiased group inline-block relative h-max w-max '><button class=' w-full h-max flex flex-row justify-end mr-28 mb-4'><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z' /></svg></button><div class='absolute hidden  flex-col  gap-2 group-hover:block mr-20 shadow-xl  border-blue-700   '><li class=' flex flex-row items-center gap-2 px-5 bg-white hover:bg-blue-50'><svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' /></svg><a class=' py-2 px-4 block whitespace-no-wrap' href='#'>Edit</a></li><li class=' flex flex-row items-center gap-1 px-4 bg-white hover:bg-blue-50'><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' /></svg><a class='py-2 px-4 block whitespace-no-wrap' href='#'>Delete</a></li><li class=' flex flex-row items-center gap-1 px-4 bg-white hover:bg-blue-50'><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' /></svg><a class='py-2 px-4 block whitespace-no-wrap' href='#'>Télécharger</a></li></div></div></div><p class='w-full h-auto my-3'>"+text+"</p><div class=' bg-center w-full h-full rounded-sm bg-cover bg-no-repeat'><img class='object-cover w-full h-full' src='"+image+"' alt='username'/></div><div class=' rounded-full  flex flex-row w-full justify-evenly items-center '><button class=' h-14 w-36 to-blue-50 hover:bg-[color:#FFEDCC] flex flex-row justify-center items-center gap-2'><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 transition hover:-translate-y-1' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='1'><path stroke-linecap='round' stroke-linejoin='round' d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5' /></svg><p class=' font-semibold text-gray-500'>J'aime</p></button><button class=' h-14 w-36 to-blue-50 hover:bg-[color:#FFEDCC] flex flex-row items-center justify-center gap-2 ' onclick='document.getElementById('comment').style.display='block''><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 transition hover:-translate-y-1' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='1'><path stroke-linecap='round' stroke-linejoin='round' d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' /></svg><p class=' font-semibold text-gray-500'>Commenter</p></button><button class='h-14 w-36 to-blue-50 hover:bg-[color:#FFEDCC] flex flex-row justify-center items-center gap-2'><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 transition hover:-translate-y-1' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='1'><path stroke-linecap='round' stroke-linejoin='round' d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' /></svg><p class=' font-semibold text-gray-500'>Partager</p></button></div><div class='h-80 px-7 w-full  rounded-[12px] bg-white p-4' id='comment' style='display:none;'><p class='text-xl font-semibold text-blue-900 cursor-pointer transition-all hover:text-black'>Add Comment/Questions</p><textarea class='h-40 px-3 text-sm py-1 mt-5 outline-none border-pink-300 w-full resize-none border rounded-lg placeholder:text-sm' placeholder='Add your comments here'></textarea><div class='flex justify-between mt-2'> <button class='h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600'>Submit comment</button><p class='text-sm text-blue-900 '>Enter atleast 15 characters</p></div></div>"

      post.innerHTML += "<div class=' w-full  shadow-sm bg-white md:w-full rounded-none  flex flex-col justify-between  px-3 h-auto ' style=' min-height: 750px;' ><div class='flex flex-row justify-evenly items-center'><div class='flex flex-row items-center gap-3 w-full'><div class='relative flex items-center p-3  '><img src='"+profile+"' class='object-cover w-10 h-10 rounded-full' alt='username' /><span class='absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3'></span></div><div class=' h-max flex flex-col justify-center '><h1 class='block ml-2 font-semibold text-gray-600' >"+name+"</h1><p class='block ml-2 text-sm text-gray-600'>"+date+"</p></div></div><div class='antialiased group inline-block relative h-max w-max '><button class=' w-full h-max flex flex-row justify-end mr-28 mb-4'><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z' /></svg></button><div class='absolute hidden  flex-col  gap-2 group-hover:block mr-20 shadow-xl  border-blue-700   '><li class=' flex flex-row items-center gap-2 px-5 bg-white hover:bg-blue-50'><svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' /></svg><a class=' py-2 px-4 block whitespace-no-wrap' href='#'>Edit</a></li><li class=' flex flex-row items-center gap-1 px-4 bg-white hover:bg-blue-50'><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' /></svg><a class='py-2 px-4 block whitespace-no-wrap' href='#'>Delete</a></li><li class=' flex flex-row items-center gap-1 px-4 bg-white hover:bg-blue-50'><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' /></svg><a class='py-2 px-4 block whitespace-no-wrap' href='#'>Télécharger</a></li></div></div></div><p class='w-full h-auto my-3'>"+text+"</p><div class=' bg-center w-full h-full rounded-sm bg-cover bg-no-repeat'><img class='object-cover w-full h-full' src='"+image+"' alt='username'/></div><div class=' rounded-full  flex flex-row w-full justify-evenly items-center '><button class=' h-14 w-36 to-blue-50 hover:bg-[color:#FFEDCC] flex flex-row justify-center items-center gap-2'><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 transition hover:-translate-y-1' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='1'><path stroke-linecap='round' stroke-linejoin='round' d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5' /></svg><p class=' font-semibold text-gray-500'>J'aime</p></button><button class=' h-14 w-36 to-blue-50 hover:bg-[color:#FFEDCC] flex flex-row items-center justify-center gap-2 ' onclick='document.getElementById('comment').style.display='block''><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 transition hover:-translate-y-1' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='1'><path stroke-linecap='round' stroke-linejoin='round' d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' /></svg><p class=' font-semibold text-gray-500'>Commenter</p></button><button class='h-14 w-36 to-blue-50 hover:bg-[color:#FFEDCC] flex flex-row justify-center items-center gap-2'><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 transition hover:-translate-y-1' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='1'><path stroke-linecap='round' stroke-linejoin='round' d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' /></svg><p class=' font-semibold text-gray-500'>Partager</p></button></div><div class='h-80 px-7 w-full  rounded-[12px] bg-white p-4' id='comment' style='display:none;'><p class='text-xl font-semibold text-blue-900 cursor-pointer transition-all hover:text-black'>Add Comment/Questions</p><textarea class='h-40 px-3 text-sm py-1 mt-5 outline-none border-pink-300 w-full resize-none border rounded-lg placeholder:text-sm' placeholder='Add your comments here'></textarea><div class='flex justify-between mt-2'> <button class='h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600'>Submit comment</button><p class='text-sm text-blue-900 '>Enter atleast 15 characters</p></div></div>"


     

  })


  
    

    
  
   //post.innerHTML += "<div class=' w-full  shadow-sm bg-white md:w-full rounded-none  flex flex-col justify-between  px-3 h-auto ' style=' min-height: 750px;' ><div class='flex flex-row justify-evenly items-center'><div class='flex flex-row items-center gap-3 w-full'><div class='relative flex items-center p-3  '><img src='"+image+"' class='object-cover w-10 h-10 rounded-full' alt='username' /><span class='absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3'></span></div><div class=' h-max flex flex-col justify-center '><h1 class='block ml-2 font-semibold text-gray-600' >"+docc.data().owner+"</h1><p class='block ml-2 text-sm text-gray-600'>"+date+"</p></div></div><div class='antialiased group inline-block relative h-max w-max '><button class=' w-full h-max flex flex-row justify-end mr-28 mb-4'><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z' /></svg></button><div class='absolute hidden  flex-col  gap-2 group-hover:block mr-20 shadow-xl  border-blue-700   '><li class=' flex flex-row items-center gap-2 px-5 bg-white hover:bg-blue-50'><svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' /></svg><a class=' py-2 px-4 block whitespace-no-wrap' href='#'>Edit</a></li><li class=' flex flex-row items-center gap-1 px-4 bg-white hover:bg-blue-50'><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' /></svg><a class='py-2 px-4 block whitespace-no-wrap' href='#'>Delete</a></li><li class=' flex flex-row items-center gap-1 px-4 bg-white hover:bg-blue-50'><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' /></svg><a class='py-2 px-4 block whitespace-no-wrap' href='#'>Télécharger</a></li></div></div></div><p class='w-full h-auto my-3'>"+text+"</p><div class=' bg-center w-full h-full rounded-sm bg-cover bg-no-repeat'><img class='object-cover w-10 h-10 full' src='"+image+"' alt='username'/></div><div class=' rounded-full  flex flex-row w-full justify-evenly items-center '><button class=' h-14 w-36 to-blue-50 hover:bg-[color:#FFEDCC] flex flex-row justify-center items-center gap-2'><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 transition hover:-translate-y-1' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='1'><path stroke-linecap='round' stroke-linejoin='round' d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5' /></svg><p class=' font-semibold text-gray-500'>J'aime</p></button><button class=' h-14 w-36 to-blue-50 hover:bg-[color:#FFEDCC] flex flex-row items-center justify-center gap-2 ' onclick='document.getElementById('comment').style.display='block''><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 transition hover:-translate-y-1' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='1'><path stroke-linecap='round' stroke-linejoin='round' d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' /></svg><p class=' font-semibold text-gray-500'>Commenter</p></button><button class='h-14 w-36 to-blue-50 hover:bg-[color:#FFEDCC] flex flex-row justify-center items-center gap-2'><svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 transition hover:-translate-y-1' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='1'><path stroke-linecap='round' stroke-linejoin='round' d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' /></svg><p class=' font-semibold text-gray-500'>Partager</p></button></div><div class='h-80 px-7 w-full  rounded-[12px] bg-white p-4' id='comment' style='display:none;'><p class='text-xl font-semibold text-blue-900 cursor-pointer transition-all hover:text-black'>Add Comment/Questions</p><textarea class='h-40 px-3 text-sm py-1 mt-5 outline-none border-pink-300 w-full resize-none border rounded-lg placeholder:text-sm' placeholder='Add your comments here'></textarea><div class='flex justify-between mt-2'> <button class='h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600'>Submit comment</button><p class='text-sm text-blue-900 '>Enter atleast 15 characters</p></div></div>"

    
 
});



//----------------------------------------------------Upload post-----------------------------------------------------------------------

var fileButton = document.getElementById('fileButton');

  fileButton.addEventListener('change', function(e){
  var file = e.target.files[0];
  const storageRef = sRef(storage, 'posts/'+file.name);

po.addEventListener('click', (e) => {

  var test = document.getElementById('test').value;
 
uploadBytes(storageRef, file).then((snapshot) => {
  
  

  getDownloadURL(sRef(storage, 'posts/'+file.name))
  .then((url) => {



    onAuthStateChanged(auth, (user) => {
      
      var owner = user.uid;
      addDoc(collection(db, "posts"), {
        owner: owner,
        image: url,
        test: test,
        date: new Date(),
      });

    
      
    });

  })
});
location.reload();

})
  })

 


  //----------------------------------------------------------profil ----------------------------------------------------


  var profil_file = document.getElementById('profil_file');
  
  profil_file.addEventListener('change', function(e){
    var file = e.target.files[0];
    const storageRef = sRef(storage, 'profils/'+file.name);
  
  
  
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    getDownloadURL(sRef(storage, 'profils/'+file.name))
    .then((url) => {

 
      onAuthStateChanged(auth, (user) => {


        const washingtonRef = doc(db, "users", user.uid);
      
       
        updateDoc(washingtonRef, {
          profil: url,
      });  
      });
    })
  });
    });
  

  
   //----------------------------------------------------------backround profil----------------------------------------------------


   var backProfil = document.getElementById('backProfil');
  
   backProfil.addEventListener('change', function(e){
     var file = e.target.files[0];
     const storageRef = sRef(storage, 'backprofils/'+file.name);
   
   
   
   uploadBytes(storageRef, file).then((snapshot) => {
     console.log('Uploaded a blob or file!');
     getDownloadURL(sRef(storage, 'backprofils/'+file.name))
     .then((url) => {
 
  
       onAuthStateChanged(auth, (user) => {
 
 
         const washingtonRef = doc(db, "users", user.uid);
       
         
         updateDoc(washingtonRef, {
          backProfil: url,
       });  
       });
     })
   });
     });

//--------------------------------------------------------------image profil posts --------------------------------------




var list_contact = document.getElementById('list_contact');

     const q = await getDocs(collection(db, "users"));
       q.forEach((docc) => {
  
  
      var name = docc.data().username;
      var profil = docc.data().profil;
      var uid = docc.id;
      
      
      
      list_contact.innerHTML += '<a class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300  cursor-pointer hover:bg-gray-100 focus:outline-none"> <button id= ' + uid + '  class="btn w-full h-full flex flex-row items-center" > <img class="object-cover w-10 h-10 rounded-full" src="' + profil + '" alt="profil" /><div class="w-full pb-2"><div class="flex justify-between"><span class="block ml-2 font-semibold text-gray-600">' + name + '</span></div></div></button></a>'



    });