import React, { JSX, useState,useEffect } from 'react';
import { Text, StyleSheet, View, Image, TextInput, Pressable, Platform, PermissionsAndroid } from 'react-native';

type Props = {
  onAddItem: (item: string) => void;
};

export default function ChecklistInputHandler({ onAddItem }: Props): JSX.Element {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = () => {
    if (text.trim() === '') return;
    onAddItem(text);
    setText('');
  };


  // Uncomment the following code to enable voice recognition functionality ------------------------------------------
  
  //----------------------PERMISSION---------------------------------
  // useEffect(() => {
  //   if(Platform.OS === 'android') {
  //     PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
  //   }
  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  //-----------------------SETTING TEXT------------------------------
  // useEffect(() => {
  //   Voice.onSpeechResults = (event) => {  
  //     const spokenResults = event.value?.[0];
  //     if(spokenResults) {
  //       setText(spokenResults);
  //       onAddItem(spokenResults);
  //     }
  //   }
  //   Voice.onSpeechError = (event) => {
  //     console.error('Speech recognition error:', event.error);
  //     setIsListening(false);
  //   }
  // }, []);

  //----------------------LISTNEING----------------------------------
  // const startLIstening = async () => {
  //   if (isListening) return;
  //   try {
  //     setIsListening(true);
  //     await Voice.start('en-US');
  //   } catch (error) {
  //     console.error('Error starting voice recognition:', error);
  //   }
  // };
  //--------------------------------------------------------------------------------------------------------------------------

  return (
    <View style={styles.wrapper}>
      <View style={styles.checklistContainer}>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Enter a task..."
          placeholderTextColor="#9CA3AF"
          onChangeText={setText}
          value={text}
        />
        <Pressable onPress={handleSubmit}>
          <View style={styles.addButton}>
            <Image
              source={require('../assets/plus-symbol-button.png')}
              style={styles.plusIcon}
            />
          </View>
        </Pressable>
        {/* <Pressable onPress={startLIstening} style={styles.micButton}>
        <Text style={styles.mic}>{isListening ? '🎙️' : '🎤'}</Text>
      </Pressable> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  checklistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  plusIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  micButton: {
    padding: 6,
  },
  mic: {
    fontSize: 24,
  },
});
