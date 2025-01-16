import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import ReplaceableTouchable from '../../../atoms/inputs/ReplaceableTouchable';

export interface SlideProps {
  onPress: () => void; // Function to handle press
  testID?: string; // Optional test ID for testing
  disabled?: boolean; // Disable the slide's touchable behavior
  content?: React.ReactNode; // Optional content to render
  TouchableComponent?: React.ComponentType<any>; // Custom Touchable component
  style?: ViewStyle; // Custom styling for the slide
}

const Slide: React.FC<SlideProps> = ({
  onPress,
  testID = '',
  style,
  disabled,
  content,
  TouchableComponent,
}) => {
  return (
    <ReplaceableTouchable
      testID={testID}
      style={[styles.slide, style]}
      TouchableComponent={TouchableComponent} // Pass custom touchable
      onPress={onPress}
      disabled={disabled}
    >
      {content || null} 
    </ReplaceableTouchable>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: 320,
    height: 160,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default Slide;
