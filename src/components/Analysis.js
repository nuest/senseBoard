import React from 'react'
import Minimum from '../functions/getMin'
import Average from '../functions/getAverage'
import Shift from '../functions/getShift'
import Maximum from '../functions/getMax'
import Loading from './Loading'

/* Gets called from statistics with props : data */
class Analysis extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data:[]
        }
        this.handleProps = this.handleProps.bind(this)
    }
    handleProps(){
        var data = []
        for(var i=0;i<this.props.data.length;i++){
            data.push(this.props.data[i].value)
        }
        this.setState({data:data})
    }
    componentDidMount(){
        this.handleProps()
    }
    render(){
        return(
        <ul>
            <Average data={this.state.data}/>
            <Maximum data={this.state.data}/>
            <Minimum data={this.state.data}/>
            {/* <Shift data={this.props.data}/> */}
        </ul>
        )
    }
}

export default Analysis