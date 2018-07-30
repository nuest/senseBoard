import React from 'react'
import Loading from './Loading';
import SvgIcon from 'react-icons-kit';
import Draggable from 'react-draggable'; // Both at the same time
import {ResizableBox} from 'react-resizable';
import domtoimage from 'dom-to-image'
import {ic_file_download} from 'react-icons-kit/md/ic_file_download'

class Stats extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading:false,
            b64image:null,
            href:'',
            text:[{id:0,style:{color:"green",fontSize:"60pt"},text:"delehan"}],
            clientX:1000,
            clientY:800,
            constrainsResize:[660,500]
        }
        this.fetchStats = this.fetchStats.bind(this);
        this.removep = this.removep.bind(this)
        this.downloadFile = this.downloadFile.bind(this)
        this.handleResize = this.handleResize.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidUpdate(){

    }
    componentDidMount(){
        this.props.onRef(this)
        this.fetchStats()
    }
    downloadFile(){
        var story = document.getElementById('story')

        //width:this.state.clientX,height:this.state.clientY}
        domtoimage.toJpeg(story, { quality: 0.95,width:1800,height:story.clientHeight})
            .then((dataUrl)=>this.setState({href:dataUrl}))
        }
    handleChange(event){
        console.log("handle")
        this.downloadFile()
        const text = event.currentTarget.value
        if(text===''){
            this.removep(event.currentTarget.id)}
    }
    removep(id) {
        this.setState((currentState)=>{
            return {
                text:currentState.text.filter((texts)=>texts.id !== Number(id))
            }
        })
        this.downloadFile()
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
            this.setState({
                b64image:"data:image/jpeg;base64," + json[0].substring(2,json[0].length-1),
                // text:[json[1],json[2]]
            })
        })
        .then(()=>this.setState({loading:false})).then(this.downloadFile)
    }
    handleResize(e){
        this.setState({
            clientX:e.explicitOriginalTarget.offsetParent.clientWidth,
            clientY:e.explicitOriginalTarget.offsetParent.clientHeight
        })
        this.downloadFile()
    }
    render(){
        if(this.state.loading){
            return(
                <Loading/>
            )
        }
        return(
        <div className="stats playground">   
            <a className="downloadButton" download="story" href={this.state.href}>  
                        <button className="btn btn-sm" value="story"> <SvgIcon size={20} icon={ic_file_download}/>Download</button>
            </a>  
            <div id="story" className="re col-md-8">     
            <Draggable 
                bounds='parent'
                grid={[25,25]}
                onStop={this.downloadFile}>
                                <img id="bild" className="img" alt="Statistic" src={this.state.b64image}/>
            </Draggable>
                    {this.state.text.map((text)=>(
                        <Draggable key = {text.id}
                        grid={[25,25]}
                        onStop={this.downloadFile}>
                            <textarea spellCheck="false" onChange = {this.handleChange} rows="1" defaultValue={text.text} id={text.id} className="story_content" style={{color:text.style.color,fontSize:text.style.fontSize}}/>
                        </Draggable>
                        ))}
            </div>
        </div>
        )
    }
}

export default Stats
