import Layout from './components/Layout';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          Ayoooooooooo!
        </Layout>
      </div>
    </Router>
  );
}

export default App;
