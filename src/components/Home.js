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
        return(
            <div>
            <h1>Welcome to senseBoard</h1>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            </div>
        )
    }
}

export default Home
