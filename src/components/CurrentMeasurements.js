import React from 'react'
import Loading from './Loading'
/* Gets called from component Menu with props : sensors[]*/

class CurrentMeasurements extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
    }
    render(){
        if(typeof this.props.sensors === 'undefined'){
            return(
                <Loading/>
            )
        }
        return(
            <div>
                <p> These are your current measurements. To get in depth information to these phenomenons select one in the navbar above</p>
                <ul>
                    {this.props.sensors.map((sensors)=>(
                        <li key={sensors._id}>{sensors.title}: {sensors.lastMeasurement.value} {sensors.unit} </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default CurrentMeasurements