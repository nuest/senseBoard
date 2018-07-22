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
                        to={'/Overview'}>
                            <button 
                                onClick={()=>this.closeModal()} 
                                className="btn header-btn"
                                type="button">
                                Search
                            </button>
                        </Link>
                    </form>
                </Modal>
                <Route path='/Overview' 
                component={() => (<Statistics id={this.state.input}
                    />)}
                />
            </div>
        </BrowserRouter>
    )
    }//End Render
}//End Class

export default FetchBox
