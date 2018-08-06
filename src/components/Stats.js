import React from 'react'
import Loading from './Loading';
import SvgIcon from 'react-icons-kit';
import Draggable from 'react-draggable'; // Both at the same time
import domtoimage from 'dom-to-image'
import {ic_file_download} from 'react-icons-kit/md/ic_file_download'
import {pencil} from 'react-icons-kit/fa/pencil'
import {image} from 'react-icons-kit/fa/image'
import Error from './Error';
import {Rnd} from 'react-rnd' 
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
            fontSize:'42',
            permalink:"",
            error:false,
            errorInfo:"",
            suggestions:[]

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
        this.changeSuggestion = this.changeSuggestion.bind(this)
    }
    componentDidUpdate(){

    }
    componentDidMount(){
        this.props.onRef(this)
        if(this.props.perma=="true")
            this.fetchStats()
    }
    downloadFile(){
        var story = document.getElementById('story')
        //width:this.state.clientX,height:this.state.clientY}width:1800,height:story.clientHeight  { quality: 0.95,}
        domtoimage.toJpeg(story,{ quality: 0.95,width:1255,height:story.clientHeight,bgcolor:"#f3f3f3",style:{border:"0px"}})
            .then((dataUrl)=>this.setState({href:dataUrl}))
        }
    handleChange(event){
        // this.downloadFile()
        // const text = event.currentTarget.value
        // const length = text.length
        // const id = Number(event.currentTarget.id)
        // var index = this.state.text.findIndex(x=> x.id === id);
        // var state = this.state.text[index]
        // state.text = text ;
        // this.setState({
        //     text: [
        //        ...this.state.text.slice(0,index),
        //        Object.assign({}, this.state.text[index], state),
        //        ...this.state.text.slice(index+1)
        //     ]
        //   });
        // if(text===''){
        //     this.removep(id)}
    }
    removep(e) {
        const id= Number(e.currentTarget.id)
        this.setState((currentState)=>{
            return {
                text:currentState.text.filter((texts)=>texts.id !== id)
            }
        })
        this.downloadFile()
    }

    fetchStats(){
        this.setState({loading:true,error:false})
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
            if(json[0].substring(0,5)=="Error"){
                this.setState({
                    error:true,
                    errorInfo:json[0]
                })
                return
            }
            var suggestion = json[1]
            suggestion = suggestion.replace("[","")
            suggestion = suggestion.replace("]","")
            suggestion = suggestion.replace(/'/g,"")
            suggestion = suggestion.split(",")
            this.setState({
                b64image:"data:image/jpeg;base64," + json[0].substring(2,json[0].length-1),
                suggestions:suggestion
            })

            }
    )
        .then(()=>this.setState({loading:false})).then(this.downloadFile).then(console.log(this.state.suggestions))
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
        var fontSize = 0 
        switch(value){
            case 'Überschrift':
                fontSize = 60
                break;
            case 'Begleittext':
                fontSize = 42
                break;
            case 'Untertitel':
                 fontSize = 36
                 break;
            default:
                fontSize = 42
        }
        this.setState({
            fontSize:fontSize+"pt"
        })
    }//python/570bad2b45fd40c8197f13a2/Luftdruck/51.974581/7.607807/2018-06-30/2018-07-30/360000/false
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
    changeSuggestion(e){
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
        if(this.state.error){
            return(
                <Error errorInfo={this.state.errorInfo}/>
            )
        }
        return(
        <div id = "draw"className="stats row playground col-md-12">   
            <div id="story" className="re col-md-8">     
            {/* <Draggable 
                bounds='parent'
                grid={[25,25]}
                onStop={this.downloadFile}>
                                <img id="bild" className="img" alt="Bitte gebe deine Parameter oben ein und drücke auf 'Filter übernehmen'!" src={this.state.b64image}/>
            </Draggable> */}
                <Rnd
                bounds='parent'
                grid={[25,25]}
                onResizeStop={this.downloadFile}
                onDragStop={this.downloadFile}>
                <img id="bild" className="img" alt="Bitte gebe deine Parameter oben ein und drücke auf 'Filter übernehmen'!" src={this.state.b64image}/>
                </Rnd>
                    {this.state.text.map((text)=>(
                        <Draggable key = {text.id}
                        defaultPosition={{x:0,y:0}}
                        bounds='#story'
                        grid={[10,10]}
                        onStop={this.downloadFile}>
                        <div id={text.id} className="textareadiv story_content" onDoubleClick={this.removep} style={{color:text.style.color,fontSize:text.style.fontSize}}>{text.text}</div>
                        </Draggable>
                        ))}
            </div>
            <div className="col-md-4">
            <div className="panel h-50">
               <span className="panelheading">     Textelement hinzufügen</span>
               <hr></hr>
                <div className="panel-body">
                    <input placeholder="Text..." className="" value={this.state.input} style={{width:'100%'}} onChange={this.updateInput}/><br></br>
                    Textfarbe: <select onChange={this.updateColor}>
                        <option>Schwarz</option>
                        <option>Blau</option>
                        <option>Rot</option>
                        <option>Grün</option>
                        <option>Orange</option>
                        <option>Lila</option>
                    </select><br></br>
                    Schriftgröße: <select defaultValue="Begleittext" onChange={this.updateSize}>
                        <option>Überschrift</option>
                        <option>Begleittext</option>
                        <option>Untertitel</option>
                    </select><br></br>
                    Vorschläge: <select defaultValue="Vorschläge für Texte" onChange={this.changeSuggestion}>
                    <option>Vorschläge für Texte</option>
                    {this.state.suggestions.map((suggestion,index)=>(
                                    <option key={index}>{suggestion}</option>
                                ))}
                    </select>
                </div>
                <button className="btn image" onClick={this.addText} > <SvgIcon size={20} icon={pencil}/>Hinzufügen</button>
                </div>
            {/* <div className="panel h-25">
               <span className="panelheading">    Weitere Statistik hinzufügen</span>
               <hr></hr>
                <div className="panel-body">
                    Phänomen: <select onChange={this.updateColor}>
                        <option>Temperatur</option>
                        <option>rel. Luftfeuchte</option>
                        <option>PM10</option>
                        <option>PM25</option>
                        <option>Luftdruck</option>
                    </select><br></br>
                    Mit DWD Daten :<input type="checkbox"/><br></br>
                    Mit senseBox Daten : <input type="checkbox"/>
                </div>
                <button className="btn image disabled" onClick={this.addText} > <SvgIcon size={20} icon={image}/>Hinzufügen</button>
                </div> */}
                <a className="downloadButton col-md-12" download="story" href={this.state.href}>  
                        <button className="btn btn-block btn-sm" value="story"> <SvgIcon size={20} icon={ic_file_download}/>Download</button>
            </a>  
            <textarea className="perma col-md-12" spellCheck="false" rows="1" cols="4" defaultValue={this.state.permalink}/>

        </div>
        </div>
        )
    }
}

export default Stats


