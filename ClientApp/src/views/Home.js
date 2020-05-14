import React, { useCallback, useState, useContext, useRef, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { PdfContext } from '../context/pdf/pdfState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faSmileBeam, faSadTear } from '@fortawesome/free-regular-svg-icons'
import { faFileImport, faLockOpen, faShieldAlt } from '@fortawesome/free-solid-svg-icons'

export const Home = () => {
    // get context variables
    const { error, result, loading, encrypt } = useContext(PdfContext);

    // set our state variables
    const firstRender = useRef(true);

    const [selectedFile, setFile] = useState(null);
    const [canSubmit, setCanSubmit] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [confirmP, setConfirmP] = useState('');
    const [confirmPError, setConfirmPError] = useState('');

    // configure form inputs
    const onValidatePassword = () => {
        if (password === "") {
            setPasswordError("Password is required.");
            return false;
        }
        else if (confirmP === "") {
            setConfirmPError("Please re-enter your password.");
            return false;
        }
        else if (password !== confirmP) {
            setConfirmPError("Passwords do not match!");
            return false;
        }
        else {
            setPasswordError("");
            setConfirmPError("");

            setFile({
                ...selectedFile,
                NewPassword: confirmP
            });

            return true;
        }
    }

    // listen for changes in our form
    useEffect(() => {
        // check for first time render event
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        // now we validate our form
        setCanSubmit(onValidatePassword());
    }, [password, confirmP]);

    // configure dropzone callbacks & properties
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                var dto = {
                    EncryptionOptions: 2,
                    Filename: file.name,
                    CurrentPassword: '',
                    NewPassword: 'test',
                    Base64Data: reader.result 
                };

                setFile(dto);
            };

            //reader.readAsArrayBuffer(file);
            reader.readAsDataURL(file);
        });
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="container">
            <section className="dropzone-header">
                <p className="title is-4">
                    <span className="header-icon"><FontAwesomeIcon icon={faShieldAlt} /></span><b>Password Protect PDF</b>
                    <br />
                    Encrypt your PDF with a password!
                </p>
            </section>
            {selectedFile === null && (
                <section className="dropzone">
                    <div className="dropzone-container" {...getRootProps()}>
                        <input {...getInputProps()} accept=".pdf" />
                        <FontAwesomeIcon icon={faFilePdf} size="5x" />
                        <button className="button dropzone-button is-medium">
                            <FontAwesomeIcon icon={faFileImport} />&nbsp;Choose File
                                </button>
                        <p>or drop PDF here.</p>
                    </div>
                </section>
            )}
            {selectedFile != null && error && (
                <section className="pdf-error">
                    <div className="pdf-error-icon">
                        <FontAwesomeIcon icon={faSadTear} size="7x" />
                    </div>
                    <div className="pdf-error-info">
                        <p className="title is-4">Oh no!</p>
                        <div className="field">
                            <div className="control">
                                <button className="button pdf-error-button is-medium is-fullwidth" onClick={() => setFile(null)}>
                                    Try Again
                                </button>
                            </div>
                        </div>
                        <p>We could not complete your request for the following reason: {error}</p>
                    </div>
                </section>
            )}
            {selectedFile != null && result && (
                <section className="pdf-completed">
                    <div class="pdf-completed-icon">
                        <FontAwesomeIcon icon={faSmileBeam} size="7x" />
                    </div>
                    <div class="pdf-completed-info">
                        <div className="field is-grouped">
                            <div className="control">
                                <a className="button pdf-completed-button is-medium is-fullwidth" href={result} target="_blank" rel="noreferrer">
                                    Download
                            </a>
                            </div>
                            <div className="control">
                                <button className="button pdf-completed-button is-medium is-fullwidth" onClick={() => setFile(null)}>
                                    Encrypt another file
                            </button>
                            </div>
                        </div>
                        <p>Success! Your PDF has been encrypted and is ready to go!</p>
                    </div>
                </section>
            )}
            {selectedFile != null && !error && !result && (
                <section className="pdf-modify">
                    {loading === true && (
                        <div className="pdf-process">
                            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                    )}
                    <div className="pdf-info">
                        <FontAwesomeIcon icon={faLockOpen} size="4x" />
                        <p className="title is-5">{selectedFile.Filename}</p>
                    </div>
                    <div className="pdf-encrypt">
                        <div className="field">
                            <div className="control">
                                <input className={(passwordError.length > 0 ? "input is-danger is-medium" : "input is-medium")} type="password" placeholder="Choose your password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {passwordError.length > 0 && (
                                <p className="help is-danger">{passwordError}</p>
                            )}
                        </div>

                        <div className="field">
                            <div className="control">
                                <input className={(confirmPError.length > 0 ? "input is-danger is-medium" : "input is-medium")} type="password" placeholder="Repeat your password" onChange={(e) => setConfirmP(e.target.value)} />
                            </div>
                            {confirmPError.length > 0 && (
                                <p className="help is-danger">{confirmPError}</p>
                            )}
                        </div>

                        <div className="field">
                            <div className="control">
                                <button className="button encrypt-confirm is-medium is-fullwidth" onClick={(e) => encrypt(selectedFile)} disabled={!canSubmit}>
                                    Encrypt Now!
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}