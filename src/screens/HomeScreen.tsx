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
      colors={item.completed ? ['#0f0f0f', '#1a1a1a', '#0f0f0f'] : ['#1a1a1a', '#2a2a2a', '#1a1a1a']}
      style={[styles.listItem, item.completed && styles.completedItem]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
    >
      {/* Grain overlay */}
      <View style={styles.grainOverlay} />
      
      <TouchableOpacity
        onPress={() => handleSelectList(item)}
        style={styles.itemContent}
      >
        <View style={styles.itemIcon}>
          <LinearGradient
            colors={['#2a2a2a', '#3a3a3a', '#2a2a2a']}
            style={styles.iconGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          >
            <Text style={styles.iconText}>
              {item.type === 'checklist' ? '📝' : '✅'}
            </Text>
          </LinearGradient>
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
            fillColor="#00d4aa"
            iconStyle={{ borderColor: '#00d4aa', borderRadius: 8, borderWidth: 2 }}
            innerIconStyle={{ borderRadius: 6 }}
            size={28}
            style={styles.checkbox}
          />
        )}
        <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
          <LinearGradient
            colors={['#ff4757', '#ff3742', '#ff2f3a']}
            style={styles.deleteButtonGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
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
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <LinearGradient
        colors={['#0a0a0a', '#1a1a1a', '#0a0a0a']}
        style={styles.background}
      />
      
      {/* Grain overlay */}
      <View style={styles.grainOverlay} />
      
      <View style={styles.header}>
        <Text style={styles.heading}>Your Lists & Tasks</Text>
        <Text style={styles.subtitle}>Organize your productivity with style</Text>
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
          colors={['#4c6ef5', '#364fc7', '#2f3ab2']}
          style={styles.footerBtnInner}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
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
    backgroundColor: '#0a0a0a' 
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  heading: { 
    fontSize: 36, 
    fontWeight: '800', 
    color: '#f8f9fa',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: '#8e9aaf',
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  listItem: {
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#333333',
    overflow: 'hidden',
    position: 'relative',
  },
  completedItem: {
    opacity: 0.7,
    borderColor: '#1a1a1a',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    position: 'relative',
    zIndex: 1,
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    marginRight: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#404040',
  },
  iconText: {
    fontSize: 20,
  },
  listText: { 
    fontSize: 19, 
    color: '#f8f9fa',
    fontWeight: '600',
    flex: 1,
    letterSpacing: 0.3,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
    opacity: 0.8,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 16,
    justifyContent: 'flex-end',
    position: 'relative',
    zIndex: 1,
  },
  checkbox: {
    marginLeft: 0,
  },
  deleteButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#ff4757',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  deleteButtonGradient: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    width: 22,
    height: 22,
    tintColor: '#ffffff',
  },
  footerBtn: {
    position: 'absolute',
    right: 28,
    bottom: 28,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#4c6ef5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  footerBtnInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 32,
    marginBottom: 2,
  },
});