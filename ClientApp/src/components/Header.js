import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header>
            <div className="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <NavLink className="navbar-item primary-colour" exact to="/">
                        <FontAwesomeIcon icon={faShieldAlt} size="2x" />
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default Header;