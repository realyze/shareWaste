import React from 'react';
import reactCSS, { hover } from 'reactcss'
import { Link } from 'react-router'

const styles = reactCSS({
  'default': {

    choiceContainer: {
      height: '50%',
      display: 'flex',
      'flexDirection': 'row',
      'justifyContent': 'space-around',
      'alignItems': 'center',
    },
  }
});

class IndexPage extends React.Component {

  render() {
    return <div className="main-choice-container" style={ styles.choiceContainer }>
      <Link to="/map" className="main-choice-button">I have waste</Link>
      <Link to="/share-compost" className="main-choice-button">I have compost</Link>
    </div>
  }
};

export default IndexPage;