import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-regular-svg-icons';

const FileModifyFailure = ({ onClick, errorText }) => {
    return (
        <section className="pdf-error">
            <div className="pdf-error-icon">
                <FontAwesomeIcon icon={faSadTear} size="7x" />
            </div>
            <div className="pdf-error-info">
                <p className="title is-4">Oh no!</p>
                <div className="field">
                    <div className="control">
                        <button className="button pdf-error-button is-medium is-fullwidth" onClick={onClick}>
                            Try Again
                        </button>
                    </div>
                </div>
                <p>We could not complete your request for the following reason: {errorText}</p>
            </div>
        </section>
    );
}

export default FileModifyFailure;