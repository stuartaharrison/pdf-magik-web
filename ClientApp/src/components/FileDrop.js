import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';

const FileDrop = ({ modifyType, setSelectedFile }) => {

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                var dto = {
                    EncryptionOptions: modifyType,
                    Filename: file.name,
                    CurrentPassword: '',
                    NewPassword: '',
                    Base64Data: reader.result 
                };

                setSelectedFile(dto);
            };

            reader.readAsDataURL(file);
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
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
    );
}

export default FileDrop;
