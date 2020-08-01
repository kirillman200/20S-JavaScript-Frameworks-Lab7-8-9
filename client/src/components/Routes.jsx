import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';

import Register from './users/Register';
import Login from './sessions/Login';
import Logout from './sessions/Logout';


import Blogs from './blogs/Index';
import NewBlog from './blogs/New';
import EditBlog from './blogs/Edit';

function Routes ({user, setUser}) {
  return (
    <Switch>
     <Route exact path="/" render={
        renderProps => <Home
          {...renderProps}
          user={user}
        />
      }/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/register" render={
        renderProps => <Register
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/login" render={
        renderProps => <Login
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/logout" render={
        renderProps => <Logout
          {...renderProps}
          setUser={setUser}
        />
      }/>     
      
        <Route exact path="/blogs" render={
          props => user ? (
            <Blogs {...props} user={user} />
          ) : (
            <Redirect to="/"/>
          )
        }/>
      
     
     <Route exact path="/blogs/new" render={
        props => user ? (
          <NewBlog {...props} />
        ) : (
          <Redirect to="/"/>
        )
      }/>
      <Route exact path="/blogs/edit" render={
        props => user ? (
          <EditBlog {...props} />
        ) : (
          <Redirect to="/"/>
        )
      }/>
    </Switch>
  );
}

export default Routes;