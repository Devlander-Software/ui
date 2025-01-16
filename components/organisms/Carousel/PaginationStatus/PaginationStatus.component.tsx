import React from 'react'
import Dot from '../Dot/Dot.component';
import { View, ViewStyle, StyleSheet } from 'react-native';

export interface PaginationStatusAsDotsProps {
  activeIndex: number;
  totalItems: number;
  dotStyles?: {
    activeStyle?: ViewStyle;
    inactiveStyle?: ViewStyle;
  }
}

function PaginationStatus(props: PaginationStatusAsDotsProps) {
  const { activeIndex, totalItems, dotStyles } = props;
  const { activeStyle, inactiveStyle } = dotStyles || {};

  const dots = Array.from({ length: totalItems }, (_, index) => (
    <Dot 
      active={index === activeIndex} 
      activeStyle={activeStyle}
      inactiveStyle={inactiveStyle}
    /> 
  ));

  return (

    <View style={[styles.dotContainer]} >\
      {dots}
    </View>
  )
}

export default PaginationStatus;
const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
})