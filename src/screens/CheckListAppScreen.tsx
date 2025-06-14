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
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <LinearGradient
        colors={['#0a0a0a', '#1a1a1a', '#0a0a0a']}
        style={styles.background}
      />
      
      {/* Grain overlay */}
      <View style={styles.grainOverlay} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <LinearGradient
            colors={['#1a1a1a', '#2a2a2a', '#1a1a1a']}
            style={styles.backButtonGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          >
            <View style={styles.grainOverlaySmall} />
            <Text style={styles.backText}>← Back</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.listNameHeader}>{listName}</Text>
        <Text style={styles.subtitle}>Manage your checklist items</Text>
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
    backgroundColor: '#0a0a0a',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  grainOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.03,
    shadowColor: '#fff',
    shadowOpacity: 0.02,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 1,
  },
  grainOverlaySmall: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.03,
    shadowColor: '#fff',
    shadowOpacity: 0.02,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    position: 'relative',
    zIndex: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  backButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333333',
    position: 'relative',
  },
  backText: {
    fontSize: 17,
    color: '#00d4aa',
    fontWeight: '600',
    letterSpacing: 0.3,
    position: 'relative',
    zIndex: 1,
  },
  listNameHeader: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    color: '#f8f9fa',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8e9aaf',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
});

export default ChecklistApp;