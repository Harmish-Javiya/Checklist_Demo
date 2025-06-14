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
        colors={['#1a1a1a', '#2a2a2a', '#1a1a1a']}
        style={styles.checklistContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      >
        {/* Grain overlay */}
        <View style={styles.grainOverlay} />
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Enter a task..."
            placeholderTextColor="#6c757d"
            onChangeText={setText}
            value={text}
          />
          <Pressable onPress={handleSubmit} style={styles.addButtonWrapper}>
            <LinearGradient
              colors={['#00d4aa', '#00c49a', '#00b48a']}
              style={styles.addButton}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
            >
              <Image
                source={require('../assets/plus-symbol-button.png')}
                style={styles.plusIcon}
              />
            </LinearGradient>
          </Pressable>
        </View>
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
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 12,
  },
  checklistContainer: {
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#333333',
    position: 'relative',
    overflow: 'hidden',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    position: 'relative',
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: '#0f0f0f',
    borderRadius: 20,
    paddingHorizontal: 24,
    fontSize: 17,
    color: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#404040',
    fontWeight: '500',
    letterSpacing: 0.3,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  addButtonWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 16,
    shadowColor: '#00d4aa',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: 28,
    height: 28,
    tintColor: '#ffffff',
  },
  micButton: {
    padding: 6,
  },
  mic: {
    fontSize: 24,
  },
});