import { Route, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

import TweetsApp from "./TweetsApp.js";
import PantallaInicio from "./PantallaInicio";
import Profile from "./Profile";

const AppRouter = ({
  sendTweet,
  handleTweetChange,
  handleDelete,
  handleLikes,
  logout,
  tweets,
  tweet,
  user,
}) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRouter user={user}>
            <PantallaInicio />
          </PublicRouter>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRouter user={user}>
            <TweetsApp
              user={user}
              sendTweet={sendTweet}
              handleTweetChange={handleTweetChange}
              handleDelete={handleDelete}
              handleLikes={handleLikes}
              logout={logout}
              tweets={tweets}
              tweet={tweet}
            />
          </PrivateRouter>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRouter user={user}>
            <Profile
              tweet={tweet}
              tweets={tweets}
              user={user}
              handleDelete={handleDelete}
              handleLikes={handleLikes}
              //


            />
          </PrivateRouter>
        }
      />
    </Routes>
  );
};

export default AppRouter;
