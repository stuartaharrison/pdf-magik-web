import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import FileDrop from '../components/FileDrop';
import FileEncryption from '../components/FileEncryption';
import SectionTitle from '../components/SectionTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const Protect = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    return (
        <>
            <Breadcrumb pathsArray={[
                { to: '/', name: 'Home' },
                { to: '/protect-pdf', name: 'Protect PDF' }
            ]} />
            <SectionTitle>
                <h1 className="title">
                    <FontAwesomeIcon className="mr-2" icon={faShieldAlt} />
                    <b>Password Protect PDF</b>
                </h1>
                <h2 className="subtitle">Encrypt your PDF with a password!</h2>
            </SectionTitle>
            {!selectedFile && (
                <FileDrop 
                    modifyType={2}
                    setSelectedFile={setSelectedFile} 
                />
            )}
            {selectedFile && (
                <FileEncryption 
                    selectedFile={selectedFile} 
                    setSelectedFile={setSelectedFile} 
                />
            )}
        </>
    );
}

export default Protect;