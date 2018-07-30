import React from 'react'
import Statistics from './Statistics'
import {
    BrowserRouter,
    Route,
    Link,
    Redirect
  } from 'react-router-dom'
// localhost:3000/Stats/570bad2b45fd40c8197f13a2/Luftdruck/2018-06-30/2018-07-30/360000/false
class Permalink extends React.Component{

    constructor(props){
        super(props)
        this.state={
        }


    }//End constructor

    render(){
        return(
            <BrowserRouter>
                <div>
                 <Redirect to ="/Overviews"/>
                 <Route path='/Overviews' component={()=>(<Statistics perma='true' props = {this.props.match} />)}/>
            </div>
            </BrowserRouter>
        )
    }
}

export default Permalink
