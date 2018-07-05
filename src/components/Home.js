// import React from 'react'

// class Home extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             python:"",
//         };
//     }
//     componentDidMount(){
//         fetch('/python')
//         .then(res =>console.log(res))
//     }
//     render(){
//         return(
//         <div>
//             <h1>Welcome to senseBoard</h1>          
//             <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a</p>
//             <h2>{this.state.python}</h2>
//             <div>
//         </div>
//         </div>
//         )
//     }
// }

// export default Home

import React, { Component } from 'react';

class App extends Component {
  state = {users: []}


  /* 
    Beide JSON Einträge müssen richtig geparst werden. Zusätzlich muss in Python noch 
    die Datei erheblich verkleinert werden(letzte 60 Messwerte oder sowas wäre denkbar)
    + Weiter anschauen das Dokument möglichst gut fürs FrontEnd zuzuschneien.
    + Parameterübergabe hinkriegen 
    + Parameterbestimmung => ID mit geograph gleichsetzen und vergleichen welche ID am nähsten ist.
  */
  componentDidMount() {
    fetch('/python/00150')
    .then(res => res.text())
    .then(json => (JSON.parse(json)))
    .then(json =>JSON.parse(json[0].replace(/'/g, '"')))
    // .then(json => JSON.parse(json[0]))
    .then(parse => console.log(parse))
    //   .then(res => res.json())
    //   .then(json => console.log(json))
    //   .then(users => this.setState({ users }))
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}

export default App;