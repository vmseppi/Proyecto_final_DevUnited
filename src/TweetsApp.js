import userImg from "./userImg.jpg";
import flecha from "./logout.jpg";
import { Link } from "react-router-dom";

const TweetsApp = ({
  sendTweet,
  handleTweetChange,
  handleDelete,
  handleLikes,
  user,
  logout,
  tweets,
  tweet,
  setOpenProfile,
}) => {
  return (
    <>
      <div className="user-profile">
        <Link to="/profile">
          <div className="usuariologueado">{user.displayName}!</div>
        </Link>
        <div className="botonlogout" onClick={logout}>
          Log Out
          <img src={flecha} className="flecha" alt="" />
        </div>
      </div>
      <div className="zonadetweet">
        <Link to="/profile">
          <img
            className="user-profile-pic"
            src={user.photoURL}
            alt="photoURL"
          />
        </Link>
        <textarea
          placeholder="What´s happening"
          className="textarea"
          value={tweet.tweet}
          onChange={handleTweetChange}
        ></textarea>
        <button className="botonpost" onClick={sendTweet}>
          POST
        </button>
      </div>
      <div className="contextotweet">
        {tweets.map((tweet) => {
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
        })}
      </div>
    </>
  );
};

export default TweetsApp;
