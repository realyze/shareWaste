import React from 'react';
import Geosuggest from 'react-geosuggest';
import './index.less';

class ShareCompostPage extends React.Component {

  onSuggestSelect() {
    console.log(arguments);
  }

  render() {
    return (
      <div className="share-compost-root">
        Share compost
        <Geosuggest
          placeholder="Type your address"
          onSuggestSelect={this.onSuggestSelect}
          />
      </div>
    )
  }
};

export default ShareCompostPage;