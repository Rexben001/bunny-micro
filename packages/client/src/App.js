import User from './components/users';
import Task from './components/tasks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.css';
import Tasks from './components/tasks';

function App() {
  return (
    <div className='App'>
      <Router>
        {/* <Switch> */}
        <nav>
          <h1> Todo App</h1>
        </nav>
        <div className='home'>
          <Route exact path='/' component={User} />
          <Route path='/' component={Task} />
        </div>
      </Router>
    </div>
  );
}

export default App;
