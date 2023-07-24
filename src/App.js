// import logo from './logo.svg';
import './App.css';
import DynamicForm from './DynamicForm';
import Frontpage from './superadmin';
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={'/'} element={<DynamicForm/>}/>
          <Route path={'/admin'} element={<Frontpage/>}/>

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
