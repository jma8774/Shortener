import React from 'react';
import axios from "axios";
import '../App.css';
import { WEBSITE_URL } from '../constants';


class Redirect extends React.Component {
  componentDidMount(){
    alert("HELLO U HERE")
    let destination = WEBSITE_URL;
    alert(destination)
    axios.get('/api/redirect/' + this.props.match.params.id)
    .then((res) => {
      if(res.data) {
        destination = res.data.destination
        alert(destination)
      }
      window.location = 'https://www.google.com/';
    });
  }

  render() {
    return (
     <div>

     </div>
    )
  }
}

export default Redirect;
