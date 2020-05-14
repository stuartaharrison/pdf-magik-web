import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PdfProvider } from './context/pdf/pdfState'
import { Header } from './components/Header'
import { Home } from './views/Home'
import { NotFound } from './views/NotFound' 

function App() {
    return (
        <Router>
            <PdfProvider>
                <Header />
                <div className="content">
                    <Switch>
                        <Route path='/' exact={true}>
                            <Home />
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
