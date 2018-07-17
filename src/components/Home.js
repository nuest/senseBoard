import React from 'react';
import Carousel from 'nuka-carousel'


  /* 
    Beide JSON Einträge müssen richtig geparst werden. Zusätzlich muss in Python noch 
    die Datei erheblich verkleinert werden(letzte 60 Messwerte oder sowas wäre denkbar)
    + Weiter anschauen das Dokument möglichst gut fürs FrontEnd zuzuschneien.(done)
    + Parameterübergabe hinkriegen (halfway done,erstmalige ausführung des skripts beim start vom server
                                      verhindern)
    + Parameterbestimmung => ID mit geograph gleichsetzen und vergleichen welche ID am nähsten ist (done)
    + Einpflegung der DWD Daten in einen Plot der gleichzusetzen mit denen von der senseBox ist 
        + Datendownload abhängig von dem Phänomen 
    + Weiter nach Statistik Tool umschauen 
    + Recherche weiterer Daten(=>LANUV?)
    + Ordnerstruktur für py skripts überlegen(ins
     ++++ Stations.csv neu aufbereiten  
      
      
      
    . wo werden die .zips gespeichert?)
  */

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        };

    }
    componentDidMount() {
    }

    render(){
        // return(
        // <div>
        //     <h1>Welcome to senseBoard</h1>          
        //     <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a</p>
        //     <div>
        // </div>
        // </div>
        // )
        return(
            <Carousel>
            <p>des</p>
            <p>des2</p>
            <p>des3</p>
            <p>des4</p>
            <p>des5</p>
    
          </Carousel>
        )
    }
}

export default Home
