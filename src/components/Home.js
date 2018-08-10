import React from 'react';
import Slider from 'react-slick'
import Story1 from '../images/story(1).png'
import Story2 from '../images/story(2).png'
import Story3 from '../images/story(3).png'


class Home extends React.Component{
    constructor(props){
        console.log(props)
        super(props)
        this.state = {

        };
    }
    closeModal() {
    }

    componentDidMount(){
    }

    componentWillUpdate(){
    }
    download(){



    }
    render(){
        var settings = {
            dots: true,
            autoplay:true,
            autoplaySpeed:8000
          };
          
        return(
            <div id="capture">

            <h1>Welcome to senseBoard</h1>
            <div> Mit dem senseBoard kannst du nun deine eigenen Statistiken mit Daten <b>deiner</b> senseBox erstellen und teilen ! In der Gallerie siehst du
            einige Beispiele was dabei herauskommen könnte !  </div>
            <div className="container">
            <Slider className="carousel" {...settings}>
            <div>
                <img alt ="story1" width="100%"src={Story1} />
            </div>
            <div>
                <img alt="story2" width="100%%" src={Story2} />
            </div>
            <div>
                <img alt="story3" width="100%%" src={Story3} />
            </div>
            </Slider>
        </div>
        Im Story-Builder kannst du dir Statistiken zu den einzelnen Phänomenen die deine senseBox misst anzeigen lassen.<br></br>
        Anschließend kannst du das Bild, indem du an den Ecken ziehst vergrößern oder verkleinern. <br></br>
        Rechts neben dem angezeigten Bild kannst du Texte hinzufügen und diese nach deinem Belieben positionieren.<br></br>
        Bist du fertig mit der Erstellung deines Bildes klicke auf 'Download' und du kriegst das Bild auf deinen Computer.
            </div>
        )

    }
 
}

export default Home