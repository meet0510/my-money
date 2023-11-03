import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import Update from "./pages/update/Update";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {user && <Home />}
              {!user && <Redirect to='/login' />}
            </Route>
            <Route exact path="/update/:id">
              {user && <Update />}
              {!user && <Redirect to='/' />}
            </Route>
            <Route exact path="/login">
              {!user && <Login />}
              {user && <Redirect to='/' />}
            </Route>
            <Route exact path="/signup">
              {!user && <Signup />}
              {user && <Redirect to='/' />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
