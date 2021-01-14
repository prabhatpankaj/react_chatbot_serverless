import React, { Component } from 'react';
import axios from 'axios';


class Post extends Component {
  constructor(props) {
    super(props);
    const { steps } = this.props;
    const { phone, name, city, treatment } = steps;

    this.state = { phone, name, city, treatment };
  }


  componentDidMount() {
    const userObject = {
      phoneNumber: this.state.phone.value,
      fullName: this.state.name.value,
      city: this.state.city.value,
      treatmentType: this.state.treatment.value
    };
    axios.post(`https://apiendpoint.execute-api.ap-south-1.amazonaws.com/dev/responses/accept`, userObject)
      .then(res => {
        console.log(res.status)
      }).catch(function (error) {
        console.log(error);
      });
  }
  
  render() {
    return (
      <div>Thank you! Your data was submitted successfully!</div>
    );
  }
};


export default Post;