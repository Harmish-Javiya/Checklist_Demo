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
import LinearGradient from 'react-native-linear-gradient';
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
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <LinearGradient
        colors={['#111827', '#1f2937', '#111827']}
        style={styles.background}
      />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <LinearGradient
            colors={['#374151', '#1f2937']}
            style={styles.backButtonGradient}
          >
            <Text style={styles.backText}>← Back</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.listNameHeader}>{listName}</Text>
      </View>

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
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  backButtonGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  backText: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: '600',
  },
  listNameHeader: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#f9fafb',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});

export default ChecklistApp;