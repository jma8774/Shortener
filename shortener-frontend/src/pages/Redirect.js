import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


class Redirect extends React.Component {
  componentDidMount(){
    console.log(this.props.match.params.id)
    // BACKEND SHIT
    let destination = 'http://reddit.com'
    window.location = destination;
  }

  render() {
    return (
     <div>

     </div>
    )
  }
}

export default Redirect;
