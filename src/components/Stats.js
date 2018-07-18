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
                <LineChart width={1000} height={390} data={this.props.data}  margin={{ top: 0, right: 5, bottom: 0, left: 0 }} >
                    <Line name="senseBox" type="linear" dataKey="valueBox" stroke="#4EAF47" />
                    <Line name="DWD" type="linear" dataKey="valueDWD" stroke="#343a40" />
                    <CartesianGrid stroke="#ccc"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend verticalAlign="top" height={36}/>
                </LineChart>    
            </div>

        )
    }
}

export default Stats