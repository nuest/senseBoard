import React from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Stats from './Stats'
import Analysis from './Analysis'
import Loading from './Loading'
import Carousel from 'nuka-carousel'
/* Gets called from Menu with props :senseBoxID sensorID + phenomenon und senseBoxLocation*/
class Statistics extends React.Component{

    constructor(props){
        super(props)
        this.state={
            dwd_stations:[],
            data:[]
        }
        this.getStatistics = this.getStatistics.bind(this)
        this.getDWD = this.getDWD.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.getStations = this.getStations.bind(this);
        this.getNearest = this.getNearest.bind(this);
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

        /* Function that calls API and gets all the DWD stations with their 
      coordinates and names
      needs states : dwd_stations
      */
     getStations(){
        fetch('/stations')
        .then(res =>res.text())
        .then(text=>JSON.parse(text))
        .then(json => {
                    const ids = JSON.parse(json[0].replace(/'/g, '"'));
                    const lats = JSON.parse(json[1].replace(/'/g, '"'));
                    const lons = JSON.parse(json[2].replace(/'/g, '"'));
                    var dwd_stations = []
                    for(var i =0 ;i<ids.length;i++){
                        dwd_stations.push({id:ids[i],location:{lat:lats[i],lon:lons[i]}})
                    }
                    this.setState({dwd_stations:dwd_stations})
        })
        .then(()=>{this.getDWD()})

        }
    /* helper function to determine the distance between
    two coordinates 
    source : https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
    */
     distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
        var earthRadiusKm = 6371;
      
        var dLat = (lat2-lat1)* Math.PI / 180;
        var dLon = (lon2-lon1)* Math.PI / 180;
      
        lat1 = lat1*Math.PI / 180;
        lat2 = lat2*Math.PI / 180;
      
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return earthRadiusKm * c;
      }
    /* Takes location of sensebox and determines the nearest weather station of the dwd 
        needs getStations() to be executed first*/
    getNearest(lat,lon){
        console.log(lat)
        console.log(this.state.dwd_stations)
          var nearestid;
          var mindistance=5000000000;
          Object.keys(this.state.dwd_stations).forEach(key=>{
              const distance = this.distanceInKmBetweenEarthCoordinates(lat,lon,this.state.dwd_stations[key].location.lat,this.state.dwd_stations[key].location.lon);
              if(mindistance>distance){
                nearestid =this.state.dwd_stations[key].id;
                }
              mindistance=Math.min(distance,mindistance)
              })
          /*While loop to get the id in the right format 
            e.g. '44' -> '00044'
          */
          while(nearestid.length!==5){
            nearestid='0'+nearestid
          }
          return nearestid;
        }
    /* Funcion that gets the data from a dwd station
    runs getStation() */
    getDWD(){        const url = '/python/'+ this.getNearest(this.props.senseBoxLocation[1],this.props.senseBoxLocation[0]);
        fetch(url)
        .then(res => res.text())
        .then(json => (JSON.parse(json)))
        .then(json =>{
                      const dates = JSON.parse(json[0].replace(/'/g, '"'))
                      const values = JSON.parse(json[1].replace(/'/g, '"'))
                      var data_dwd = []
                      for(var i =0 ;i<dates.length;i++){
                          data_dwd.push({date:dates[i],value:values[i]})
                      }
                      this.setState({data_dwd})
                    })
      }

    getStatistics(){
                const url ='https://api.opensensemap.org/statistics/descriptive?senseboxid='
                            +this.props.senseBoxID+'&phenomenon='
                            +this.props.phenomenon+
                            '&from-date=2018-06-16T12:25:22.929Z&to-date=2018-07-16T12:25:22.929Z&operation=arithmeticMean&window=86400000&format=json'
                            fetch(url)
                .then((response)=>response.json())
                .then((json)=>
                {   var data=[]
                    Object.keys(json[0]).forEach(key =>{
                    if(key!=="sensorId"){
                        for(var i =0 ;i<json.length;i++){
                            data.push({date:key.substring(5,10),value:Math.floor([json[0][key]]*100)/100})
                        }
                    }})
                    this.setState({data})
                }
            )                
            } //End get Statistics

    componentWillMount(){
        this.getStations()
    }
    componentDidMount(){
        this.getStatistics()

    }
    componentDidUpdate(){
        console.log(this.state)
    }
    render(){
        if(typeof this.state.data[0] === 'undefined'){
            return(
                <Loading/>
            )
        }
        return(
            <div className="container">
                <p>These are the <b>mean</b> of your measurements for your sensor from the last months :</p>
                <div className="row">
                <Carousel className="carousel">
                    <Stats data={this.state.data}/>
                    <Stats data={this.state.data} />
                    <Stats data={this.state.data_dwd}/>
                </Carousel>
                    <Analysis data={this.state.data}/>
                </div> 
            </div>
            )
    }
}

export default Statistics
