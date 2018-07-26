import React from 'react'
import Loading from './Loading';
import SvgIcon from 'react-icons-kit';
import {ic_date_range} from 'react-icons-kit/md/ic_date_range'
import {ic_router} from 'react-icons-kit/md/ic_router'
import {ic_refresh} from 'react-icons-kit/md/ic_refresh'
import {ic_cloud_queue} from 'react-icons-kit/md/ic_cloud_queue'/* gets called from statistics with props : data */
import {ic_brush} from 'react-icons-kit/md/ic_brush'
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import { Resizable, ResizableBox } from 'react-resizable';
import domtoimage from 'dom-to-image'
import {ic_file_download} from 'react-icons-kit/md/ic_file_download'

class Stats extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading:false,
            b64image:null,
            href:'',
        }
        this.fetchStats = this.fetchStats.bind(this);

        this.downloadFile = this.downloadFile.bind(this)
    }

    componentDidMount(){
        this.props.onRef(this)
        this.fetchStats()
    }
    downloadFile(){
        var node = document.getElementById('story');
        domtoimage.toJpeg(document.getElementById('story'), { quality: 0.95 ,bgcolor:'white'})
            .then((dataUrl)=>this.setState({href:dataUrl}).then(console.log(this.state.href)))
            console.log("smi")
        }

    fetchStats(){
        this.setState({loading:true})
        var url=this.props.senseBoxID+'/'+this.props.phenomenon+'/'+this.props.lat+'/'+this.props.lon +'/'+this.props.from+'/'+this.props.to+'/'+this.props.window
        if(this.props.phenomenon==="PM10"){
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
        .then(()=>this.setState({loading:false})).then(this.downloadFile)
    }

    render(){
        if(this.state.loading){
            return(
                <Loading/>
            )
        }
        return(
        <div  className="stats playground">   
                    <a className="downloadButton" download="story" href={this.state.href}>  
                        <button className="btn btn-sm" value="story"> <SvgIcon size={20} icon={ic_file_download}/>Download</button>
            </a>        
            <div id="story" className="row playground">
                <Draggable 
                bounds=''
                grid={[25,25]}
                onStop={this.downloadFile}>
                    <div className="col-md-6 bild">
                                <img className="img" alt="Statistic" src={this.state.b64image}/>
                    </div>
                </Draggable>
                <div className="form-group col-md-6">
                    <div className="input-group col-md-12">
                        <Draggable 
                            bounds=''
                            grid={[25,25]}
                            onStop={this.downloadFile}>
                        <ul className="list-group analysis col-md-12">
                            <li className="list-group-item">senseBox steht an : Gasselstiege Münster</li>
                            <li className="list-group-item">nächste gelegene DWD Station ist 20km entfernt</li>
                            <li className="list-group-item">Das Monatsmaximum von 34 wurde am 13.12.2018 erreicht</li>
                            <li className="list-group-item">Das Monatsminimum von 20 wurde am 13.12.2018 erreicht</li>
                            <li className="list-group-item">Durchschnittlich ist es 5°C wärmer geworden</li>
                        </ul>   
                        </Draggable>
                    </div>
                </div>
            </div>{/* End second row  */}
        </div>
        )
    }
}

export default Stats