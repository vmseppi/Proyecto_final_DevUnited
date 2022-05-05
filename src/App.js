import "./App.css";
import AppRouter from "./AppRouter.js";
import { useEffect, useState } from "react";
import firebase, { firestore, auth, logout } from "./firebase/firebase.js";
import { collections } from "./firebase/firebaseConfig.js";
import swal from 'sweetalert';



// import userImg from "./userImg.jpg";


// import TweetsApp from "./TweetsApp.js";
// import Profile from "./Profile.js";
// import PantallaInicio from "./PantallaInicio.js";


function App() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({
    tweet: "",
    user: "",
    id: "",
    uid: "",
    email: "",
    imagen: "",
  });
  //login con google
  const [user, setUser] = useState(null);
  //
  const handleTweetChange = (e) => {
    let nuevoTweet = {
      ...tweet,
      tweet: e.target.value,
      likes: [],
      uid: user.uid,
      email: user.email,
      user: user.displayName,
      imagen: user.photoURL,
    };
    setTweet(nuevoTweet);
  };

  //borrar comentarios
  const handleDelete = (id) => {
    swal({
      title: "¿Seguro que deseas eliminarlo?",
      text: "Una vez eliminado no podrás recuperar este tweet",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete)=>{
      if (willDelete){
    const nuevosTweets = tweets.filter((tweet) => tweet.id !== id);
    setTweets(nuevosTweets);
    firestore.doc(`${collections.TWEETS}/${id}`).delete()
    swal("Se elimino correctamente", {icon:"success"});
  } else {
    swal("se guardo tu tweet")
  }
  });
}


  //manejador likes
  const handleLikes = async (id, uidUser, isLike) => {
    const fieldValueRef = firebase.firestore.FieldValue;
    await firestore
      .collection(`${collections.TWEETS}`)
      .doc(id)
      .update({
        likes: isLike
          ? fieldValueRef.arrayRemove(uidUser)
          : fieldValueRef.arrayUnion(uidUser),
      });
    //  if (!likes) likes = 0;
    // firestore.doc(`${collections.TWEETS}/${id}`).update({likes: likes + 1 });
  };
  //validar cantidad de caracteres
  // const verificarTx = () => {
  //   if (tweet.tweet.length > 280) {
  //     Error.prototype("Tu tweet debe ser mas pequeño");
  //   } else {
  //     console.log("");
  //   }
  // };

  //eliminar likes
  //envio tweet a la colleccion
  const sendTweet = () => {
    // let campo = verificarTx(tweet.tweet.length);
    let enviarTweet = firestore.collection(collections.TWEETS).add(tweet);
    let solicitarDocumento = enviarTweet.then((docRef) => docRef.get());
    solicitarDocumento.then((doc) => {
      const nuevoTweet = {
        tweet: doc.data().tweet,
        user: doc.data().user,
        id: doc.id,
        likes: doc.data().likes,
        uid: user.uid,
        email: user.email,
        imagen: doc.data().imagen,
      };

      setTweets([...tweets, nuevoTweet]);
      setTweet({
        tweet: "",
        user: "",
      });
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  //coneccion con base de datos
  useEffect(() => {
    firestore.collection(collections.TWEETS).onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => {
        return {
          tweet: doc.data().tweet,
          user: doc.data().user,
          id: doc.id,
          likes: doc.data().likes,
          uid: doc.data().uid,
          email: doc.data().email,
          imagen: doc.data().imagen, //
        };
      });
      setTweets(tweetArray);
    });
  }, []);

  return (
    <div className="App">
      <div className="formulario">
        <AppRouter
          sendTweet={sendTweet}
          handleTweetChange={handleTweetChange}
          handleDelete={handleDelete}
          handleLikes={handleLikes}
          logout={logout}
          tweets={tweets}
          tweet={tweet}
          user={user}
        />
        {/* {user ? (
          <>
            <TweetsApp
              user={user}
              sendTweet={sendTweet}
              handleTweetChange={handleTweetChange}
              handleDelete={handleDelete}
              handleLikes={handleLikes}
              logout={logout}
              tweets={tweets}
              tweet={tweet}
              setOpenProfile={setOpenProfile}
            />
            {openProfile && (
              <Profile
                tweets={tweets}
                user={user}
                handleDelete={handleDelete}
                handleLikes={handleLikes}
                userImg={userImg}
                setOpenProfile={setOpenProfile}
              />
            )}
          </>
        ) : (
          <PantallaInicio />
        )} */}
      </div>
    </div>
  );
}

export default App;
