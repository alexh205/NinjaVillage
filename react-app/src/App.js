import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import Header from './components/header/Header'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    // <div>
    <Header />
    // </div>
    // <BrowserRouter>
    //   <NavBar />
    //   <Switch>
    //     <Route path='/login' exact={true}>
    //       <LoginForm />
    //     </Route>
    //     <Route path='/sign-up' exact={true}>
    //       <SignUpForm />
    //     </Route>
    //     <ProtectedRoute path='/users' exact={true} >
    //       <UsersList/>
    //     </ProtectedRoute>
    //     <ProtectedRoute path='/users/:userId' exact={true} >
    //       <User />
    //     </ProtectedRoute>
    //     <Route path='/' exact={true} >
    //       <h1>My Home Page</h1>
    //     </Route>
    //   </Switch>
    // </BrowserRouter>
  );
}

export default App;
