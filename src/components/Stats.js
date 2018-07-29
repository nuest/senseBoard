import React from 'react'
import Loading from './Loading';
import SvgIcon from 'react-icons-kit';
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
            text:['des','smi','delen']
        }
        this.fetchStats = this.fetchStats.bind(this);
        this.removep = this.removep.bind(this)
        this.downloadFile = this.downloadFile.bind(this)
    }
    componentDidUpdate(){
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
    removep(event) {
        const text = event.currentTarget.textContent
        console.log(text)
        this.setState((currentState)=>{
            return {
                text:currentState.text.filter((texts)=>texts !== text)
            }
        })
    }

    fetchStats(){
        this.setState({loading:true})
        var url=this.props.senseBoxID+'/'+this.props.phenomenon+'/'+this.props.lat+'/'+this.props.lon +'/'+this.props.from+'/'+this.props.to+'/'+this.props.window+'/'+this.props.external
        if(this.props.phenomenon==="PM10"){
            url='python/pm10/'+url
        }
        else{url = 'python/'+url} 
        console.log(url)
        fetch(url)
        .then((response)=>response.json())
        .then((json)=>{
            console.log(json)
            this.setState({
                b64image:"data:image/jpeg;base64," + json[0].substring(2,json[0].length-1),
                text:[json[1],json[2],json[3]]
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

                    <div className="">
                        <div className="">
                        {this.state.text.map((text,index)=>(
                        <Draggable 
                        bounds=''
                        grid={[25,25]}
                        onStop={this.downloadFile}>
                            <p onClick={this.removep} key={index}>{text}</p>
                        </Draggable>
                        ))}
                    </div>
                </div>
            </div>{/* End second row  */}
        </div>
        )
    }
}

export default Stats


//
// <div className="form-group col-md-6">
//     <div className="input-group col-md-12">
//         <Draggable 
//             bounds=''
//             grid={[25,25]}
//             onStop={this.downloadFile}>
//         <ul className="list-group analysis col-md-12">
//             <li className="list-group-item">senseBox steht an : Gasselstiege Münster</li>
//             <li className="list-group-item">nächste gelegene DWD Station ist 20km entfernt</li>
//             <li className="list-group-item">Das Monatsmaximum von 34 wurde am 13.12.2018 erreicht</li>
//             <li className="list-group-item">Das Monatsminimum von 20 wurde am 13.12.2018 erreicht</li>
//             <li className="list-group-item">Durchschnittlich ist es 5°C wärmer geworden</li>
//         </ul>   
//         </Draggable>