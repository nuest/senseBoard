import React from 'react'
import { LineChart, Line,CartesianGrid,XAxis,YAxis,Tooltip,Legend } from 'recharts';
import Loading from './Loading';

/* gets called from statistics with props : data */
class Stats extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            b64image:null
        }
        this.fetchStats = this.fetchStats.bind(this);
    }

    componentDidMount(){
        this.fetchStats()
        console.log(this.props)
    }

    fetchStats(){
        const url ='python/'+this.props.url
        fetch(url)
        .then((response)=>response.json())
        .then((json)=>{
            this.setState({
                b64image:"data:image/jpeg;base64," + json[0].substring(2,json[0].length-1)
            })
        })
        .then(()=>this.setState({loading:false}))
    }

    render(){
        if(this.state.loading){
            return(
                <Loading/>
            )
        }
        return(
            <div>
                <img src={this.state.b64image}/>
            </div>

        )
    }
}

export default Stats