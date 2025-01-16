import React from 'react';
import { View } from 'react-native';
import Dot from './Dot.component';

export default {
  title: 'components/organisms/Carousel/Dot',
  component: Dot,
};

export const ActiveDot = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Dot active={true} activeStyle={{ backgroundColor: 'blue' }} />
    </View>
  ),
};

export const InactiveDot = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Dot active={false} inactiveStyle={{ backgroundColor: 'gray' }} />
    </View>
  ),
};

export const CustomStyledDots = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Dot active={true} activeStyle={{ backgroundColor: 'green', width: 10, height: 10 }} />
      <Dot active={false} inactiveStyle={{ backgroundColor: 'red', width: 10, height: 10 }} />
    </View>
  ),
};
