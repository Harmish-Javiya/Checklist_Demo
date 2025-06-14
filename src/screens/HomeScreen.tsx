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
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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

  const handleComplete = async (index: number) => {
    const updated = [...items];
    const item = updated[index];
    if (item.type == 'task'){
      item.completed = !item.completed;
      setItems(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
  }

  const handleSelectList = (item: ListItem) => {
    if (item.type === 'checklist') {
      navigation.navigate('ChecklistApp', { listName: item.name });
    } else {
      Alert.alert('Task', `Task: ${item.name}`);
    }
  };

  const renderItem = ({ item, index }: { item: ListItem; index: number }) => (
    <LinearGradient
      colors={item.completed ? ['#1f2937', '#111827'] : ['#374151', '#1f2937']}
      style={styles.listItem}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
    >
      <TouchableOpacity
        onPress={() => handleSelectList(item)}
        style={styles.itemContent}
      >
        <View style={styles.itemIcon}>
          <Text style={styles.iconText}>
            {item.type === 'checklist' ? '📝' : '✅'}
          </Text>
        </View>
        <Text style={[
          styles.listText,
          item.completed && styles.completedText,
        ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.itemActions}>
        {item.type === 'task' && (
          <BouncyCheckBox
            isChecked={item.completed}
            onPress={() => handleComplete(index)}
            fillColor="#10b981"
            iconStyle={{ borderColor: '#10b981', borderRadius: 6 }}
            innerIconStyle={{ borderRadius: 6 }}
            size={24}
            style={styles.checkbox}
          />
        )}
        <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
          <LinearGradient
            colors={['#ef4444', '#dc2626']}
            style={styles.deleteButtonGradient}
          >
            <Image 
              source={require('../assets/deleteIcon/icons8-delete-96.png')} 
              style={styles.deleteIcon}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <LinearGradient
        colors={['#111827', '#1f2937', '#111827']}
        style={styles.background}
      />
      
      <View style={styles.header}>
        <Text style={styles.heading}>Your Lists & Tasks</Text>
        <Text style={styles.subtitle}>Organize your productivity</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.footerBtn}
        onPress={() => navigation.navigate('AddScreen')}
      >
        <LinearGradient
          colors={['#3b82f6', '#2563eb']}
          style={styles.footerBtnInner}
        >
          <Text style={styles.footerBtnText}>+</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#111827' 
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  heading: { 
    fontSize: 32, 
    fontWeight: '700', 
    color: '#f9fafb',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    marginTop: 4,
    fontStyle: 'italic',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  listItem: {
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#4b5563',
    overflow: 'hidden',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 18,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#1f2937',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  iconText: {
    fontSize: 18,
  },
  listText: { 
    fontSize: 18, 
    color: '#f9fafb',
    fontWeight: '600',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
    opacity: 0.7,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 18,
    paddingBottom: 18,
    gap: 12,
  },
  checkbox: {
    marginLeft: 0,
  },
  deleteButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  deleteButtonGradient: {
    padding: 8,
    borderRadius: 8,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: '#ffffff',
  },
  footerBtn: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  footerBtnInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 2,
  },
});