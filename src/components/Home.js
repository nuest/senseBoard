import React from 'react'
import { min } from '../../../../../../.cache/typescript/2.9/node_modules/moment';


  /* 
    Beide JSON Einträge müssen richtig geparst werden. Zusätzlich muss in Python noch 
    die Datei erheblich verkleinert werden(letzte 60 Messwerte oder sowas wäre denkbar)
    + Weiter anschauen das Dokument möglichst gut fürs FrontEnd zuzuschneien.(done)
    + Parameterübergabe hinkriegen (halfway done,erstmalige ausführung des skripts beim start vom server
                                      verhindern)
    + Parameterbestimmung => ID mit geograph gleichsetzen und vergleichen welche ID am nähsten ist (done)
    + Einpflegung der DWD Daten in einen Plot der gleichzusetzen mit denen von der senseBox ist 
    + Weiter nach Statistik Tool umschauen 
    + Recherche weiterer Daten(=>LANUV?)
    + Ordnerstruktur für py skripts überlegen(insb. wo werden die .zips gespeichert?)
  */

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dates:[],
            values:[],
            ids:[],
            lats:[],
            lons:[],
            names:[],
            result:[],
        };
        this.getStations = this.getStations.bind(this)
        this.distanceInKmBetweenEarthCoordinates = this.distanceInKmBetweenEarthCoordinates.bind(this)
        this.getDWD = this.getDWD.bind(this)
    }
    componentDidMount() {
      this.getStations()
    }


    /* Main function for grabbing DWD data 
      needs getNearest(lat,lon) to determine which weather station 
      should be selected 
       needs states :dates,values
       */ 
    getDWD(){
      const id = this.getNearest(51.974581,7.607807)
      fetch('/python/'+id)
      .then(res => res.text())
      .then(json => (JSON.parse(json)))
      .then(json =>{
                    const dates = JSON.parse(json[0].replace(/'/g, '"'))
                    const values = JSON.parse(json[1].replace(/'/g, '"'))
                    this.setState({dates,values})
                  })
      .then(()=>console.log(this.state.dates))
    }

    /* Function that calls API and gets all the DWD stations with their 
      coordinates and names
      needs states : ids,lats,lons,result
      */
    getStations(){
      fetch('/stations')
      .then(res =>res.text())
      .then(text=>JSON.parse(text))
      .then(json => {
                  const ids = JSON.parse(json[0].replace(/'/g, '"'));
                  const lats = JSON.parse(json[1].replace(/'/g, '"'));
                  const lons = JSON.parse(json[2].replace(/'/g, '"'));
                  this.setState({ids,lats,lons})
                  var result = []
                  for(var i =0 ;i<this.state.id.length;i++){
                    result.push({id:this.state.id[i],location:{lat:this.state.lats[i],lon:this.state.lons[i]}})
                  }
                  this.setState({result})
      })
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
        var nearestid;
        var mindistance=5000000000;
        Object.keys(this.state.result).forEach(key=>{
            const distance = this.distanceInKmBetweenEarthCoordinates(lat,lon,this.state.result[key].location.lat,this.state.result[key].location.lon);
            if(mindistance>distance){
              nearestid =this.state.result[key].id;
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

    render(){
        return(
        <div>
            <h1>Welcome to senseBoard</h1>          
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a</p>
            <button onClick={this.getDWD}>DWD</button>
            <div>
        </div>
        </div>
        )
    }
}

export default Home
