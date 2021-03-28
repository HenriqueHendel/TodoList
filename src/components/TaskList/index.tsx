import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable';

import {TaskInterface} from '../../interfaces/Task';

interface TaskProps {
    data: TaskInterface,
    handleCompleteTask: (task_id: number) => void
}

const Task: React.FC<TaskProps> = ({data, handleCompleteTask}) => {
    return (
        <Animatable.View 
            style={styles.container} 
            animation='bounceIn'
            useNativeDriver
        >
            <TouchableOpacity onPress={() => handleCompleteTask(data.id)} >
                <Ionicons name='md-checkmark-circle' size={30} color='#121212'   />
            </TouchableOpacity>
            <Text style={styles.task} >{data.name}</Text>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 7,
        elevation: 1.5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 3
        }
    },
    task: {
        color: '#121212',
        fontSize: 20,
        paddingLeft: 8,
        paddingRight: 20
    }
})

export default Task