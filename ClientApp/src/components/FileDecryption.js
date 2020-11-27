import React, { useContext, useState } from 'react';
import FileModify from './FileModify';
import FileModifyFailure from './FileModifyFailure';
import FileModifySuccess from './FileModifySuccess';
import PasswordField from './PasswordField';
import { PdfContext } from '../context/pdf/pdfState';

const FileDecryption = ({ selectedFile, setSelectedFile }) => {
    const { error, result, loading, clearResult, modify } = useContext(PdfContext);
    const [masterPassword, setMasterPassword] = useState('');
    const [canSubmitDecryption, setCanSubmitDecryption] = useState(false);

    const onClearFile = () => {
        clearResult();
        setSelectedFile(null);
    }

    const onValidatePasswordInput = (isValid) => {
        if (isValid === true) {
            setSelectedFile({
                ...selectedFile,
                CurrentPassword: masterPassword
            });
        }
        setCanSubmitDecryption(isValid);
    }

    if (error) {
        return (<FileModifyFailure 
            onClick={onClearFile} 
            errorText={error} 
        />);
    }

    if (result) {
        return (<FileModifySuccess 
            onClick={onClearFile}
            successLink={result}
            modifyButtonText="Decrypt another file"
        />);
    }

    return (
        <FileModify
            selectedFile={selectedFile}
            buttonText="Remove Password!"
            isLoading={loading}
            canSubmit={canSubmitDecryption}
            onSubmit={() => modify(selectedFile)}
            onCancel={() => onClearFile()}>
            <PasswordField
                password={masterPassword}
                setPassword={setMasterPassword}
                setPasswordValid={onValidatePasswordInput}
                placeholder="Enter Master/Current Password"
                errorText="" />
        </FileModify>
    );
}

export default FileDecryption;