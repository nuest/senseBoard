import React from 'react';
import SvgIcon from 'react-icons-kit';
import {ic_brush} from 'react-icons-kit/md/ic_brush'
import Modal from 'react-modal'

const customStyles = {
    content : {
        width:'1200px',
        height:'800px',
        color: 'green',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  Modal.setAppElement('#root');


class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        };
    }
    closeModal() {
    }

    componentDidMount(){
    }

    componentWillUpdate(){
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
