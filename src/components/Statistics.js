import React from 'react'
import Stats from './Stats'
import Loading from './Loading'
class Statistics extends React.Component{

    constructor(props){
        super(props)
        console.log(props)
        this.state={
            loading:true,
            title:null,
            url:null,
            senseBoxData:null
        }

        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.fetchBox = this.fetchBox.bind(this)
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

    fetchBox(){       
        const id = '570bad2b45fd40c8197f13a2'  
        this.setState({
            loading:true,
            modalIsOpen:false
          })

        const boxURL =`https://api.opensensemap.org/boxes/`+id //'+this.props.id'
        fetch(boxURL)
        .catch((error) => {
            this.setState({
                succesful:false,
            })
          console.warn(error)
          return null
        })
        .then((response) => response.json())
        .then((json)=>this.setState({
            senseBoxData:json,
            loading:false,
            }))
       // .then(this.reverseGeocoding)
    }//End fetchbox()

    // reverseGeocoding(){
    //     const lon = this.state.metadata.currentLocation.coordinates[0]
    //     const lat = this.state.metadata.currentLocation.coordinates[1]
    //     const URL = 'https://nominatim.openstreetmap.org/reverse?format=json&lat='+lat+'&lon='+lon+'&zoom=18&addressdetails=1'
    //     fetch(URL)
    //     .catch((error)=>{
    //         console.warn(error);
    //         return null
    //     })
    //     .then((response)=>response.json())
    //     .then((json)=>this.setState({
    //         geocodingResult:json,
    //     }))
    //     }// End reverseGeocoding

    componentDidMount(){
        this.fetchBox()
        
    }
    render(){
        if(this.state.loading === true ){
            return(
                <Loading/>
            )
        }
        return(
            
                <Stats senseBoxData={this.state.senseBoxData}/>
            )
    }
}

export default Statistics
