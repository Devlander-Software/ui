import { View, ViewStyle, StyleSheet } from 'react-native'
import React from 'react'

export interface DotProps {
    active: boolean,
    activeStyle?: ViewStyle,
    inactiveStyle?: ViewStyle,
}

function Dot(props: DotProps) {
    const { activeStyle, inactiveStyle, active } = props;
    return (
        <View>
            <View style={[
                styles.dot, 
                active ? [styles.activeDot, activeStyle] : [styles.inactiveDot, inactiveStyle]
            ]} />
        </View>
    )
}

const styles = StyleSheet.create({
    dot: {
        marginHorizontal: 5,
        width: 7,
        height: 7,
        borderRadius: 3.5,
    },
    activeDot: {
        backgroundColor: 'white',
    },
    inactiveDot: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
});

export default Dot