import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Forum from "./components/ForumMain";
import CreateForumPage from "./components/ForumMain/CreateForumPage";
import ForumCategory from "./components/ForumMain/ForumCat";
import SingleForumPage from "./components/ForumMain/SingleForumPage";
import EditForumPage from "./components/ForumMain/EditForumPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/play'>
            { }
          </Route>
          <Route exact path='/forum/'>
            <Forum />
          </Route>
          <Route exact path='/forum/edit'>
            <EditForumPage />
          </Route>
          <Route exact path='/forum/:category'>
            <ForumCategory />
          </Route>
          <Route exact path='/forum/:category/createForum'>
            <CreateForumPage />
          </Route>
          <Route exact path='/forum/:category/:header'>
            <SingleForumPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
