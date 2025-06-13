import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import BouncyCheckBox from 'react-native-bouncy-checkbox';

type Props = NativeStackScreenProps<any, any>;

interface ListItem {
  name: string;
  type: 'task' | 'checklist';
  completed?: boolean
}

const STORAGE_KEY = 'ALL_ITEMS';

export default function HomeScreen({ navigation }: Props) {
  const [items, setItems] = useState<ListItem[]>([]);
  const isFocused = useIsFocused();
  const route = useRoute();

  useEffect(() => {
    if (isFocused) {
      handleRefresh();
    }
  }, [isFocused]);

  const handleRefresh = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      let parsedItems: ListItem[] = stored ? JSON.parse(stored) : [];
  
      const newItem = (route.params as any)?.newItem;
  
      if (newItem) {
        navigation.setParams({ newItem: null });
  
        const isDuplicate = parsedItems.some(
          item => item.name === newItem.name && item.type === newItem.type
        );
        if (!isDuplicate) {
          parsedItems.push(newItem);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsedItems));
        }
      }
  
      setItems(parsedItems);
    } catch (err) {
      console.error('Failed to load or append items', err);
    }
  };
  

  const handleDelete = async (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleComplete = async (index:number) => {
    const updated = [...items];
    const item = updated[index];
    if (item.type == 'task'){
      item.completed = !item.completed;
      setItems(updated);
      await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(updated))
    }

  }

  const handleSelectList = (item: ListItem) => {
    if (item.type === 'checklist') {
      navigation.navigate('ChecklistApp', { listName: item.name });
    } else {
      Alert.alert('Task', `Task: ${item.name}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Your Lists & Tasks</Text>

      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <TouchableOpacity
              onPress={() => handleSelectList(item)}
            >
              <Text style={[
                  styles.listText,
                  item.completed && { textDecorationLine: 'line-through', color: '#9ca3af' },
              ]}>
                {item.type === 'checklist' ? '📝' : '✅'} {item.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(index)}>
              <Image source = {require('../assets/deleteIcon/icons8-delete-96.png')} style = {styles.deleteIcon}/>
            </TouchableOpacity>
            {item.type === 'task' && (
            <BouncyCheckBox
              isChecked={item.completed}
              onPress={() => handleComplete(index)}
              fillColor="#10b981"
              iconStyle={{ borderColor: '#10b981' }}
              size={24}
            />
            
          )}
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.footerBtn}
        onPress={() => navigation.navigate('AddScreen')}
      >
        <View style={styles.footerBtnInner}>
          <Text style={styles.footerBtnText}>+</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  heading: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  listItem: {
    backgroundColor: '#e5e7eb',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  listText: { fontSize: 18, color: '#111827' },
  deleteText: { fontSize: 18, paddingHorizontal: 8, color: '#ef4444' },
  footerBtn: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    elevation: 5,
  },
  footerBtnInner: {
    backgroundColor: '#0d99f2',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  footerBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 2,
  },
  deleteIcon:{
    width:24,
    height:24,
  },
  BDContainer:{}
});
