import { faLock } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';

const PasswordField = ({ password, setPassword, setPasswordValid, placeholder, errorText }) => {

    const onValueChanged = (value) => {
        setPassword(value);
        
        // handle if this property has not been set!
        if (!setPasswordValid) {
            return;
        }
        
        // todo; we want to have a way to add a validator
        if (value.length > 0) {
            setPasswordValid(true);
        }
        else {
            setPasswordValid(false);
        }
    };

    return (
        <div className="field">
            <div className="control">
                <input 
                    type="password"
                    className={(errorText.length > 0 ? "input is-danger is-medium" : "input is-medium")}  
                    placeholder={placeholder}
                    value={password}
                    onChange={(e) => onValueChanged(e.target.value)} 
                />
            </div>
            {errorText.length > 0 && (
                <p className="help is-danger">{errorText}</p>
            )}
        </div>
    );
}

const ConfirmPasswordFields = ({ password, setPassword, setPasswordMatch }) => {
    const isFirstRender = useRef(true);
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [confirmedPasswordErrorText, setConfirmedPasswordErrorText] = useState('');

    const onValidatePassword = () => {
        if (password === "") {
            setPasswordErrorText("Password is required.");
            return false;
        }
        else if (confirmedPassword === "") {
            setConfirmedPasswordErrorText("Please re-enter your password.");
            return false;
        }
        else if (password !== confirmedPassword) {
            setConfirmedPasswordErrorText("Passwords do not match!");
            return false;
        }
        else {
            setPasswordErrorText("");
            setConfirmedPasswordErrorText("");
            return true;
        }
    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setPasswordMatch(onValidatePassword());
    }, [password, confirmedPassword]);

    return (
        <>
            <PasswordField
                password={password}
                setPassword={setPassword}
                placeholder="Choose your Password"
                errorText={passwordErrorText}
            />
            <PasswordField 
                password={confirmedPassword}
                setPassword={setConfirmedPassword}
                placeholder="Confirm your Password"
                errorText={confirmedPasswordErrorText}
            />
        </>
    );
}

export default PasswordField;
export { ConfirmPasswordFields };