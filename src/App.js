import React  from 'react';
import './App.css';
import Todos from './components/Todos'
import About from './components/About';
import Shop from './components/Shop'
import Nav from './nav';
import ItemDetail from './components/ItemDetail'
import "react-dom";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CartPage from './components/CartPage'
// URL : https://www.youtube.com/watch?v=hQAHSlTtcmY
// URL : https://www.youtube.com/watch?v=Law7wfdg_ls
// URL : https://medium.com/@sebastianfrancoflix/ngif-on-react-c4a67d2de011

function App() {
  
  return (
    <Router>
      <Nav></Nav>
      <div className="div-body">
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/about" exact component={About}></Route>
          <Route path="/shop" exact component={Shop}></Route>
          <Route path="/shop/:id/:name" exact component={ItemDetail}></Route>
          <Route path="/todos" exact component={Todos}></Route>
          <Route path="/cart" exact component={CartPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <>
      <h1>Home Page</h1>
  </>
)
export default App;
