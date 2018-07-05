import React from 'react'
import {Link,Route,  BrowserRouter,} from 'react-router-dom'
import Modal from 'react-modal'
import Data from './Data'

/* Styles for the modal*/
const customStyles = {
    content : {
        color: 'green',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

class FetchBox extends React.Component{
    constructor(props){
        super(props)
        this.state={
            input:'',
            metadata:[],
            senseboxid:'',
            sensors:[],
            loading:false,
            succesful:true,
            modalIsOpen:false,
            geocodingResult:[],
            first:'',
          }
        this.updateInput = this.updateInput.bind(this);
        this.fetchBox = this.fetchBox.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.reverseGeocoding=this.reverseGeocoding.bind(this)
    }//End constructor
    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#4EAF47';
    }

    closeModal() {
    this.setState({modalIsOpen: false});
    }

    updateInput(e){
        const value = e.target.value
        this.setState(({
            input:value,
     }))
    }
    fetchBox(){      
        const id = '570bad2b45fd40c8197f13a2'  
        this.setState({
            loading:true,
            modalIsOpen:false
          })

        const boxURL = `https://api.opensensemap.org/boxes/`+id //'+this.state.input'
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
            metadata:json,
            sensors:json.sensors,
            first:json.sensors[0].title,
            loading:false,
            }))
        .then(this.reverseGeocoding)
    }//End fetchbox()

    reverseGeocoding(){
        const lon = this.state.metadata.currentLocation.coordinates[0]
        const lat = this.state.metadata.currentLocation.coordinates[1]
        const URL = 'https://nominatim.openstreetmap.org/reverse?format=json&lat='+lat+'&lon='+lon+'&zoom=18&addressdetails=1'
        fetch(URL)
        .catch((error)=>{
            console.warn(error);
            return null
        })
        .then((response)=>response.json())
        .then((json)=>this.setState({
            geocodingResult:json,
        }))
        }// End reverseGeocoding
    componentDidMount(){
        this.setState({modalIsOpen: true});



    }
    componentDidUnMount(){
        this.setState({modalIsOpen: false});

    }

    render(){

        
        return (
        <BrowserRouter>
            <div>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Modal"
                >
                    <h2 
                        style={{color:'#4EAF47'}}
                        ref={subtitle => this.subtitle = subtitle}>
                        Welcome to senseBoard
                    </h2>
                    <div>Enter your senseBox:id to start the process</div>
                    <form>
                        <input 
                            type='text'
                            placeholder='Id'
                            value={this.state.input}
                            onChange={this.updateInput}
                        />
                        <Link 
                        to={'/data'}>
                            <button 
                                onClick={this.fetchBox} 
                                className="btn header-btn"
                                type="button">
                                Search
                            </button>
                        </Link>
                    </form>
                </Modal>
                <Route path='/data' 
                component={() => (<Data metadata={this.state.metadata} 
                                        sensors={this.state.sensors}
                                        first ={this.state.first}
                                        geocoding={this.state.geocodingResult}
                    />)}
                />
            </div>
        </BrowserRouter>
    )
    }//End Render
}//End Class

export default FetchBox
