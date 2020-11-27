import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PdfProvider } from './context/pdf/pdfState';
import Header from './components/Header';
import Home from './views/Home';
import NotFound from './views/NotFound'; 
import Protect from './views/Protect';
import Unlock from './views/Unlock';

function App() {
    return (
        <Router>
            <PdfProvider>
                <Header />
                <div className="container">
                    <Switch>
                        <Route path='/' exact={true}>
                            <Home />
                        </Route>
                        <Route path='/protect-pdf'>
                            <Protect />
                        </Route>
                        <Route path='/unlock-pdf'>
                            <Unlock />
                        </Route>
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </PdfProvider>
        </Router>
    );
}

export default App;
