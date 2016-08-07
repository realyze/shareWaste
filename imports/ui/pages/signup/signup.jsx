import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { Meteor } from 'meteor/meteor';

import './signup.less';

@withRouter
class SignupPage extends React.Component {

  handleGoogleSignin = () => {
    Meteor.loginWithGoogle(err => {
      if (err) {
        console.error(err);
      } else {
        this.props.router.push('/share-compost/your-details');
      }
    });
  }

  render() {
    return (
      <div className="signup-container">
        <h1>Awesome, let's' do this! First, please sign in.'</h1>
        <RaisedButton label="Google" onTouchTap={this.handleGoogleSignin} />
        <RaisedButton label="Facebook" />
      </div>
    );
  }
}

SignupPage.propTypes = {
  router: PropTypes.object,
};

export default SignupPage;