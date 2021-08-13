import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Component/Home/Home';
const Routing = () => {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            </Switch>
        </div>
      </Router>
    );
  }

  export default Routing;