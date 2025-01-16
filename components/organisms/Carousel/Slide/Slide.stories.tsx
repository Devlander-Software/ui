import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Slide from './Slide.component';

export default {
    title: 'components/organisms/Carousel/Slide',
    component: Slide,
};

export const DefaultSlide = {
  render: () => (
    <Slide
      onPress={() => console.log('Slide pressed')}
      content={<Text style={styles.text}>Default Slide</Text>}
    />
  ),
};

export const CustomStyledSlide = {
  render: () => (
    <Slide
      onPress={() => console.log('Custom Slide pressed')}
      style={styles.customSlide}
      content={<Text style={styles.text}>Custom Styled Slide</Text>}
    />
  ),
};

export const DisabledSlide = {
  render: () => (
    <Slide
      onPress={() => console.log('This should not trigger')}
      disabled={true}
      content={<Text style={styles.text}>Disabled Slide</Text>}
    />
  ),
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
  },
  customSlide: {
    backgroundColor: 'blue',
    width: 300,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});
