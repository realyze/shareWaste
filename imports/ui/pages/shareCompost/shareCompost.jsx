import React from 'react';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';

import './shareCompost.less';

import Step0 from '../../components/registration/step0.jsx';
import Step1 from '../../components/registration/step1.jsx';

class DesktopRegistration extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  handleGoogleSignin = () => {
    const self = this;
    Meteor.loginWithGoogle(err => {
      if (err) {
        console.error(err);
      } else {
        self.setState({ stepIndex: 1 });
      }
    });
  }

  renderStepContent = (stepIndex) => {
    const handleGoogleSignin = this.handleGoogleSignin.bind(this);

    switch (stepIndex) {
      case 0:
        // const handleFacebookSignin = this.handleFacebookSignin.bind(this);
        return (
          this.props.loginServicesConfigured ?
            (<Step0 handleGoogleSignin={handleGoogleSignin} />)
            :
            (<span>Waiting for server...</span>)
        );

      case 1:
        return <Step1 user={this.props.currentUser} />;
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const { stepIndex } = this.state;
    const contentStyle = { margin: '0 16px' };

    return (
      <div className="share-compost" style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Sign Up</StepLabel>
          </Step>
          <Step>
            <StepLabel>Tell us abour yourself</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          <div>
            <div>{ this.renderStepContent(stepIndex) }</div>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(({ params }) => {
  return {
    loginServicesConfigured: Accounts.loginServicesConfigured(),
    currentUser: Meteor.user(),
  };
}, DesktopRegistration);
