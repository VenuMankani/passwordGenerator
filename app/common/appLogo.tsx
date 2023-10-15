import React from "react";
import { View, Image, ImageSourcePropType, Text } from "react-native";
import Logo from '../../assets/images/appLogo.jpg';
import { typographyStyles } from "./typography/typography";



const AppLogo: React.FC = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'black' }}>
                <Image
                    source={Logo as ImageSourcePropType}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <View style={{ alignItems: "center", backgroundColor: 'black', margin: 10 }}>
                <Text style={{ ...typographyStyles.subTitle, color: 'gray' }}>Version 1.0.0</Text>
            </View>
        </View>
    );
};

export default AppLogo;
