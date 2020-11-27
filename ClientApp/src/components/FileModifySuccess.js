import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileBeam } from '@fortawesome/free-regular-svg-icons';

const FileModifySuccess = ({ onClick, successLink, successText, downloadButtonText, modifyButtonText }) => {
    const textSuccess = (successText) ? successText : 'Success! Your document is ready to go!';
    const textDownloadButton = (downloadButtonText) ? downloadButtonText : 'Download';
    const textModifyButton = (modifyButtonText) ? modifyButtonText : 'Do another File';

    return (
        <section className="pdf-completed">
            <div className="pdf-completed-icon">
                <FontAwesomeIcon icon={faSmileBeam} size="7x" />
            </div>
            <div className="pdf-completed-info">
                <div className="field is-grouped">
                    <div className="control">
                        <a className="button pdf-completed-button is-medium is-fullwidth" href={successLink} target="_blank" rel="noreferrer">
                            {textDownloadButton}
                        </a>
                    </div>
                    <div className="control">
                        <button className="button pdf-completed-button is-medium is-fullwidth" onClick={onClick}>
                            {textModifyButton}
                        </button>
                    </div>
                </div>
                <p>{textSuccess}</p>
            </div>
        </section>
    );
}

export default FileModifySuccess;