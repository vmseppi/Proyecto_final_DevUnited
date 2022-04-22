import React from "react";
import styles from "./post.css";

const PostUsuario = ({tweet, user, handleDelete, handleLikes, userImg})=>{
    console.log({tweet, user, handleDelete, handleLikes, userImg})
if (tweet.uid === user.uid ){
    return(
        <div className={styles.contenedortweet}>
           { user.photoURL ? (<img className='img-user' src={tweet.imagen} alt=''/>): (<img className='img-user'  src={userImg}/>)}
          <p>By: @ {tweet.user }</p>
          <p>Tweet: {tweet.tweet}</p>
          <button onClick={()=>handleLikes(tweet.id, user.uid)}>{tweet.likes.length}</button>
          { user && tweet.uid === user.uid && ( <span className='delete' onClick={ ()=> handleDelete(tweet.id)}>BORRAR</span> )}
        </div>
    ) } else return("")
    
    } 
export default PostUsuario;