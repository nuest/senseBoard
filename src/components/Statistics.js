import React from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Stats from './Stats'
import Analysis from './Analysis'
import Loading from './Loading'
import Carousel from 'nuka-carousel'
/* Gets called from Menu with props :senseBoxID sensorID + phenomenon und senseBoxLocation*/
/*  Dataset for each phenomenon */
class Statistics extends React.Component{

    constructor(props){
        super(props)
        this.state={
            loading:false,
            title:null,
            url:this.props.senseBoxID+'/'+this.props.phenomenon+'/'+this.props.senseBoxLocation[0]+'/'+this.props.senseBoxLocation[1]
        }

        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);

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


    componentWillMount(){
    }/* Gets called from Menu with props :senseBoxID sensorID + phenomenon und senseBoxLocation*/
    componentDidMount(){

    }

    render(){
        if(this.state.loading === true ){
            return(
                <Loading/>
            )
        }
        return(
            <div className="container">
            <div className="row">
                <p>These are the <b>mean</b> of your measurements for your sensor from the last months :</p>
            </div>
                <div className="row">
                    <Stats phenomenon={this.props.phenomenon} url={this.state.url}/>
                {/* <Analysis data={this.state.data}/> */}
                </div> 
            </div>
            )
    }
}

export default Statistics
