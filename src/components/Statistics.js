import React from 'react'
import Stats from './Stats'
import Loading from './Loading'
import SvgIcon from 'react-icons-kit';
import {ic_date_range} from 'react-icons-kit/md/ic_date_range'
import {ic_router} from 'react-icons-kit/md/ic_router'
import {ic_refresh} from 'react-icons-kit/md/ic_refresh'
import {ic_cloud_queue} from 'react-icons-kit/md/ic_cloud_queue'/* gets called from statistics with props : data */
import {ic_brush} from 'react-icons-kit/md/ic_brush'
import domtoimage from 'dom-to-image'

class Statistics extends React.Component{

    constructor(props){
        super(props)
        var to = new Date()
        to = to.toISOString().substring(0,10)
        var from = new Date()
        from.setMonth(from.getMonth()-1)
        from = from.toISOString().substring(0,10)

        this.state={
            loading:true,
            title:null,
            url:null,
            senseBoxData:null,
            senseBoxID:null,
            phenomenon:null,
            from:from,
            to:to,
            window:3600000,
        }

        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.fetchBox = this.fetchBox.bind(this)
        this.updateInputId = this.updateInputId.bind(this)
        this.updateInputPhenom = this.updateInputPhenom.bind(this)
        this.updateInputFrom = this.updateInputFrom.bind(this)
        this.updateInputTo = this.updateInputTo.bind(this)
        this.updateInputWindow = this.updateInputWindow.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }//End constructor

    handleChangeStart(date) {
        this.setState({
          startDate: date
        });
      }
    handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
    }

    downloadFile(){
        var node = document.getElementById('story');
        domtoimage.toJpeg(document.getElementById('story'), { quality: 0.95 ,bgcolor:'white'})
            .then((dataUrl)=>this.setState({href:dataUrl}).then(console.log(this.state.href)))
            console.log("smi")
        }

    fetchBox(){       
        const id = '570bad2b45fd40c8197f13a2'  
        this.setState({
            loading:true,
            modalIsOpen:false
          })

        const boxURL =`https://api.opensensemap.org/boxes/`+id //'+this.props.id'
        fetch(boxURL)
        .catch((error) => {
            this.setState({
                succesful:false,
            })
          console.warn(error)
          return null
        })
        .then((response) => response.json())
        .then((json)=>this.setState({
            senseBoxData:json,
            loading:false,
            senseBoxID:json._id,
            phenomenon:json.sensors[0].title
            }))
       // .then(this.reverseGeocoding)
    }//End fetchbox()

    // reverseGeocoding(){
    //     const lon = this.state.metadata.currentLocation.coordinates[0]
    //     const lat = this.state.metadata.currentLocation.coordinates[1]
    //     const URL = 'https://nominatim.openstreetmap.org/reverse?format=json&lat='+lat+'&lon='+lon+'&zoom=18&addressdetails=1'
    //     fetch(URL)
    //     .catch((error)=>{
    //         console.warn(error);
    //         return null
    //     })
    //     .then((response)=>response.json())
    //     .then((json)=>this.setState({
    //         geocodingResult:json,
    //     }))
    //     }// End reverseGeocoding

    componentDidMount(){
        this.fetchBox()
        
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
    handleClick(){
        this.Stats.fetchStats()
            // this.setState({
            //     clicked:true
            // })
    }
    updateInputWindow(e){
        const value = e.target.value
        var window
        switch(value){
            case 'Stundenmittelwert':
                window = 3600000
                break;
            case 'Tagesmittelwert':
                window= 86400000
                break;
            case 'Wochenmittelwert':
                window = 604800000
                break;
            default  :
                window = 3600000
                break;
        }
        console.log(window)
        this.setState(({
            window:window,
     }))
    }
    render(){
        if(this.state.loading === true ){
            return(
                <Loading/>
            )
        }
        return(
            <div>
            <div className="row input-bar">
            <div className="input-group col-md-12">
                <span className="input-addon"> <SvgIcon size={20} icon={ic_cloud_queue}/></span>
                    <select onChange={this.updateInputPhenom} className="form-control" id="sel1">
                    {this.state.senseBoxData.sensors.map((sensors)=>(
                                    <option key={sensors._id}>{sensors.title}</option>
                                ))}
                    </select>
            </div>
                <div className="input-group col-md-12">
                    <span className="input-addon"> <SvgIcon size={20} icon={ic_router}/></span>
                    <input type="text" className="form-control" name="senseBoxID" onChange={this.updateInputId} value={this.state.senseBoxID} placeholder="senseBoxID"/><br></br>
                </div>
                <div className="input-group col-md-12">
                    <span className="input-addon"> <SvgIcon size={20} icon={ic_date_range}/></span>
                    <input className="form-control" type="date" max = {this.state.to} value={this.state.from} name="from" onChange={this.updateInputFrom} placeholder="Start"/>
                    <input className="form-control" type="date" min = {this.state.from} value={this.state.to} name="to" onChange={this.updateInputTo} placeholder="To"/>
                </div>

                <div className="input-group col-md-12">
                        <span className="input-addon"> <SvgIcon size={20} icon={ic_refresh}/></span>
                        <select onChange={this.updateInputWindow} className="form-control">
                                <option>Stundenmittelwert</option>
                                <option>Tagesmittelwert</option>
                                <option>Wochenmittelwert</option>
                        </select>


                </div>
                <div className="btn-group col-md-12" >
                    <button className="button btn btn-sm" type="button" onClick={this.handleClick} value="Apply">Apply Filter</button>
                    <a className="button" download="story" href={this.state.href}>  
                                <button style={{width:'100%'}}className="btn btn-sm" value="story"> <SvgIcon size={20} icon={ic_brush}/>Download my Story</button>
                    </a>
                    </div>
            </div> {/* End first row  */}
            <Stats onRef={ref => (this.Stats = ref )} senseBoxID={this.state.senseBoxID} phenomenon={this.state.phenomenon} lat={this.state.senseBoxData.currentLocation.coordinates[1]} lon={this.state.senseBoxData.currentLocation.coordinates[0]} from={this.state.from} to ={this.state.to} window={this.state.window}/>
            </div>
            )
    }
}

export default Statistics
