import React from 'react'
import { LineChart, Line,CartesianGrid,XAxis,YAxis,Tooltip,Legend } from 'recharts';
import Loading from './Loading';

/* gets called from statistics with props : data */
class Stats extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
    }

    render(){
        
        return(
            <div>
                <LineChart width={800} height={400} data={this.props.data}  margin={{ top: 5, right: 20, bottom: 5, left: 40 }} syncId="newID" >
                    <Line name="Smidehes" type="linear" dataKey="value" stroke="#4EAF47" />
                    <CartesianGrid stroke="#ccc"/>
                    <XAxis dataKey="Time"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend verticalAlign="top" height={36}/>
                </LineChart>    
            </div>

        )
    }
}

export default Stats