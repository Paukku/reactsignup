import React, { Component } from 'react';
import ReactDOM from "react-dom";
import FormField from './FormField';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import PasswordAgainField from './PasswordsCheck';

class JoinForm extends Component {

  // initialize state to hold validity of form fields
  state = { fullname: false, email: false, password: false, confirmpassword: false }

  // higher-order function that returns a state change watch function
  // sets the corresponding state property to true if the form field has no errors
  fieldStateChanged = field => state => this.setState({ [field]: state.errors.length === 0 });

  // state change watch functions for each field
  emailChanged = this.fieldStateChanged('email');
  fullnameChanged = this.fieldStateChanged('fullname');
  passwordChanged = this.fieldStateChanged('password');
  confirmpasswordChanged = this.fieldStateChanged('confirmpassword');



  render() {
    const { fullname, email, password, confirmpassword } = this.state;
    const formValidated = fullname && email && password && confirmpassword;

    // validation function for the fullname
    const validateFullname = value => {
      if (value.length < 3) throw new Error('Käyttäjätunnus on liian lyhyt');
      if (value.length > 20)  throw new Error('Käyttäjätunnus on liian pitkä');

    };

    const validatePasswords = () =>{

        if(confirmpassword !== password) throw new Error('salis et');
        }


    return (
      <div className="form-container d-table-cell position-relative align-middle">
        <form action="/" method="POST" noValidate>

          <div className="d-flex flex-row justify-content-between align-items-center px-3 mb-5">
            <legend className="form-label mb-0">Rekisteröidy</legend>
            {/** Show the form button only if all fields are valid **/}
            { formValidated && <button type="button" className="btn btn-primary text-uppercase px-3 py-2">Join</button> }
          </div>
          <div className="py-5 border-gray border-top border-bottom">

            <FormField type="text" fieldId="fullname" label="Käyttäjätunnus" placeholder="Anna käyttäjätunnus" validator={validateFullname} onStateChanged={this.fullnameChanged} required />

            <EmailField fieldId="email" label="Sähköposti" placeholder="Anna sähköpostiosoite" onStateChanged={this.emailChanged} required />

            <PasswordField fieldId="password" label="Salasana" placeholder="Anna salasana" onStateChanged={this.passwordChanged}  thresholdLength={7} minStrength={3} required />

             <FormField type="password" fieldId="confirmpassword" label="Salasana uudestaan" placeholder="Anna salasana uudelleen" validator={validatePasswords} onStateChanged={this.confirmpasswordChanged}  required />
          </div>

        </form>
      </div>
    );
  }

}

export default JoinForm;