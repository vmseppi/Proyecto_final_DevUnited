import { useState } from "react";
import PostUsuario from "./post.js";
import Favoritos from "./Favoritos.js";
import userImg from "./userImg.jpg";



function Profile({ tweet,tweets, user, handleDelete, handleLikes, setOpenProfile }) {
  const [tabs, setTabs] = useState(0);

  return (
    <div className="perfilguardado">
      <div className="headerperfil">
      <div  className="menu1">{user.displayName}!</div>
      </div>
      <div className="menudos"> 
      <img
            className="user-profile-pic"
            src={user.photoURL}
            alt="photoURL"
          />
          <div className="nombredos" onClick={() => setOpenProfile(false)}>{user.displayName}</div>
      </div>   
        <div>
        <div className="post" onClick={() => setTabs(0)}>POST</div>
        <div className="post" onClick={() => setTabs(1)}>FAVORITOS</div>
      </div>
      <div  className="contenedortweet"hidden={tabs !== 0}>
        {tweets.map(
          (tweet) =>(
        <PostUsuario 
                key={tweet.id}
                tweet={tweet}
                user={user}
                handleDelete={handleDelete}
                handleLikes={handleLikes}
                userImg={userImg}/>))
        }
      </div>
      <div hidden={tabs !== 1}>
        {tweets.map(
          (tweet) =>
            tweet.likes.includes(user.uid) && (
              <Favoritos
                key={tweet.id}
                tweet={tweet}
                user={user}
                handleDelete={handleDelete}
                handleLikes={handleLikes}
                userImg={userImg}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Profile;
