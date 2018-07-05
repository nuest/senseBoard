import React from 'react'

export default function Maxium(props){

        var maxValue=-500000;
        props.data.map((data)=>(
            maxValue=Math.max(maxValue,data)
                
        ))  
    
    return(
    
    <li>maximum:{maxValue}</li>

    )
}