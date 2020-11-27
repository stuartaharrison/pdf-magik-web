import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Breadcrumb = ({ pathsArray }) => {
    return (
        <nav className="breadcrumb mt-5 mb-0">
            <ul>
                {pathsArray.map((path, index) => (
                    <li 
                        key={index}
                        className={(index >= pathsArray.length - 1 ? "is-active" : "")}>
                        <NavLink to={path.to}>
                            {index === 0 && (
                                <FontAwesomeIcon className="mr-1" icon={faHome} />
                            )}
                            {path.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Breadcrumb;