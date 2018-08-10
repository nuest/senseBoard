import React from 'react'
import Stats from './Stats'
import Loading from './Loading'
import SvgIcon from 'react-icons-kit';
import {ic_date_range} from 'react-icons-kit/md/ic_date_range'
import {ic_router} from 'react-icons-kit/md/ic_router'
import {ic_refresh} from 'react-icons-kit/md/ic_refresh'
import {ic_cloud_queue} from 'react-icons-kit/md/ic_cloud_queue'
import Modal from 'react-modal'


const customStyles = {
    content : {
        color: 'green',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class Statistics extends React.Component{

    constructor(props){
        super(props)
        if(props.perma=='false'){

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
            senseBoxID:this.props.id,
            phenomenon:null,
            from:from,
            to:to,
            window:3600000,
            windowString:'Stundenmittelwert',
            href:'',
            disabled:true,
            external:false,
            externalString:'Ohne externer Datenquelle',
            modalIsOpen:false,


        }}
        if(props.perma==='true'){
            var externalString = "Ohne externer Datenquelle"
            var windowString = 'Stundenmittelwert'
            if(props.props.params.external==='true'){
                externalString = "Mit externer Datenquelle"
            }
            if(props.props.params.window === '86400000'){
                windowString = 'Tagesmittelwert'
            }
            this.state={
                loading:true,
                title:null,
                url:null,
                senseBoxData:null,
                senseBoxID:props.props.params.id,
                phenomenon:props.props.params.phenomenon,
                from:props.props.params.from,
                to:props.props.params.to,
                window:props.props.params.window,
                windowString:windowString,
                href:'',
                disabled:true,
                external:props.props.params.external,
                externalString:externalString,
                modalIsOpen:false,

            }
        }

        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.fetchBox = this.fetchBox.bind(this)
        this.updateInputId = this.updateInputId.bind(this)
        this.updateInputPhenom = this.updateInputPhenom.bind(this)
        this.updateInputFrom = this.updateInputFrom.bind(this)
        this.updateInputTo = this.updateInputTo.bind(this)
        this.updateInputWindow = this.updateInputWindow.bind(this)
        this.updateExternal = this.updateExternal.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.changeBox = this.changeBox.bind(this)
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    fetchBox(){       
        const id = '570bad2b45fd40c8197f13a2'  
        this.setState({
            loading:true,
            modalIsOpen:false
          })

        const boxURL =`https://api.opensensemap.org/boxes/`+this.state.senseBoxID
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
            }))
            .then(()=>{
                if(this.state.phenomenon ==='Luftdruck' || this.state.phenomenon  === 'Temperatur' || this.state.phenomenon  === 'PM10'){
                    this.setState({
                        disabled:false
                    })}
            })
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
    updateExternal(e){
        const value = e.target.value
        if(value==='Mit externer Datenquelle'){
            this.setState({external:true})
        }
        if(value==='Ohne externer Datenquelle'){
            this.setState({external:false})
        }
    }
    updateInputPhenom(e){
        const value = e.target.value
        this.setState(({
            phenomenon:value,
     }))
        if(value==='Luftdruck' || value === 'Temperatur' || value === 'PM10'){
            this.setState({
                disabled:false
            })
        }
        else{
            document.getElementById("select").selectedIndex = 1
            this.setState({
                disabled:true,
                external:false
            })
        }
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
    changeBox(){
        console.log(this.state.senseBoxID)
        this.setState({senseBoxID:'5b2293071fef04001bdb5659'},()=>{this.fetchBox()})
        
    }
    handleClick(){
        this.Stats.fetchStats()
            // this.setState({
            //     clicked:true
            // })
    }// localhost:3000/Stats/570bad2b45fd40c8197f13a2/Luftdruck/2018-06-30/2018-07-30/360000/false

    componentDidUpdate(){
        if(this.state.loading=== false){
        this.Stats.setState ({
            permalink:"localhost:3000/Stats/"+this.state.senseBoxID+"/"+this.state.phenomenon+"/"+this.state.from+"/"+this.state.to+"/"+this.state.window+"/"+this.state.external
        })}
    }
    updateInputWindow(e){
        const value = e.target.value
        var window
        switch(value){
            case 'Stundenmittelwert':
                window = 3600000
                this.setState({
                    disabled:false,
                })
                break;
            case 'Tagesmittelwert':
                window= 86400000
                this.setState({
                    disabled:false,
                })
                break;
            case 'Wochenmittelwert':
                window = 604800000
                break;
            case '10-Minutenmittelwert':
                window = 600000
                this.setState({
                    disabled:true,
                    external:false
                })
                document.getElementById("select").selectedIndex = 1
                break;
            default  :
                window = 3600000
                break;
        }
        this.setState(({
            window:window,
     }))
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#4EAF47';
    }

    closeModal() {
    this.setState({modalIsOpen: false});
    this.fetchBox()
   
}

    render(){
        if(this.state.loading === true ){
            return(
                <Loading/>
            )
        }
        return(
            <div>
                             <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Modal"
                >
                                    <h2 
                        style={{color:'#4EAF47'}}
                        ref={subtitle => this.subtitle = subtitle}>
                    Gebe eine neue senseBoxID ein!
                    </h2>
                    <form>
                        <input 
                            type='text'
                            placeholder='Id'
                            value={this.state.senseBoxID}
                            onChange={this.updateInputId}
                        />
                            <button 
                                onClick={()=>this.closeModal()} 
                                className="btn header-btn"
                                type="button">
                                Go!
                            </button>
                    </form>
                </Modal>
            <div className="row input-bar">
            <div className="input-group col-md-12">
                    <span className="input-addon"> <SvgIcon size={20} icon={ic_router}/></span>
                    <input type="text" disabled="true" className="form-control" name="senseBoxID" defaultValue={this.state.senseBoxData.name} placeholder="senseBoxID"/><br></br>
                    <button onClick={this.openModal} className="btn"> Ändere senseBox </button>
                </div>
            <div className="input-group col-md-12">
                <span className="input-addon"> <SvgIcon size={20} icon={ic_cloud_queue}/></span>
                    <select  onChange={this.updateInputPhenom} className="form-control" id="sel1">
                        <option>-----Wähle ein Phänomen aus -----</option>
                    {this.state.senseBoxData.sensors.map((sensors)=>(
                                    <option key={sensors._id}>{sensors.title}</option>
                                ))}
                    </select>
            </div>
                <div className="input-group col-md-12">
                    <span className="input-addon"> <SvgIcon size={20} icon={ic_date_range}/></span>
                    <input className="form-control" type="date" max = {this.state.to} value={this.state.from} name="from" onChange={this.updateInputFrom} placeholder="Start"/>
                    <input className="form-control" type="date" min = {this.state.from} value={this.state.to} name="to" onChange={this.updateInputTo} placeholder="To"/>
                </div>

                <div className="input-group col-md-12">
                        <span className="input-addon"> <SvgIcon size={20} icon={ic_refresh}/></span>
                        <select defaultValue={this.state.windowString} onChange={this.updateInputWindow} className="form-control">
                                <option>Stundenmittelwert</option>
                                <option>Tagesmittelwert</option>
                                <option >10-Minutenmittelwert</option>
                        </select>
                </div>
                <div className="input-group col-md-12">
                        <span className="input-addon"> <SvgIcon size={20} icon={ic_router}/></span>
                        <select id="select" defaultValue={this.state.externalString} onChange={this.updateExternal} className="form-control">
                                <option disabled={this.state.disabled}>Mit externer Datenquelle</option>
                                <option>Ohne externer Datenquelle</option>
                        </select>
                </div>
                <div className="btn-group col-md-12" >
                    <button className="btn btn-block btn-sm" type="button" onClick={this.handleClick} value="Apply">Filter übernehmen</button>
                    </div>

            </div> {/* End first row  */}
            <div className="row col-md-12">
            <Stats  perma={this.props.perma} onRef={ref => (this.Stats = ref )} senseBoxID={this.state.senseBoxID} phenomenon={this.state.phenomenon} lat={this.state.senseBoxData.currentLocation.coordinates[1]} lon={this.state.senseBoxData.currentLocation.coordinates[0]} from={this.state.from} to ={this.state.to} window={this.state.window} external={this.state.external}/>
            </div>
            </div>
            )
    }
}

export default Statistics
