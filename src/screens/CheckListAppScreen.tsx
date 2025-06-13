import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Checklist from '../Components/Checklist';
import ChecklistInputHandler from '../Components/ChecklistInputHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, any>;

interface SubItems {
  text: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}

interface ChecklistItem {
  text: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
  subItems?: SubItems[];
}

function ChecklistApp({ route, navigation }: Props): React.JSX.Element {
  const { listName } = route.params;
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const STORAGE_KEY = `CHECKLIST_ITEMS_${listName}`;

  const saveItemsToStorage = async (items: ChecklistItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving items to storage:', error);
    }
  };

  const loadItemsFromStorage = async () => {
    try {
      const itemsString = await AsyncStorage.getItem(STORAGE_KEY);
      return itemsString ? JSON.parse(itemsString) : [];
    } catch (error) {
      console.error('Error loading items from storage:', error);
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      const storedItems = await loadItemsFromStorage();
      setItems(storedItems);
    })();
  }, []);

  const handleAddItem = (newItem: string) => {
    if (newItem.trim() === '') return;
    const newChecklistItem: ChecklistItem = {
      text: newItem,
      completed: false,
      createdAt: Date.now(),
      completedAt: undefined,
    };
    const updated = [...items, newChecklistItem];
    setItems(updated);
    saveItemsToStorage(updated);
  };

  const handleDelete = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    saveItemsToStorage(updated);
  };

  const handleComplete = (index: number) => {
    const updated = items.map((item, i) => {
      if (i === index) {
        const isNowCompleted = !item.completed;
        return {
          ...item,
          completed: isNowCompleted,
          completedAt: isNowCompleted ? Date.now() : undefined,
        };
      }
      return item;
    });
    setItems(updated);
    saveItemsToStorage(updated);
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 16, color: '#0ea5e9' }}>⬅ Back</Text>
      </TouchableOpacity>

      <Text style={styles.listNameHeader}>{listName}</Text>
      <ChecklistInputHandler onAddItem={handleAddItem} />
      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Checklist
            text={item.text}
            completed={item.completed}
            onDelete={() => handleDelete(index)}
            onComplete={() => handleComplete(index)}
            createdAt={item.createdAt}
            completedAt={item.completedAt}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
  },
  listNameHeader: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 16,
    color: '#1f2937',
  },
});

export default ChecklistApp;
