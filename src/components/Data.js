import React from 'react'
import Loading from './Loading'
import Menu from './Menu'
import Statistics from './Statistics';
class Data extends React.Component {
    constructor(props){
        super(props)
        this.state={
        }

    }
    componentDidMount(){
        this.setState({loading:false})
         }
    componentDidUpdate(){
    }
    
    render(){
            // document.getElementById('head').innerHTML = this.props.metadata.name;
            return(
                    <div> 
                        <Menu senseBox={this.props.metadata}/>
                    </div>  
            
            )   
        }
}
export default Data 
