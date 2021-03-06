import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import './App.css';

import { HashRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router basename="/" hashType="slash">
      <ScrollToTop />
      <div className="App">
        <Layout />
      </div>
    </Router>
  );
}

export default App;
