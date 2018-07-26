import React, { Component } from 'react'
import Home from './Home'
import About from './About'
import FetchBox from './fetchBox'
import {
  BrowserRouter,
  Route,
  

} from 'react-router-dom'
import { Nav, NavIcon, NavText,withRR4 } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import {ic_home} from 'react-icons-kit/md/ic_home'
import {ic_info_outline} from 'react-icons-kit/md/ic_info_outline'
import {ic_brush} from 'react-icons-kit/md/ic_brush'
const SideNav = withRR4()
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
        <div className="">
        <div className="row">
        <div className="col-md-2" style={{background: '#273036', color: '#FFF',height:1000, width: 220}}> 
        <SideNav highlightColor='#4EAF47' highlightBgColor='#273036' defaultSelected='Home'>       
            <Nav id='Home'>
                <NavIcon><SvgIcon size={20} icon={ic_home}/></NavIcon>    
                <NavText> Home </NavText>
            </Nav>
            <Nav id='fetchBox'>
                <NavIcon><SvgIcon size={20} icon={ic_brush}/></NavIcon>
                <NavText> Story Builder </NavText>
            </Nav>
            <Nav id='About'>
                <NavIcon><SvgIcon size={20} icon={ic_info_outline}/></NavIcon>
                <NavText> About  </NavText>
            </Nav>
        </SideNav>
        </div>
        <div className="col-md-10 playground">
            <Route exact path='/' component={Home}/>
            <Route path='/fetchBox' component={FetchBox}/>
            <Route path='/about' component={About}/>
            <Route path='/Home' component={Home}/>

        </div>
        </div>
    <section id="footer">
		<div className="container fott">
					<ul className="list-unstyled list-inline social text-center">
						<li className="list-inline-item"><a href="https://twitter.com/sensebox_de"><i className="fa fa-twitter"></i></a></li>
						<li className="list-inline-item"><a href="https://www.facebook.com/sensebox.de"><i className="fa fa-facebook"></i></a></li>
					</ul>
				<div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
					<p><u><a href="https://www.sensebox.de/">senseBox</a></u> is a GI@School project at the WWU Münster<br></br>
					This app was built by Eric Thieme-Garmann</p>
				</div>
  		</div>
	</section>
        </div>
    </BrowserRouter>

    )
   }
}

export default App
