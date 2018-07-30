import React from 'react'
import Loading from './Loading';
import SvgIcon from 'react-icons-kit';
import Draggable from 'react-draggable'; // Both at the same time
import domtoimage from 'dom-to-image'
import {ic_file_download} from 'react-icons-kit/md/ic_file_download'
import {pencil} from 'react-icons-kit/fa/pencil'
import {image} from 'react-icons-kit/fa/image'
// {id:0,style:{color:"green",fontSize:"60pt",transform:["0px","0px"]},text:""}
class Stats extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading:false,
            b64image:null,
            href:'',
            text:[],
            clientX:1000,
            clientY:800,
            constrainsResize:[660,500],
            input:'',
            color:'black',
            fontSize:'36',
        }
        this.fetchStats = this.fetchStats.bind(this);
        this.removep = this.removep.bind(this)
        this.downloadFile = this.downloadFile.bind(this)
        this.handleResize = this.handleResize.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateSize = this.updateSize.bind(this)
        this.updateColor = this.updateColor.bind(this)
        this.addText = this.addText.bind(this)
        this.updateInput = this.updateInput.bind(this)

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
        this.downloadFile()
        const text = event.currentTarget.value
        const length = text.length
        const id = Number(event.currentTarget.id)
        var index = this.state.text.findIndex(x=> x.id === id);
        var state = this.state.text[index]
        state.text = text ;
        this.setState({
            text: [
               ...this.state.text.slice(0,index),
               Object.assign({}, this.state.text[index], state),
               ...this.state.text.slice(index+1)
            ]
          });
        if(text===''){
            this.removep(id)}
    }
    removep(id) {
        this.setState((currentState)=>{
            return {
                text:currentState.text.filter((texts)=>texts.id !== id)
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
        const des = ""
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
    updateSize(e){
        const value = e.target.value
        this.setState({
            fontSize:value+"pt"
        })
    }
    updateColor(e){
        const value = e.target.value 
        var colorToSet = ''
        switch(value){
            case 'Blau':
                colorToSet = "#0074D9"
                break;
            case 'Grün':
                colorToSet="#4EAF47"
                break;
            case 'Rot':
                colorToSet = "#FF4136"
                break;
            case 'Orange':
                colorToSet = "#FF851B"
                break;
            case 'Lila':
                colorToSet = "#B10DC9"
                break;
            case 'Schwarz':
                colorToSet = "black"
                break;
            default:
                colorToSet = "black"
        }
        this.setState({
            color:colorToSet
        })
    }

    addText(){
        const input = this.state.input
        const color = this.state.color
        const fontSize = this.state.fontSize
        const id = this.state.text.length
        this.setState((currentState)=>{
            return{
                text : currentState.text.concat({id:id,style:{color:color,fontSize:fontSize,transform:["700px","-400px"]},text:input})
            }
        })
        this.downloadFile()
    }
    updateInput(e){
        const value = e.target.value
        this.setState({
            input:value
        })
    }


    render(){
        if(this.state.loading){
            return(
                <Loading/>
            )
        }

        return(
        <div id = "draw"className="stats row playground col-md-12">   
            <div id="story" className="re col-md-8">     
            <Draggable 
                bounds='parent'
                grid={[25,25]}
                onStop={this.downloadFile}>
                                <img id="bild" className="img" alt="Statistic" src={this.state.b64image}/>
            </Draggable>
                    {this.state.text.map((text)=>(
                        <Draggable key = {text.id}
                        defaultPosition={{x:0,y:0}}
                        bounds='#draw'
                        grid={[25,25]}
                        onStop={this.downloadFile}>
                        <div className="textareadiv">
                        <textarea spellCheck="false" 
                        onChange = {this.handleChange} cols={text.text.length} rows="1" defaultValue={text.text} id={text.id} className="story_content" style={{color:text.style.color,fontSize:text.style.fontSize}}/>
                        </div>
                        </Draggable>
                        ))}
            </div>
            <div className="col-md-4">
            <div className="panel h-25">
               <span className="panelheading">     Textelement hinzufügen</span>
               <hr></hr>
                <div className="panel-body">
                    <input placeholder="Text..." className="" style={{width:'100%'}} onChange={this.updateInput}/><br></br>
                    Textfarbe: <select onChange={this.updateColor}>
                        <option>Schwarz</option>
                        <option>Blau</option>
                        <option>Rot</option>
                        <option>Grün</option>
                        <option>Orange</option>
                        <option>Lila</option>
                    </select><br></br>
                    Schriftgröße: <select defaultValue="36" onChange={this.updateSize}>
                        <option>6</option>
                        <option>12</option>
                        <option>18</option>
                        <option>24</option>
                        <option >30</option>
                        <option>36</option>
                        <option>42</option>
                        <option>48</option>
                        <option>54</option>
                        <option>60</option>
                    </select><br></br>
                </div>
                <button className="btn image" onClick={this.addText} > <SvgIcon size={20} icon={pencil}/>Hinzufügen</button>
                </div>
            <div className="panel h-25">
               <span className="panelheading">    Weitere Statistik hinzufügen</span>
               <hr></hr>
                <div className="panel-body">
                    Phenomen: <select onChange={this.updateColor}>
                        <option>Temperatur</option>
                        <option>rel. Luftfeuchte</option>
                        <option>PM10</option>
                        <option>PM25</option>
                        <option>Luftdruck</option>
                    </select><br></br>
                </div>
                <button className="btn image disabled" onClick={this.addText} > <SvgIcon size={20} icon={image}/>Hinzufügen</button>
                </div>
                <a className="downloadButton col-md-12" download="story" href={this.state.href}>  
                        <button className="btn btn-block btn-sm" value="story"> <SvgIcon size={20} icon={ic_file_download}/>Download</button>
            </a>  
        </div>
        </div>
        )
    }
}

export default Stats


