import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import FileDrop from '../components/FileDrop';
import FileDecryption from '../components/FileDecryption';
import SectionTitle from '../components/SectionTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';

const Unlock = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    return (
        <>
            <Breadcrumb pathsArray={[
                { to: '/', name: 'Home' },
                { to: '/unlock-pdf', name: 'Unlock PDF' }
            ]} />
            <SectionTitle>
                <h1 className="title">
                    <FontAwesomeIcon className="mr-2" icon={faLockOpen} />
                    <b>Unlock PDF</b>
                </h1>
                <h2 className="subtitle">Remove a password from an encrypted PDF</h2>
            </SectionTitle>
            {!selectedFile && (
                <FileDrop 
                    modifyType={1}
                    setSelectedFile={setSelectedFile} 
                />
            )}
            {selectedFile && (
                <FileDecryption 
                    selectedFile={selectedFile} 
                    setSelectedFile={setSelectedFile} 
                />
            )}
        </>
    );
}

export default Unlock;