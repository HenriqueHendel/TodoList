import React, { useEffect, useState} from 'react';
import {SafeAreaView ,View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

import {Ionicons} from '@expo/vector-icons';

import Task from '../components/TaskList'

const AnimatedTouchableOpacity = Animatable.createAnimatableComponent(TouchableOpacity);
interface TaskProps {
    id: number
    name: string
}

const Home: React.FC = () => {
  const [modalVisibility, setModalVisibility] = useState(false)
  const [inputValue, setInputValue] = useState('');

  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(()=>{
      (async () => {
          const taskStorage = await AsyncStorage.getItem('@tasks');

          if(taskStorage){
              setTasks(JSON.parse(taskStorage))
          }
      })()
  }, [])

  useEffect(()=>{
    (async () => {
        await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    })()
}, [tasks])

  function handleAddTask() {
      if(inputValue.trim() === ''){
          alert('Informe uma tarefa!');
          return
      }
      let newTask;

      if(tasks.length >= 1){
        newTask = {id: tasks[tasks.length - 1].id + 1, name: inputValue};
      }else {
        newTask = {id: 1, name: inputValue};
      }

      setTasks([...tasks, newTask]);
      setInputValue('')
      setModalVisibility(false)
  }

  function handleCompleteTask(task_id: number){
    const tasksToDo = tasks.filter(task => task.id !== task_id);

    setTasks(tasksToDo);
  }

  return (
    <SafeAreaView style={styles.container} >
        <View style={styles.header}>
            <Text style={styles.title}>Minhas Tarefas</Text>
        </View>

        <FlatList 
            showsHorizontalScrollIndicator={false}
            style={{marginHorizontal: 10}}
            data={tasks}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => <Task handleCompleteTask={handleCompleteTask} data={item} /> }
        />

        <Modal animationType='slide' transparent={false}  visible={modalVisibility}  >
            <SafeAreaView style={styles.modal}>
                <View style={styles.modalHeader} >
                    <TouchableOpacity onPress={() => setModalVisibility(false)}>
                        <Ionicons style={{marginLeft: 5, marginRight: 5}} name='md-arrow-back' size={40} color='#FFF' />
                    </TouchableOpacity>

                    <Text style={styles.modalTitle} >Nova Tarefa</Text>
                </View>

                <Animatable.View style={styles.modalBody} animation='fadeInUp' useNativeDriver >
                    <TextInput 
                        style={styles.input} 
                        placeholder='O que preciso fazer hoje ?' 
                        multiline
                        autoCorrect={false}
                        placeholderTextColor='#747474'
                        value={inputValue}
                        onChangeText={value => setInputValue(value)}
                    />
                    
                    <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
                        <Text style={styles.addTaskText} >Cadastrar</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </SafeAreaView>
        </Modal>

        <AnimatedTouchableOpacity 
            style={styles.buttonToOpenModal}
            animation='bounceIn'
            duration={1500}
            useNativeDriver
            onPress={() => setModalVisibility(true)}
        >
            <Ionicons name='ios-add' size={35} color='#FFF' />
        </AnimatedTouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171d31'
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    title: {
        marginTop: 10,
        paddingBottom: 10,
        fontSize: 30,
        color: '#FFF'
    },
    buttonToOpenModal: {
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: '#0094FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        right:25,
        bottom:25,
        elevation: 2,
        zIndex: 9,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 3
        }
    },
    modal: {
        flex: 1,
        backgroundColor: '#171d31'
    },
    modalHeader: {
        marginLeft: 10,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalTitle: {
        marginLeft: 15,
        fontSize: 23,
        color: '#FFF'
    },
    modalBody: {
        marginTop: 15
    },
    input: {
        fontSize: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        backgroundColor: '#FFF',
        padding: 9,
        height: 85,
        textAlignVertical: 'top',
        color: '#000',
        borderRadius: 5
    },
    addTaskButton: {
        backgroundColor: '#FFF',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        borderRadius: 5
    },
    addTaskText: {
        fontSize: 25
    }
})
export default Home;