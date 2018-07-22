import React, { Component } from 'react'
import Home from './Home'
import About from './About'
import FetchBox from './fetchBox'
import {
  BrowserRouter,
  Route,
  Link,

} from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      input:'',

    }
    
  } 
  componentDidMount(){

   }

  componentDidUpdate(){

  }

  
  onChange(i, value, tab, ev) {
    console.log(arguments);
  }

  onActive(tab) {
    console.log(arguments);
  }

  render() {

    return (
        <BrowserRouter>
          <div>
            <nav className="navheader navbar navbar-expand-md navbar-dark bg-dark">
              <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active left">
                    <Link className='nav-link' to='/'>Home</Link>
                    </li>
                    <li className="nav-item active left">
                    <Link className='nav-link' to='/fetchBox'>Box</Link>
                    </li>
                    <li className="nav-item active left">
                    <Link className='nav-link' to='/about'>About</Link>
                      </li>
                </ul>
            </div>
            <div className="mx-auto order-0">
                <Link id="head"className='navbar-brand mx-auto' to='/'>senseBoard</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav photo ml-auto">
                    <li className="nav-item photo">
                   <a href='https://www.sensebox.de'> 
                   <img src='https://raw.githubusercontent.com/sensebox/resources/master/images/sensebox_logo_neu.png' width='200' height='70' alt="des"/>
                    </a>
                    </li>
                </ul>
            </div>
            </nav>
            <Route exact path='/' component={Home}/>
            <Route path='/fetchBox' component={FetchBox}/>
            <Route path='/about' component={About}/>
        </div>
    </BrowserRouter>

    )
   }
}

export default App
