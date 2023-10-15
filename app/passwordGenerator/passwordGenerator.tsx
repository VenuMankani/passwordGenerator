import React, { useState, useEffect } from 'react'
import { FlatList, ScrollView, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { styles } from './passwordGenerator-style'
import { Input, Icon, Text, Slider, Button, BottomSheet } from '@rneui/themed';
import { CheckBox, Dialog, ListItem, color } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Pressable } from 'react-native';
import Modal from "react-native-modal";
import Clipboard from '@react-native-clipboard/clipboard';
import { Snackbar } from 'react-native-paper';

const PasswordGenerator = () => {

    const [appName, setAppName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [appNameError, setAppNameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [isVisible, setIsVisible] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [passwordList, setPasswordList] = useState<any>([]);
    const [showSnacbar, setShowSnackBar] = useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = useState<string>('')
    const [selectedApp, setSelectedApp] = useState<string>('');
    const [selectedPassword, setSelectedPassword] = useState<string>('');

    async function logPasswords() {
        try {
            const passwordsList: any = await AsyncStorage.getItem("passwords");
            console.log("passwords", JSON.parse(passwordsList));
        } catch (error) {
            console.error("Error retrieving passwords:", error);
        }
    }


    console.log({ passwordList });


    const handleSave = async () => {
        if (validateInputs()) {
            try {
                const appPassword = { app: appName, password };

                // Retrieve existing passwords from AsyncStorage
                const existingPasswordsString = await AsyncStorage.getItem("passwords");
                const existingPasswords = existingPasswordsString ? JSON.parse(existingPasswordsString) : [];

                // Combine existing passwords with the new one
                const updatedPasswords = [...existingPasswords, appPassword];

                // Save the updated passwords array to AsyncStorage
                await AsyncStorage.setItem("passwords", JSON.stringify(updatedPasswords));
                setPasswordList(updatedPasswords);
                logPasswords();
                setSnackBarMessage("SAVED  ✔");
                setShowSnackBar(true);
                console.log("saved", appName, password);
            } catch (error) {
                console.log(error);
            }
            setAppName("");
            setPassword("");
        }
    };

    useEffect(() => {
        logPasswords();

        AsyncStorage.getItem("passwords")
            .then((passwords1: any) => {
                setPasswordList(JSON.parse(passwords1));
            })
            .catch(error => {
                console.error("Error retrieving passwords:", error);
            });
    }, [])

    const generatePassword = () => {
        const generateRandomChar = (min: any, max: any) => {
            const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
            const charIndex = Math.floor(Math.random() * (max - min + 1)) + min;
            return charSet[charIndex];
        }

        const generateRandomPassword: any = () => {
            const passwordLength = 12;
            let password = '';
            let hasUppercase = false;
            let hasSpecialChar = false;
            let hasNumber = false;

            for (let i = 0; i < passwordLength; i++) {
                const char = generateRandomChar(0, 73); // Generate from all characters

                if (!hasUppercase && /[A-Z]/.test(char)) {
                    hasUppercase = true;
                }

                if (!hasSpecialChar && /[^a-zA-Z0-9]/.test(char)) {
                    hasSpecialChar = true;
                }

                if (!hasNumber && /[0-9]/.test(char)) {
                    hasNumber = true;
                }

                password += char;
            }

            if (!hasUppercase || !hasSpecialChar || !hasNumber) {
                // Regenerate the password if it doesn't meet the criteria
                return generateRandomPassword();
            }

            return password;
        }

        const generatedPassword = generateRandomPassword();
        setPassword(generatedPassword);
        setPasswordError('');
    }


    const validateInputs = () => {
        let isValid = true;

        // Validate App Name
        if (!appName.trim()) {
            setAppNameError('Enter App name to proceed!');
            isValid = false;
        } else {
            setAppNameError('');
        }

        // Validate Password
        if (!password.trim()) {
            setPasswordError('Enter Password to proceed!');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const showPasswordList = () => {
        if (passwordList === null) {
            setIsVisible(false);
            console.log("No Passowrds in the List")
        } else {
            setIsVisible(true);
        }
    }

    const handleListClick = (item: any) => {
        setSelectedApp(item.app);
        setSelectedPassword(item.password);
        setOpenModal(true);
    }

    const renderListItem = ({ item }: { item: any }) => (
        <View style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button type='clear' onPress={() => handleListClick(item)}><Text>{item.app}</Text></Button>
        </View>
    );

    const handleCopyButtonClick = () => {
        // Find the password for the selected app
        const selectedAppName = passwordList.find((passwordItem: any) => passwordItem.app === selectedApp);

        if (selectedAppName) {
            // Copy the password (use your copy-to-clipboard logic here)
            Clipboard.setString(selectedAppName.password);
            setShowSnackBar(true);
            setIsVisible(false);
            setSnackBarMessage("COPIED ✔")
            console.log("Copying password:", selectedAppName.password);
        }

        // Close the modal
        setOpenModal(false);
    };


    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.h3Styles}>Password Generator</Text>
                <View style={styles.input}>
                    <Input
                        value={appName}
                        placeholder="Enter App"
                        errorStyle={{ color: 'red' }}
                        errorMessage={appNameError}
                        onChangeText={(value: string) => {
                            setAppName(value)
                            setAppNameError('')
                        }}
                        inputStyle={{
                            color: 'white'
                        }}
                    />
                </View>
                <View style={styles.input}>
                    <Input
                        value={password}
                        placeholder="Enter Password"
                        errorStyle={{ color: 'red' }}
                        errorMessage={passwordError}
                        onChangeText={(value: string) => {
                            setPassword(value)
                            setPasswordError('')
                        }}
                        inputStyle={{
                            color: 'white'
                        }}
                    />
                    <PasswordStrengthBar
                        minLength={8}
                        scoreWords={['short', 'Are you kidding me?!', 'Meh!', 'good', 'Perfect']}
                        password={password} />
                </View>
                <View style={styles.input}>
                    <Pressable style={{ ...styles.h5Container, backgroundColor: '#39FF14' }} onPress={handleSave}>
                        <Text style={{ ...styles.h5Styles, color: 'black' }}>SAVE</Text>
                    </Pressable>
                    <Pressable style={styles.h5Container} onPress={generatePassword}>
                        <Text style={styles.h5Styles}>Generate for Me</Text>
                    </Pressable>
                </View>
                <Button type='clear' onPress={showPasswordList}>
                    <Text style={{ ...styles.h5Styles, color: '#39FF14' }}>My Passwords</Text>
                </Button>

                <Modal
                    isVisible={isVisible}
                    onBackdropPress={() => setIsVisible(false)}
                    // style={styles.modal}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    onSwipeComplete={() => setIsVisible(false)}
                    swipeDirection={'down'}
                    backdropOpacity={0}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, maxHeight: '50%' }}>
                            <FlatList
                                data={passwordList}
                                renderItem={renderListItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </Modal>

                <Dialog
                    isVisible={openModal}
                    onBackdropPress={() => setOpenModal(false)}
                    overlayStyle={{
                        borderRadius: 10,
                        backgroundColor: '#F5F5F5'
                    }}
                >
                    <Dialog.Title title={selectedApp} />
                    <Text>
                        {selectedPassword}
                    </Text>
                    <Dialog.Actions>
                        <Dialog.Button title="COPY" onPress={handleCopyButtonClick} />
                        <Dialog.Button title="CANCEL" onPress={() => setOpenModal(false)} />
                    </Dialog.Actions>
                </Dialog>

                <Snackbar
                    visible={showSnacbar}
                    duration={1000}
                    onDismiss={() => setShowSnackBar(false)}
                    style={{
                        backgroundColor: 'green'
                    }}
                >
                    <Text style={{ color: 'white' }}>{snackBarMessage}</Text>
                </Snackbar>
            </View>
        </View>
    )
}

export default PasswordGenerator;
