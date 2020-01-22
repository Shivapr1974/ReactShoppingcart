import React  from 'react';
import './App.css';
import Todos from './components/Todos'
import About from './components/About';
import Shop from './components/Shop'
import Nav from './nav';
import ItemDetail from './components/ItemDetail'
import "react-dom";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CartPage from './components/CartPage';
import AppBar from '@material-ui/core/AppBar';
import MenuNav from './MenuNav';
import {Link} from 'react-router-dom';

// URL : https://www.youtube.com/watch?v=hQAHSlTtcmY
// URL : https://www.youtube.com/watch?v=Law7wfdg_ls
// URL : https://medium.com/@sebastianfrancoflix/ngif-on-react-c4a67d2de011
// URL: https://www.freecodecamp.org/news/the-react-cheatsheet-for-2020/

function App() {
  const navStyle = {
    color: 'white',
    textDecoration: 'none'
  }  
  // const menustyle = {
  //     marginLeft: '-220px'
  // }
  return (
    <Router>
      <AppBar> 
        {/* <Nav></Nav> */}
        <div id="header" className="center">
              <div id="title"> 
                <span id="menuId"> <MenuNav></MenuNav> </span>
                    <Link style={navStyle} to='/'>
                        <h2>Shopping Cart</h2>
                    </Link>
                <span id="right"></span>
              </div>
			        {/* <div style="clear: both;"></div> */}
		    </div>        
        {/* <span className="nav-links">
               <span style={menustyle}> <MenuNav></MenuNav></span>
                <Link style={navStyle} to='/'>
                    <h2>Shopping Cart App</h2>
                </Link>
         </span> */}
      </AppBar>      
      <br/><br/><br/><br/><br/>
      <div className="div-body">
        <Switch>
          <Route path="/" exact component={Shop}></Route>
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
