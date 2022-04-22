import React from "react";

const Favoritos = ({ tweet, user, handleDelete, handleLikes, userImg }) => {
  const isLike = tweet.likes.includes(user.uid);

  return (
    <div className="contenedortweet" key={tweet.id}>
      {user.photoURL ? (
        <img className="img-user" src={tweet.imagen} alt="" />
      ) : (
        <img className="img-user" src={userImg} alt="" />
      )}
      <p>By: @ {tweet.user}</p>
      <p>Tweet: {tweet.tweet}</p>
      <button onClick={() => handleLikes(tweet.id, user.uid, isLike)}>
        {tweet.likes.length}
      </button>
      {user && tweet.uid === user.uid && (
        <span className="delete" onClick={() => handleDelete(tweet.id)}>
          BORRAR
        </span>
      )}
    </div>
  );
};

export default Favoritos;
