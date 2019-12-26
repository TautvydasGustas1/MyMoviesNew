import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer/Footer'
import FAQ from './components/FAQ/FAQ'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <section className='container'>
        <Switch>
          <Route exact path='/faq' component={FAQ}></Route>
        </Switch>
      </section>
      <Footer />
    </Fragment>
  </Router>
);
export default App;
