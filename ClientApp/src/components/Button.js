import React from 'react';

const Button = ({ text, className, onClick, disabled }) => {
    const cls = (className) ? `button ${className} is-medium is-fullwidth` : `button encrypt-confirm is-medium is-fullwidth`;
    return (
        <div className="field">
            <div className="control">
                <button 
                    className={cls} 
                    onClick={(e) => onClick(e)} 
                    disabled={disabled}>
                    {text}
                </button>
            </div>
        </div>
    );
}

export default Button;