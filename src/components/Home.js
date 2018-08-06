import React from 'react';


class Home extends React.Component{
    constructor(props){
        console.log(props)
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