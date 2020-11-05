import React from 'react';
import Index from 'components/views/Index';
import HalpisRiftIndex from 'components/views/HalpisRiftIndex';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Route exact path="/kow-react-listbuilder/halpis-rift" component={HalpisRiftIndex} />
      <Route exact path="/kow-react-listbuilder" component={Index} />
    </Router>
  );
};

export default App;
