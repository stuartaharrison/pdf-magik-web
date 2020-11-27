import React, { useContext, useState } from 'react';
import FileModify from './FileModify';
import FileModifyFailure from './FileModifyFailure';
import FileModifySuccess from './FileModifySuccess';
import { ConfirmPasswordFields } from './PasswordField';
import { PdfContext } from '../context/pdf/pdfState';

const FileEncryption = ({ selectedFile, setSelectedFile }) => {
    const { error, result, loading, clearResult, modify } = useContext(PdfContext);
    const [encryptionPassword, setEncryptionPassword] = useState('');
    const [canSubmitEncryption, setCanSubmitEncryption] = useState(false);

    const onClearFile = () => {
        clearResult();
        setSelectedFile(null);
    }

    const onValidatePasswordInput = (isValid) => {
        if (isValid === true) {
            setSelectedFile({
                ...selectedFile,
                NewPassword: encryptionPassword
            });
        }
        setCanSubmitEncryption(isValid);
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
            modifyButtonText="Encrypt another file"
        />);
    }

    return (
        <FileModify
            selectedFile={selectedFile}
            buttonText="Encrypt Now!"
            isLoading={loading}
            canSubmit={canSubmitEncryption}
            onSubmit={() => modify(selectedFile)}
            onCancel={() => onClearFile()}>
            <ConfirmPasswordFields
                password={encryptionPassword}
                setPassword={setEncryptionPassword}
                setPasswordMatch={onValidatePasswordInput}
            />
        </FileModify>
    );
}

export default FileEncryption;