import React, { JSX, useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TextInput, Pressable, Platform, PermissionsAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
      <LinearGradient
        colors={['#374151', '#1f2937']}
        style={styles.checklistContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      >
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Enter a task..."
          placeholderTextColor="#9CA3AF"
          onChangeText={setText}
          value={text}
        />
        <Pressable onPress={handleSubmit} style={styles.addButtonWrapper}>
          <LinearGradient
            colors={['#10b981', '#059669']}
            style={styles.addButton}
          >
            <Image
              source={require('../assets/plus-symbol-button.png')}
              style={styles.plusIcon}
            />
          </LinearGradient>
        </Pressable>
        {/* <Pressable onPress={startLIstening} style={styles.micButton}>
        <Text style={styles.mic}>{isListening ? '🎙️' : '🎤'}</Text>
      </Pressable> */}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: 12,
    paddingBottom: 20,
    paddingTop: 8,
  },
  checklistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  input: {
    flex: 1,
    height: 52,
    backgroundColor: '#1f2937',
    borderRadius: 16,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#f9fafb',
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  addButtonWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    marginLeft: 12,
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
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