import React, { JSX, useState } from 'react';
import { Text, StyleSheet, View, Image, Pressable, TextInput } from 'react-native';
import BouncyCheckBox from 'react-native-bouncy-checkbox';
import LinearGradient from 'react-native-linear-gradient';

interface SubItems{
  text: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}

interface ChecklistProps {
  text: string;
  completed: boolean;
  onDelete: () => void;
  onComplete: () => void;
  createdAt: number;
  completedAt?: number;
}

export default function Checklist({
  text,
  completed,
  createdAt,
  completedAt,
  onDelete,
  onComplete,
}: ChecklistProps): JSX.Element {

  const [subItemInput, setSubItemInput] = useState('');

  return (
    <>
      <LinearGradient
        colors={completed ? ['#0f0f0f', '#1a1a1a', '#0f0f0f'] : ['#1a1a1a', '#2a2a2a', '#1a1a1a']}
        style={[styles.checklistContainer, completed && styles.completedContainer]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      >
        {/* Grain overlay */}
        <View style={styles.grainOverlay} />
        
        <View style={styles.contentContainer}>
          <View style={styles.topRow}>
            <Text style={[styles.checklistText, completed && styles.completedText]}>
              {text}
            </Text>
          </View>

          {!completed && (
            <Text style={styles.timestampText}>
              Added: {new Date(createdAt).toLocaleString()}
            </Text>
          )}
          {completed && completedAt && (
            <Text style={styles.timestampText}>
              Completed at: {new Date(completedAt).toLocaleString()}
            </Text>
          )}

          <View style={styles.actionRow}>
            <BouncyCheckBox
              fillColor="#00d4aa"
              iconStyle={{ borderColor: '#00d4aa', borderRadius: 8, borderWidth: 2 }}
              innerIconStyle={{ borderRadius: 6 }}
              size={32}
              style={styles.checkbox}
              isChecked={completed}
              onPress={onComplete}
            />
            
            <Pressable onPress={onDelete} style={styles.deleteButton}>
              <LinearGradient
                colors={['#ff4757', '#ff3742', '#ff2f3a']}
                style={styles.deleteButtonGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
              >
                <Image
                  source={require('../assets/deleteIcon/icons8-delete-18.png')}
                  style={styles.deleteIcon}
                  accessibilityLabel="Delete Icon"
                />
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  checklistContainer: {
    borderRadius: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#333333',
    position: 'relative',
    overflow: 'hidden',
  },
  completedContainer: {
    opacity: 0.7,
    borderColor: '#1a1a1a',
  },
  grainOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.03,
    // Simulating grain texture with a subtle pattern
    shadowColor: '#fff',
    shadowOpacity: 0.02,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 1,
  },
  contentContainer: {
    padding: 24,
    position: 'relative',
    zIndex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checklistText: {
    fontSize: 18,
    color: '#f8f9fa',
    flex: 1,
    fontWeight: '600',
    lineHeight: 26,
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
  timestampText: {
    fontSize: 13,
    color: '#8e9aaf',
    marginBottom: 16,
    fontStyle: 'italic',
    letterSpacing: 0.2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  checkbox: {
    marginLeft: 0,
    flex: 0,
  },
  deleteButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#ff4757',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
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
    width: 20,
    height: 20,
    tintColor: '#ffffff',
  },
});