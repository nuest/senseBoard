import React from 'react'
import { LineChart, Line,CartesianGrid,XAxis,YAxis,Tooltip,Legend } from 'recharts';
import Loading from './Loading';

/* gets called from statistics with props : data */
class Stats extends React.Component{
    constructor(props){
        var date = new Date()
        date = date.toISOString().substring(0,10)
        var date2 = new Date()
        date2.setMonth(date2.getMonth()-1)
        date2 = date2.toISOString().substring(0,10)
        super(props)
        this.state = {
            loading:false,
            b64image:null,
            senseBoxID:this.props.senseBoxData._id,
            phenomenon:this.props.senseBoxData.sensors[0].title,
            from:date2,
            to:date,
            window:3600000,
        }
        this.fetchStats = this.fetchStats.bind(this);
        this.updateInputId = this.updateInputId.bind(this)
        this.updateInputPhenom = this.updateInputPhenom.bind(this)
        this.updateInputFrom = this.updateInputFrom.bind(this)
        this.updateInputTo = this.updateInputTo.bind(this)
        this.updateInputWindow = this.updateInputWindow.bind(this)

        
    }

    componentDidMount(){
        //this.fetchStats()
        console.log(this.props)
    }

    fetchStats(){
        this.setState({loading:true})
        var url=this.state.senseBoxID+'/'+this.state.phenomenon+'/'+this.props.senseBoxData.currentLocation.coordinates[1]+'/'+this.props.senseBoxData.currentLocation.coordinates[1]+'/'+this.state.from+'/'+this.state.to+'/'+this.state.window
        if(this.state.phenomenon=="PM10"){
            url='python/pm10/'+url
        }
        else{url = 'python/'+url} 
        console.log(url)
        fetch(url)
        .then((response)=>response.json())
        .then((json)=>{
            this.setState({
                b64image:"data:image/jpeg;base64," + json[0].substring(2,json[0].length-1)
            })
        })
        .then(()=>this.setState({loading:false}))
    }
    updateInputPhenom(title){
        const value = title
        this.setState(({
            phenomenon:value,
     }))
    }
    updateInputId(e){
        const value = e.target.value
        this.setState(({
            senseBoxID:value,
     }))
    }
    updateInputFrom(e){
        const value = e.target.value
        this.setState(({
            from:value,
     }))
    }
    updateInputTo(e){
        const value = e.target.value
        this.setState(({
            to:value,
     }))
    }
    updateInputWindow(e){
        const value = e.target.value
        this.setState(({
            window:value,
     }))
    }
    //                            onChange={this.updateInput}

    render(){
        if(this.state.loading){
            return(
                <Loading/>
            )
        }
        return(
            <div className="row">
                <div className="col-md-6">
                    <img src={this.state.b64image}/>
                </div>
                <div className="col-md-6">
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">{this.state.phenomenon}
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            {this.props.senseBoxData.sensors.map((sensors)=>(
                                <li onClick={()=>this.updateInputPhenom(sensors.title)} key = {sensors._id}>{sensors.title}</li>
                            ))}
                        </ul>
                    </div>
                    <input type="text" name="senseBoxID" onChange={this.updateInputId} value={this.state.senseBoxID} placeholder="senseBoxID"/>
                    <input type="date" value={this.state.from} name="from" onChange={this.updateInputFrom} placeholder="Start"/>
                    <input type="date" value={this.state.to} name="to" onChange={this.updateInputTo} placeholder="To"/>
                    <input type="number" name="window" onChange={this.updateInputWindow} value={this.state.window} min="3600000" max="86400000" placeholder="window"/>
                    <input type="text" name="dwdid" placeholder="DWD Station"/>
                    <button type="submit" onClick={this.fetchStats} value="Apply">Apply</button>
                </div>
            </div>

        )
    }
}

export default Stats