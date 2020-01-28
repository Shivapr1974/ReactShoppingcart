import React, { Component } from 'react'
import FormInput from './FormInput'

export default class Form extends Component {
  columns= [{name:"existingUser", label:"Existing User: ", type: "checkbox"},
            {name:"rating", label:"Rating: ", type: "rating"},
            {name:"userName", label:"User Name: ", type: "text"},
            {name:"age", label:"Age: ", type: "number"},
            {name:"sex", label:"Sex: ", type: "select", options: [['M', 'Male'],['F', 'Female']] },
            {name:"comments", label:"Comments: ", type: "textArea"} 
  ];   
  constructor(props) {
    super(props);
    this.state = {
      existingUser: true,
      rating: 5,
      userName: "Shivapr",
      age: 25,
      comments: "Helo",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <>
        <form>
          <table>
            {
              this.columns.map((val, idx)=> {
                return (
                  <tr>
                      <FormInput 
                        label={val.label}
                        type={val.type}
                        name={val.name}
                        checked={this.state[val.name]}
                        value={this.state[val.name]}
                        onChange={this.handleInputChange}
                        options={val.options}
                      ></FormInput>
                  </tr>
                )
              })
            }
          </table>
        </form>
        {JSON.stringify(this.state)}

          {/* <label>
            Is going:
            <input
              name="isGoing"
              type="checkbox"
              checked={this.state.isGoing}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Number of guests:
            <input
              name="numberOfGuests"
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange} />
          </label> */}


      </>
    );
  }

}
