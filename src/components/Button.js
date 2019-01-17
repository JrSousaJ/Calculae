import React from 'react'
import {
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight
} from 'react-native'

const styles = StyleSheet.create({
    button: {
        textAlign: 'center',
        marginTop: 0,
        fontSize: 20,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        height: Dimensions.get('window').width / 5,
        width: Dimensions.get('window').width / 4,
       //padding: 20,
        justifyContent:'center',
        backgroundColor: '#c6ecd9',
        borderWidth: 0.5,
        borderColor: '#ffffff',
        justifyContent:'space-between',

    },
    operationButton: {
        color: '#333333',
        backgroundColor: '#40bf80',
    },
    buttonMid: {
        width : (Dimensions.get('window').width / 4) / 2,
        color: '#333333',
        backgroundColor: '#40bf80',
    },
    buttonTriple: {
        width : (Dimensions.get('window').width / 4) * 3,
    }
    
})
export default props => {
    const stylesButton = [styles.button]
    if(props.operation) stylesButton.push(styles.operationButton)
    if(props.metade)stylesButton.push(styles.buttonMid)
    return (
        <TouchableHighlight onPress={() => props.onClick(props.label)}>
            <Text adjustsFontSizeToFit={true} style={stylesButton}>{props.label}</Text>
        </TouchableHighlight>
    )
}