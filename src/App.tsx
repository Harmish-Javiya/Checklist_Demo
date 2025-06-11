import React, { useEffect, useState } from 'react';

import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Checklist from './Components/Checklist';
import ChecklistInputHandler from './Components/ChecklistInputHandler';

//Features Imported
import AsyncSroeage from '@react-native-async-storage/async-storage';


interface ChecklistItem {
  text: string;
  completed: boolean;
}

// App Component
function App(): React.JSX.Element {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  
  const STORAGE_KEY = 'CHECKLIST_ITEMS';

  const saveItemsToStorage = async (items: ChecklistItem[]) => {
    try {
      await AsyncSroeage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
    console.error('Error saving items to storage:', error);
    return []; 
    }
  }

  const loadItemsFromStorage = async () => {
    try{
      const itemsString = await AsyncSroeage.getItem(STORAGE_KEY);
      return itemsString ? JSON.parse(itemsString) : [];
    }catch (error) {
      console.error('Error loading items from storage:', error);
      return []; 
    }
  }

  useEffect(() => {
    (async () => {
      const storedItems = await loadItemsFromStorage();
      setItems(storedItems);
    })();
  }, []);

  const handleAddItem = (newItem : string) =>{
    if(newItem.trim() === '') {
      console.log('Item cannot be empty');
      return;
    }else{
      const updated = [...items, {text: newItem, completed: false }];
      setItems(updated);
      saveItemsToStorage(updated);
    }
  }

  const handleDelete = (index: number) => { 
    const updated = items.filter((_, i) => i !== index)
    setItems(updated);
    saveItemsToStorage(updated);
  }

  const handleComplete = (index: number) => {
    const updated = items.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
    );

    setItems(updated);  
    saveItemsToStorage(updated); 
  };
  

  return (
    <SafeAreaView style={styles.container}>
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
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: '#F9FAFB',
  },
});

export default App;
