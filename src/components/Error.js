import React from 'react'

export default function Error(props){
    return <div>
            <h1> Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut! </h1>
            <p> Ihr Fehlercode lautet : {props.errorInfo} </p>
            <p> Eine Auflistung bekannter Fehlercodes und deren Bedeutung können Sie hier finden : </p>
            <ul>
                <li>0: Dieses Problem liegt an einer fehlerhaften Anfrage an die openSenseMap. Bitte überprüfen sie alle Eingabeparameter und versuchen
                    Sie es erneut. Wichtig: Von und Bis Datum dürfen nicht gleich sein !  </li>
            </ul>
        </div>
}