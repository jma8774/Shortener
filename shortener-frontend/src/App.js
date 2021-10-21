import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home.js';
import About from './pages/About.js';
import './App.css';

function App() {
  return (
      <main>
          <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} />
          </Switch>
      </main>
  )
}
export default App;
