
import React from 'react';
import { View, Text } from 'react-native';
import Carousel from '.';

export default {
  title: 'components/organisms/Carousel',

  component: Carousel,
};



const slides = [
  { content: <View ><Text>Slide 1</Text></View> },
  { content: <View ><Text>Slide 2</Text></View> },
  { content: <View ><Text>Slide 3</Text></View> },
];

export const OneSlidePerPage = {
  render: () => <Carousel slides={slides} 
  slidesPerPage={1}
  />,
args: {
  slidesPerPage: 1,
    dotStyles: {
      activeStyle: { backgroundColor: 'blue' },
      inactiveStyle: { backgroundColor: 'gray' },
    },
  },

}



export const ThreeSlidesPerPage = {
  render: () => <Carousel slides={slides} 
  slidesPerPage={3}
  />,
args: {
  slidesPerPage: 3,
    dotStyles: {
      activeStyle: { backgroundColor: 'blue' },
      inactiveStyle: { backgroundColor: 'gray' },
    },
  },

}
     