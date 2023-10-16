import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#13121A',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    wrapper: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 5,
        gap: 15
    },
    input: {
        display: "flex",

        maxWidth: 300,
        borderRadius: 10,
        width: '100%',
    },
    h3Styles: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150,
        marginBottom: 50,
        fontSize: 30,
        color: '#39FF14',
        fontWeight: "700"
    },
    h5Styles: {
        fontSize: 18,
        color: '#39FF14',
        fontWeight: "700"
    },
    h6Styles: {
        fontSize: 20,
        color: 'black',
        fontWeight: "700"
    },
    h5Container: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        height: 50,
        backgroundColor: '#13121A',
        borderRadius: 5
    },
    passwordStrength: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
});
