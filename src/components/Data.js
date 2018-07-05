import React from 'react'
import Loading from './Loading'
import Menu from './Menu'
class Data extends React.Component {
    constructor(props){
        super(props)
        this.state={
            metadata:props.metadata,
            sensors : props.sensors,
            geocoding:props.geocoding,
            selectedSensorTitle:'',
        }

    }
    componentDidMount(){

         }
    componentDidUpdate(){
        console.log("------Update---------")

    }

    render(){
        if(this.state.metadata !== undefined && this.state.geocoding.address !== undefined){
            document.getElementById('head').innerHTML = this.state.metadata.name;
            return(
               
                    <div> 
                        <Menu sensors={this.state.sensors}
                            senseBoxID={this.state.metadata._id}/>
                    </div>  
            
            )   
        }
        return(
            <Loading/>    
            )
        }

}
export default Data 
