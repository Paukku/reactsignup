import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';
import PasswordField from './PasswordField';



class PasswordAgainField extends Component{
    constructor(props) {
        super(props);
        this.state = {confirmpassword: '', password: ''};
    }



     stateChanged = state => {
        // update the internal state using the updated state from the form field
        this.setState({
          confirmpassword: state.value,
          password: state.value
        }, () => this.props.onStateChanged(state));
      };

   render(){
  // prevent passing type and validator props from this component to the rendered form field component
  const { type, validator, children, ...restProps } = this.props;
  const { confirmpassword, password } = this.state;
  const passwordmatch = password === confirmpassword;

  //const strengthClass = [passwordmatch ? '' : ].join(' ').trim();

  // pass the validateEmail to the validator prop

  return(
   <Fragment>
  <FormField type="password" onStateChanged={this.stateChanged} {...restProps} />
    {children}
    </Fragment>
    )
  }
}

PasswordAgainField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node,
  onStateChanged: PropTypes.func
};

export default PasswordAgainField;