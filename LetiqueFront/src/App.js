import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Page from "./Components/Page/Page";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
          <div className="App">
              <Router>
                  <Switch>
                      <Route path='/'>
                          <Page />
                      </Route>
                  </Switch>
              </Router>
          </div>
  );
}

export default App;
