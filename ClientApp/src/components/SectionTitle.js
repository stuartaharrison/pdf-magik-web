import React from 'react';

const SectionTitle = ({ children }) => {
    return (
        <section className="section">
            <div className="container">
                <div className="has-text-centered">
                    {children}
                </div>
            </div>
        </section>
    );
}

export default SectionTitle;