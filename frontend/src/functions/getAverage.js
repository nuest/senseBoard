import React from 'react'

export default function Average(props){
    let average = 0;
    let summedUp = 0;
    
    props.data.map((data)=>(
        summedUp=summedUp+data
    ))
    average = summedUp/props.data.length
    average = Math.floor(average*100)/100
    
    return(
        <li>average:{average}</li>

    )
}