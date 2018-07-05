import React from 'react'
import Loading from './Loading'
import Maxmium from '../functions/getMax'
import Minimum from '../functions/getMin'
import Average from '../functions/getAverage'
import Shift from '../functions/getShift'
import { LineChart, Line,CartesianGrid,XAxis,YAxis,Tooltip,Legend } from 'recharts';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Statistics extends React.Component{

    constructor(props){
        super(props)
        this.state={
            url:'',
            statistic_array:[],
            statistic_array_compare:[],
            data:[],
            label:'',
            label_compare:'',
            data_compare:[],
            finished:false,
            senseBoxID:props.senseBoxID,
            phenomenon:props.phenomenon,
            month:["January","February","March","April","May","June","July","August","September","October","November","December"],
            startDate:moment().subtract(1,'months'),
            endDate:moment(),
            startDate_compare:moment().subtract(1,'months'),
            endDate_compare:moment().subtract(2,'months')
        }
        this.getStatistics = this.getStatistics.bind(this)
        this.getAllStats = this.getAllStats.bind(this);
        this.getCompareStatistics = this.getCompareStatistics.bind(this);

        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);

    }//End constructor

    handleChangeStart(date) {
        this.setState({
          startDate: date
        });
      }
      handleChangeEnd(date) {
          console.log(date)
        this.setState({
          endDate: date
        });
      }

        getStatistics(from,to){

                    const month1 = this.state.month[from._d.getMonth()]
                    const month2 = this.state.month[to._d.getMonth()]
                    
                    const url ='https://api.opensensemap.org/statistics/descriptive?senseboxid='
                                +this.state.senseBoxID+'&phenomenon='
                                +this.state.phenomenon+
                                '&from-date='+from._d.toISOString()+'&to-date='+to._d.toISOString()+
                                '&operation=arithmeticMean&window=86400000&format=json'


                    this.setState({
                        data:[],
                        statistic_array:[]
                    })
                    fetch(url)
                    .then((response)=>response.json())
                    .then((json)=>
                    {
                        Object.keys(json[0]).forEach(key =>{
                        if(key!=="sensorId"){
                            this.setState((currentState)=>{
                                return {
                                    data:currentState.data.concat([{
                                        Time:key.substring(5,10),Value:Math.floor([json[0][key]]*100)/100
                                    }]),
                                    statistic_array:currentState.statistic_array.concat(Math.floor([json[0][key]]*100)/100),
                                }
                            })

                        }})
                    }
                )                
                .then(()=>{
                    this.setState({
                        label:'From '+ month1 + ' to ' + month2,
                    })
                })
                } //End get Statistics

        getCompareStatistics(from,to){
            

            const month1 = this.state.month[from._d.getMonth()]
            const month2 = this.state.month[to._d.getMonth()]

            const url ='https://api.opensensemap.org/statistics/descriptive?senseboxid='
                +this.state.senseBoxID+'&phenomenon='
                +this.state.phenomenon+
                '&from-date='+from._d.toISOString()+'&to-date='+to._d.toISOString()+'&operation=arithmeticMean&window=86400000&format=json'
            
            this.setState({
                data_compare:[],
                statistic_array_compare:[]
            })  
            console.log(url);
                fetch(url)
                .then((response)=>response.json())
                .then((json)=>
                {
                    Object.keys(json[0]).forEach(key =>{
                    if(key!=="sensorId"){
                        this.setState((currentState)=>{
                            return {
                                data_compare:currentState.data_compare.concat([{
                                    Time:key.substring(5,10),Value:Math.floor([json[0][key]]*100)/100
                                }]),
                                statistic_array_compare:currentState.statistic_array_compare.concat(Math.floor([json[0][key]]*100)/100),
                                
                            }
                        })

                    }})
                })
                .then(()=>{
                    this.setState({
                        label_compare:'From '+ month1 + ' to ' + month2,
                    })
                })
        }
        

        
        componentDidMount(){
            this.getAllStats();
        }
        getAllStats(){

            this.getStatistics(this.state.startDate,this.state.endDate);
            const diff = this.state.endDate._d.getMonth() - this.state.startDate._d.getMonth();
            this.getCompareStatistics(this.state.startDate.subtract(diff,'months'),this.state.endDate.subtract(diff,'months'));
            this.setState((currentState)=>{
                startDate:currentState.startDate.add(diff,'months');
                endDate:currentState.endDate.add(diff,'months')
            })

        }
        render(){
            if(this.state.data.length>1 && this.state.data_compare.length>1){
                
                return(
                    <div>
                    <p>These are the <b>mean</b> of your measurements for your sensor from the last months :</p>
                    From:<DatePicker
                        selected={this.state.startDate}
                        selectsStart
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeStart}
                        popperPlacement="bottom-end"
                        className="cal"
                        dateFormat="LLL"
                    /> 

                    To:<DatePicker
                        selected={this.state.endDate}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeEnd}
                        popperPlacement="bottom-end"
                        className="cal"
                        dateFormat="LLL"

                    />
                    <button className="cal" onClick={this.getAllStats} >Apply filter</button>

                    <div className="row">
                         {/* <LineChart className="des" data={data} options={options} width="1000" height="350"/> */}
                         <LineChart width={1000} height={400} data={this.state.data}  margin={{ top: 5, right: 20, bottom: 5, left: 40 }} syncId="newID" >
                                <Line name={this.state.label} type="linear" dataKey="Value" stroke="#4EAF47" />
                                <CartesianGrid stroke="#ccc"/>
                                <XAxis dataKey="Time"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend verticalAlign="top" height={36}/>
                        </LineChart>
                        <br></br>
                        <ul className="results">
                                <Maxmium data={this.state.statistic_array}/>
                                <Minimum data={this.state.statistic_array}/>
                                <Average data = {this.state.statistic_array}/>
                                <Shift data = {this.state.statistic_array}
                                        data_compare={this.state.statistic_array_compare}/>
                        </ul>
                        <br></br>
                        <LineChart width={1000} height={400} data={this.state.data_compare}  margin={{ top: 5, right: 20, bottom: 5, left: 40 }} syncId="newID" >
                                <Line name={this.state.label_compare} type="linear" dataKey="Value" stroke="#4EAF47" />
                                <CartesianGrid stroke="#ccc"/>
                                <XAxis dataKey="Time"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend verticalAlign="top" height={36}/>

                        </LineChart>
                        <ul className="results"> 
                            <Maxmium data={this.state.statistic_array_compare}/>
                            <Minimum data={this.state.statistic_array_compare}/>
                            <Average data = {this.state.statistic_array_compare}/>

                        </ul>
                    </div>
                    </div>
                )
            }
            return(
                <Loading/>
            )
    }
}
export default Statistics
