import React from 'react'
import {Link,Route,  BrowserRouter,} from 'react-router-dom'
import Modal from 'react-modal'
import Statistics from './Statistics';
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
            senseBoxData:{},
            senseboxid:'',
            sensors:[],
            loading:false,
            succesful:true,
            modalIsOpen:false,
            geocodingResult:[],
            first:'',
          }
        this.updateInput = this.updateInput.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
        console.log(this.state.senseboxid)
        const value = e.target.value
        this.setState(({
            input:value,
     }))
    }
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
                        Gebe deine senseBox Id ein 
                    </h2>
                    <div style={{color:'black'}} >Jede senseBox hat eine eigene ID mit der du sie von den anderen unterscheiden kannst! Suche die ID die der Box raus die du analysieren möchtest und klicke auf 'Suche'<br></br>
                            <br></br>Solltest du gerade keine ID parat haben, kannst du dir von dieser Liste ein paar interessante Boxen raussuchen:
                            <ul>
                                <li>Münster Süd: 5a30ea5375a96c000f012fe0 </li>
                                <li>Nordwalde : 5b411d0e5dc1ec001b4f11c8 </li>
                                <li> Berlin Friedrichshain: 5b5e071441718300198cc5f0 </li>
                            </ul>
                            <br></br>
                            Gehe auf die <a href="https://www.opensensemap.org"> openSenseMap </a> und finde eine senseBox in deiner Nähe
                            <br></br>
                    </div>
                    <form className="modalBox">
                        <input 
                            style={{width:'90%'}}
                            type='text'
                            placeholder='Id'
                            value={this.state.input}
                            onChange={this.updateInput}
                        />
                        <Link 
                        to={'/Overview'}>
                            <button 
                                onClick={()=>this.closeModal()} 
                                className="btn header-btn"
                                type="button">
                                Suche
                            </button>
                        </Link>
                    </form>
                </Modal>
                <Route path='/Overview' 
                component={() => (<Statistics perma="false" id={this.state.input}
                    />)}
                />
            </div>

        </BrowserRouter>
    )}
    //End Render
}//End Class

export default FetchBox
