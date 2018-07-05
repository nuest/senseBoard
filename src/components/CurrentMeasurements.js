import React from 'react'

class CurrentMeasurements extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            sensors:props.sensors

        }
    }

    
    render(){
        return(
            <div>
            <p> These are your current measurements. To get in depth information to these phenomenons select one in the navbar above</p>
            <ul>
            {this.state.sensors.map((sensors)=>(
                <li key={sensors._id}>{sensors.title}: {sensors.lastMeasurement.value} {sensors.unit} </li>
            ))}
            </ul>
            </div>
        )
    }
}

export default CurrentMeasurements