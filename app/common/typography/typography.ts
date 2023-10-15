import { TextStyle } from "react-native";

interface TypographyStyles {
    heading: TextStyle;
    subHeading: TextStyle;
    caption: TextStyle;
    title: TextStyle;
    subTitle: TextStyle;
  }

export const typographyStyles: TypographyStyles = {
    heading: {
      fontFamily: 'Roboto',
      fontWeight: '300', // Use string '300' instead of number 300
      fontSize: 30,
      lineHeight: 36, // You can specify the line height as a number
      letterSpacing: 0.25, // Use a number for letter spacing
    },
    subHeading: {
      fontFamily: 'Roboto',
      fontWeight: '300', // Use string '300' instead of number 300
      fontSize: 16,
      lineHeight: 16, // You can specify the line height as a number
      letterSpacing: 0.25, // Use a number for letter spacing
    },
    caption: {
      fontFamily: 'Roboto',
      fontWeight: '400', // Use string '400' instead of number 400
      fontSize: 14,
      lineHeight: 14, // You can specify the line height as a number
      letterSpacing: 0.25, // Use a number for letter spacing
    },
    title: {
      fontFamily: 'Roboto',
      fontWeight: '400', // Use string '400' instead of number 400
      fontSize: 16,
      lineHeight: 20, // You can specify the line height as a number
      letterSpacing: 0.25, // Use a number for letter spacing
    },
    subTitle: {
      fontFamily: 'Roboto',
      fontWeight: '400', // Use string '400' instead of number 400
      fontSize: 12,
      lineHeight: 16, // You can specify the line height as a number
      letterSpacing: 0.25, // Use a number for letter spacing
    },
  };
  