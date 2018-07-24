import React from 'react'
import Loading from './Loading';
import SvgIcon from 'react-icons-kit';
import {ic_date_range} from 'react-icons-kit/md/ic_date_range'
import {ic_router} from 'react-icons-kit/md/ic_router'
import {ic_refresh} from 'react-icons-kit/md/ic_refresh'
import {ic_cloud_queue} from 'react-icons-kit/md/ic_cloud_queue'/* gets called from statistics with props : data */
import {ic_brush} from 'react-icons-kit/md/ic_brush'

class Stats extends React.Component{
    constructor(props){
        var to = new Date()
        to = to.toISOString().substring(0,10)
        var from = new Date()
        from.setMonth(from.getMonth()-1)
        from = from.toISOString().substring(0,10)
        super(props)
        this.state = {
            loading:false,
            b64image:null,
            senseBoxID:this.props.senseBoxData._id,
            phenomenon:this.props.senseBoxData.sensors[0].title,
            from:from,
            to:to,
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
        this.fetchStats()
    }

    fetchStats(){
        this.setState({loading:true})
        var url=this.state.senseBoxID+'/'+this.state.phenomenon+'/'+this.props.senseBoxData.currentLocation.coordinates[1]+'/'+this.props.senseBoxData.currentLocation.coordinates[1]+'/'+this.state.from+'/'+this.state.to+'/'+this.state.window
        if(this.state.phenomenon==="PM10"){
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
    updateInputPhenom(e){
        const value = e.target.value
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
    render(){
        if(this.state.loading){
            return(
                <Loading/>
            )
        }
        return(
        <div className="stats">           
        <div className="row">
        <div className="form-group col-md-6">
            <div className="input-group col-md-6">
            <span className="input-addon"> <SvgIcon size={20} icon={ic_cloud_queue}/></span>
                <select onChange={this.handleChange} className="form-control" id="sel1">
                {this.props.senseBoxData.sensors.map((sensors)=>(
                                <option key={sensors._id}>{sensors.title}</option>
                            ))}
                </select>
            </div>
            <div className="input-group col-md-6">
               <span className="input-addon"> <SvgIcon size={20} icon={ic_router}/></span>
                 <input type="text" className="form-control" name="senseBoxID" onChange={this.updateInputId} value={this.state.senseBoxID} placeholder="senseBoxID"/><br></br>
            </div>
            <div className="input-group col-md-6">
               <span className="input-addon"> <SvgIcon size={20} icon={ic_date_range}/></span>
                <input className="form-control" type="date" max = {this.state.to} value={this.state.from} name="from" onChange={this.updateInputFrom} placeholder="Start"/>
                <input className="form-control" type="date" min = {this.state.from} value={this.state.to} name="to" onChange={this.updateInputTo} placeholder="To"/>
            </div>

            <div className="input-group col-md-6 ">
               <span className="input-addon"> <SvgIcon size={20} icon={ic_refresh}/></span>
               <input className="form-control" type="number" name="window" onChange={this.updateInputWindow} value={this.state.window} min="3600000" max="86400000" placeholder="window"/><br></br>
            </div>
            <div className="input-group col-md-6">
                <button className="btn btn-block" type="submit" onClick={this.fetchStats} value="Apply">Apply Filter</button>
            </div>
            </div>
                <div className="col-md-6">
                <ul className="list-group">
                    <li className="list-group-item">senseBox steht an : Gasselstiege Münster</li>
                    <li className="list-group-item">nächste gelegene DWD Station ist 20km entfernt</li>
                    <li className="list-group-item">Das Monatsmaximum von 34 wurde am 13.12.2018 erreicht</li>
                    <li className="list-group-item">Das Monatsminimum von 20 wurde am 13.12.2018 erreicht</li>
                    <li className="list-group-item">Durchschnittlich ist es 5°C wärmer geworden</li>
                    </ul>     
                    <button className="btn btn-block" value="story"> <SvgIcon size={20} icon={ic_brush}/>Open Story Editor</button>
                </div>
        <div className="row">
        <div className="col-md-6">
                    <img className="img" alt="Statistic" src={this.state.b64image}/>
                </div>
        </div>
        </div>
        </div>


        )
    }
}

export default Stats