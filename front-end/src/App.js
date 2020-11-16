import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationBar from "./components/Navbar";
import PrescriptionList from "./components/PrecriptionList";
import PatientInformation from "./components/PatientInformation";
import PrescriptionDetail from "./components/PrescriptionDetail";
import Home from "./components/Home";
import Footer from "./components/Footer";
import './App.css';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Router>
        <Switch>
          <Route exact path="/patient-information" component={PatientInformation} />
          <Route exact path="" component={PrescriptionList} />
          <Route exact path="/prescription-information/:id" component={PrescriptionDetail} />
          {/* <Route exact path="/prescription-information" component={PrescriptionList} /> */}
        </Switch>
        
      </Router>
        <Footer/>
    </div>
  );
}

export default App;
