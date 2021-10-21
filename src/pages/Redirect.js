import React from 'react';
import axios from "axios";
import '../App.css';
import { WEBSITE_URL } from '../constants';


class Redirect extends React.Component {
  componentDidMount(){
    let destination = WEBSITE_URL;
    axios.get('/redirect/' + this.props.match.params.id)
    .then((res) => {
      if(res.data) 
        destination = res.data.destination
      window.location = destination;
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
