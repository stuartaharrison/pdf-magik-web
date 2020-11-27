import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BoxNavLink = ({ icon, title, description, to, colour, background }) => {
    const color = (colour) ? colour : '#4a4a4a';
    const bgColour = (background) ? background : '#FFF';
    
    return (
        <NavLink exact={true} to={to}>
            <div className="box" style={{backgroundColor: bgColour, color: color}}>
                <FontAwesomeIcon icon={icon} size="2x" />
                <h1 className="mt-4 mb-2">{title}</h1>
                <p>{description}</p>
            </div>
        </NavLink>
    );
}

export default BoxNavLink;