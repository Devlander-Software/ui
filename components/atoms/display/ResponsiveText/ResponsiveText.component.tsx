// ResponsiveText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {useResponsive} from '@devlander/hooks';

interface FontSizeRange {
  min: number;
  max: number;
}

interface ResponsiveTextProps {
  children: React.ReactNode;
  fontSizeRange?: {
    xs?: FontSizeRange;
    sm?: FontSizeRange;
    md?: FontSizeRange;
    lg?: FontSizeRange;
    xl?: FontSizeRange;
  };
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({ children, fontSizeRange }) => {
  const { sizeCategory, getResponsiveValue } = useResponsive() as { sizeCategory: keyof typeof defaultFontSizeRange, getResponsiveValue: (range: FontSizeRange, category: string) => number };

  // Define a default fontSizeRange if not provided
  const defaultFontSizeRange = {
    xs: { min: 12, max: 14 },
    sm: { min: 14, max: 16 },
    md: { min: 16, max: 18 },
    lg: { min: 18, max: 20 },
    xl: { min: 20, max: 24 },
  };

  // Use either the provided fontSizeRange or the default
  const responsiveFontSize = getResponsiveValue(
    fontSizeRange?.[sizeCategory] || defaultFontSizeRange[sizeCategory],
    sizeCategory
  );

  const styles = StyleSheet.create({
    text: {
      fontSize: responsiveFontSize,
      padding: 10,
    },
  });

  return <Text style={styles.text}>{children}</Text>;
};

export default ResponsiveText;
