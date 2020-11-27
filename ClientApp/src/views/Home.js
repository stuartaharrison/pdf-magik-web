import React from 'react';
import BoxNavLink from '../components/BoxNavLink';
import { faLockOpen, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="mb-6 has-text-centered">
                    <h1 class="title">PDF Protect</h1>
                    <h2 class="subtitle">All-in-one easy-to-use PDF tools</h2>
                </div>
                <div className="columns">
                    <div className="column is-one-quarter">
                        <BoxNavLink 
                            icon={faShieldAlt} 
                            colour="#fff"
                            background="#eb4d4b"
                            to={'/protect-pdf'} 
                            title="Protect PDF" 
                            description="Add a password & encrypt your PDF files" 
                        />
                    </div>
                    <div className="column is-one-quarter">
                        <BoxNavLink 
                            icon={faLockOpen} 
                            colour="#fff"
                            background="#f0932b"
                            to={'/unlock-pdf'} 
                            title="Unlock PDF" 
                            description="Remove a password & encryption from your PDF files" 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;