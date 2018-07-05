import React from 'react'
import {Link,Route,BrowserRouter} from 'react-router-dom'
import Statistics from './Statistics'
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';
import CurrentMeasurements from './CurrentMeasurements';

class Menu extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            dropdownOpen:false,
            sensors:props.sensors,
            selectedSensorTitle:props.sensors[0].title,
            selectedSensorID:props.senseBoxID,
            activeTab: '1',
        }
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    componentDidUpdate(){

    }
    onChange(i, value, tab, ev) {
        console.log(arguments[1]);
        this.setState({
            selectedSensorTitle:arguments[1],
             })
      }

    
    
      onActive() {
        console.log(arguments);

      }

    

    render(){
        return (
            <BrowserRouter>
                <div>
                <Tabs justified onChange={this.onChange} defaultSelectedIndex={false}>
                        <Tab key = {CurrentMeasurements} value={CurrentMeasurements} label={<Link className='tablinks' to='/data/'> Current Measurements </Link>}/>
                        {this.state.sensors.map((sensors)=>(
                            <Tab key ={sensors._id} value={sensors.title} label={<Link className='tablinks' to={`/data/${sensors.title}`}>{sensors.title}</Link>} onActive={this.onActive}/> 
                        ))}
                </Tabs>
                <Route path = {`/data/${this.state.selectedSensorTitle}`} 
                                            component ={()=>(<Statistics 
                                                                senseBoxID = {this.state.selectedSensorID} 
                                                                phenomenon = {this.state.selectedSensorTitle}/>
                                            )}/>
                <Route exact path = {'/data'} component = {()=>(<CurrentMeasurements sensors={this.state.sensors}/>)}/>
                </div>
            </BrowserRouter>
  );

             
   }

}
export default Menu
