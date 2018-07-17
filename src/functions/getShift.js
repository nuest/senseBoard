import React from 'react'

export default function Shift(props){

        let shift=0;
        let sum_data = 0;
        let sum_data_compare=0
        props.data.map((data)=>(
            sum_data+=data     
        ))
        props.data_compare.map((data)=>(
            sum_data_compare+=data     
        ))
        
        shift = (( sum_data - sum_data_compare ) / sum_data_compare) * 100 
        shift = Math.floor(shift*100)/100
    if(shift>0){
    return(
        <li>This month has been warmer on average than last months({shift}%)</li>

    )
}
if(shift<0){
    return(
        <li>This month has been colder on average than last months({shift}%)</li>

    )
}
}