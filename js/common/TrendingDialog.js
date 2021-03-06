import React, { Component } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TimeSpan from '../model/TimeSpan'

export const TimeSpans = [
    new TimeSpan('今天', 'since=daily'),
    new TimeSpan('本周', 'since=weekly'),
    new TimeSpan('本月', 'since=monthly'),
]

export default class TrendingDialog extends Component {

    state = {
        visible: false
    }

    show = () => {
        this.setState({ visible: true })
    }

    dismiss = () => {
        this.setState({ visible: false })
    }

    render() {
        const { onClose, onSelect } = this.props
        return (
            <Modal
                transparent={true}
                visible={this.state.visible}
                onRequestClose={onClose}
            >
                <TouchableOpacity
                    style={styles.mask}
                    onPress={() => {
                        this.dismiss()
                    }}
                >
                    <MaterialIcons
                        name="arrow-drop-up"
                        size={36}
                        style={styles.arrow}
                    />
                    <View style={styles.content}>
                        {TimeSpans.map((item, index) => {
                            return <TouchableOpacity
                                key={'timespan' + index}
                                underlayColor='transparent'
                                onPress={() => onSelect(item)}>
                                <View style={styles.text_container}>
                                    <Text style={styles.text}>{item.showText}</Text>
                                    {
                                        index !== TimeSpans.length - 1
                                            ? <View style={styles.line}></View>
                                            : null
                                    }
                                </View>
                            </TouchableOpacity>
                        })}
                    </View>
                </TouchableOpacity>
            </Modal >
        )
    }
}



const styles = StyleSheet.create({
    mask: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        alignItems: 'center',
    },
    arrow: {
        ...Platform.select({
            ios: {
                marginTop: 70
            },
            android: {
                marginTop: 30
            }
        }),
        color: 'white',
        padding: 0,
        margin: -15
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        // marginRight: 3

    },
    text_container: {
        alignItems: 'center',
        flexDirection: 'column'
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
        padding: 8,
        paddingLeft: 26,
        paddingRight: 26
    },
    line: {
        height: 0.3,
        width: '100%',
        backgroundColor: 'grey'
    }
})