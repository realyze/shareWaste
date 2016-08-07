import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'normalize.css';

import renderRoutes from '../imports/startup/client/routes.jsx';

injectTapEventPlugin();

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('react-root'));
});
