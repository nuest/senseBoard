import React from 'react'

export default function Minimum(props){

        let minValue=5000000;
        props.data.map((data)=>(
            minValue=Math.min(minValue,data)
                
        ))
    
    return(
        <li>minimum:{minValue}</li>

    )
}