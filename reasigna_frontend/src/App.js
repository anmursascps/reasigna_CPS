import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stats from "./components/pages/stats";
import NotFound from "./components/pages/stats/error";
import Upload from "./components/pages/upload";
import Project from "./components/pages/project";
import Gtfs from "./components/pages/gtfs";
import GtfsDetails from "./components/pages/gtfs_detail";
import RouteDetails from "./components/pages/route_details";

function App() {
  return (
    <div className="App" >
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Stats />}></Route>
          <Route path="/proyectos" element={<Project />}></Route>
          <Route path="/proyectos/:id" element={<Gtfs />}></Route>
          <Route path="/gtfs/:id" element={<GtfsDetails />}></Route>
          <Route path="/gtfs/:id/route/:route_id" element={<RouteDetails />}></Route>
          <Route path="/proyectos/:id/gtfs" element={<Upload />}></Route>
          <Route path="/upload" element={<Upload />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
