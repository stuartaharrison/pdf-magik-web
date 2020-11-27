import React from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';

const FileModify = ({ children, selectedFile, buttonText, isLoading, canSubmit, onSubmit, onCancel }) => {
    const textButton = (buttonText) ? buttonText : 'Modify Now!';
    return (
        <section className="pdf-modify">
            {isLoading === true && (
                <div className="pdf-process">
                    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            )}
            <div className="pdf-info">
                <FontAwesomeIcon icon={faLockOpen} size="4x" />
                <p className="title is-5">{selectedFile.Filename}</p>
            </div>
            <div className="pdf-encrypt">
                {children}
                <Button
                    text={textButton}
                    className="encrypt-confirm"
                    onClick={onSubmit} 
                    disabled={!canSubmit}
                />
                <p className="pdf-encrypt-back has-text-right"
                   onClick={onCancel}>
                    I've changed my mind!
                </p>
            </div>
        </section>
    );
}

export default FileModify;