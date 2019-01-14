import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

const styles = StyleSheet.create({
    display: {
        flex: 1,
        padding: 20,
        justifyContent : 'center',
        backgroundColor: '#e6ffe6',
        alignItems: 'flex-end',
    },
    displayValue: {
        fontSize: 50,
        color :'#000000',
    }
})

export default props =>
    <View style={styles.display}>
        <Text style={styles.displayValue} numberOfLines={1}>{props.value}</Text>
    </View>