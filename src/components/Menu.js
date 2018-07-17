import React from 'react'
import {Link,Route,BrowserRouter} from 'react-router-dom'
import Statistics from './Statistics'
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';
import CurrentMeasurements from './CurrentMeasurements';
import Loading from './Loading'


/* Gets called from component fetchBox with props : geocoding result und senseBox*/
class Menu extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            dropdownOpen:false,
            activeTab: '1',
            selectedSensorID:'',
            selectedSensorTitle:''
        }
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }
      componentWillMount(){
    }
      componentWillReceiveProps(){
          this.setState({
              selectedSensorTitle:this.props.senseBox.sensors[0].title
          })
      }
        componentDidUpdate(){
    }
    onChange(i, value, tab, ev) {
        this.setState({
            selectedSensorTitle:arguments[1],
             })
      }
    onActive() {}
    
    render(){
        if(typeof this.props.senseBox._id === 'undefined'){
            return(
                <Loading/>
            )
        }
        return (
            <BrowserRouter>
                <div>
                    <Tabs justified onChange={this.onChange} defaultSelectedIndex={false}>
                            <Tab key = {CurrentMeasurements} value={CurrentMeasurements} label={<Link className='tablinks' to='/data/'> Current Measurements </Link>}/>
                            {this.props.senseBox.sensors.map((sensors)=>(
                                <Tab key ={sensors._id} value={sensors.title} label={<Link className='tablinks' to={`/data/${sensors.title}`}>{sensors.title}</Link>} onActive={this.onActive}/> 
                            ))}
                    </Tabs>
                    <Route path = {`/data/${this.state.selectedSensorTitle}`} 
                            component ={()=>(<Statistics senseBoxID = {this.props.senseBox._id} phenomenon = {this.state.selectedSensorTitle} senseBoxLocation={this.props.senseBox.currentLocation.coordinates}/>
                    )}/>
                    <Route exact path = {'/Overview'} component = {()=>(<CurrentMeasurements sensors={this.props.senseBox.sensors}/>)}/>
                </div>
            </BrowserRouter>
        )}

             
   }


export default Menu
