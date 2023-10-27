import logo from './logo.svg';
import './App.css';
import App__ from './components/Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './components/Upload';
import Project from './components/Project';
import Gtfs from './components/Gtfs';

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route exact path="/app" element={<App__ />} ></Route>
          <Route exact path="/upload" element={<Upload />} ></Route>
          <Route exact path="/projects" element={<Project />} ></Route>
          <Route exact path="/gtfs/:id" element={<Gtfs />} ></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
