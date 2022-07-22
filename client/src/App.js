import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';

import Layout from './components/Layout/Layout';
import Home from './containers/Home/Home';
import CurrentGame from './containers/CurrentGame/CurrentGame';
import PastGame from './containers/PastGame/PastGame';

function App() {


  let routes = (
    <Switch>
      <Route path="/home" component={Home}/>
      <Route path="/current" component={CurrentGame}/>
      <Route path="/past" component={PastGame}/>
      <Redirect to="/home" />
    </Switch>
  );
  
  return (
    <BrowserRouter>
      <Layout>
        {routes}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
