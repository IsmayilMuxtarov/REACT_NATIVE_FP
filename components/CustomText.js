import React from 'react'
import { Text } from 'react-native'
import { FONT_FAMILIES } from '../styles/fonts'

export const CustomText = ({weight, children, style, ...rest}) => {
    const styles = {fontFamily: FONT_FAMILIES[weight],...style};
    return (
        <Text {...rest} style={styles}>
            {children}
        </Text>
    )
}

