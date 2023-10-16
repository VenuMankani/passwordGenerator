import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

interface PasswordProps {
    password: string;
}
const PasswordStrengthChecker = ({ password }: PasswordProps) => {
    const [color, setColor] = useState<string>("");

    const isPasswordValid = (password: string) => {
        // Check for the password conditions
        const lengthValid = password.length >= 10;
        const letterValid = /[a-zA-Z]/.test(password);
        const numberValid = /[0-9]/.test(password);
        const specialCharacterValid = /[!@#$%^&*]/.test(password);

        return lengthValid && letterValid && numberValid && specialCharacterValid;
    };

    const getPasswordStrengthMessage = (password: string) => {
        if (isPasswordValid(password)) {
            return 'Perfect';
        }

        if (password.length >= 10) {
            return 'Strong';
        }

        if (password.length < 8 && password.length > 1) {
            return 'Weak';
        }

        if (/[a-zA-Z]/.test(password)) {
            return 'Good';
        }

        return 'Enter Password';
    };

    useEffect(() => {
        // const strengthMessage = getPasswordStrengthMessage(password);

        if (isPasswordValid(password)) {
            setColor('green');
        } else if (password.length >= 10) {
            setColor('orange');
        } else if (password.length < 8 && password.length > 1) {
            setColor('red');
        } else if (/[a-zA-Z]/.test(password)) {
            setColor('yellow');
        } else {
            setColor('');
        }
    }, [password]);

    const strengthMessage = getPasswordStrengthMessage(password);

    return (
        <View>
            <Text style={{ color: color || 'black' }}>{strengthMessage}</Text>
        </View>
    );
};

export default PasswordStrengthChecker;
