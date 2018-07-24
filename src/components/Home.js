import React from 'react';
import SvgIcon from 'react-icons-kit';
import {ic_date_range} from 'react-icons-kit/md/ic_date_range'
import {ic_router} from 'react-icons-kit/md/ic_router'
import {ic_refresh} from 'react-icons-kit/md/ic_refresh'
import {ic_brush} from 'react-icons-kit/md/ic_brush'
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        console.log(e.target.value)
    }
    componentDidMount() {
    }
    render(){
        return(
            <div>
            <h1>Welcome to senseBoard</h1>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>

            </div>
        )
    }
}

export default Home
