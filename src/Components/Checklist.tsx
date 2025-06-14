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
        colors={completed ? ['#1f2937', '#111827'] : ['#374151', '#1f2937']}
        style={styles.checklistContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      >
        <View style={styles.topRow}>
          <Text style={[styles.checklistText, completed && styles.completedText]}>
            {text}
          </Text>
          <Pressable onPress={onDelete} style={styles.deleteButton}>
            <LinearGradient
              colors={['#ef4444', '#dc2626']}
              style={styles.deleteButtonGradient}
            >
              <Image
                source={require('../assets/deleteIcon/icons8-delete-18.png')}
                style={styles.icon}
                accessibilityLabel="Delete Icon"
              />
            </LinearGradient>
          </Pressable>
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

        <View style={styles.row}>
          <BouncyCheckBox
            fillColor="#10b981"
            iconStyle={{ borderColor: '#10b981', borderRadius: 6 }}
            innerIconStyle={{ borderRadius: 6 }}
            size={28}
            style={styles.checkbox}
            isChecked={completed}
            onPress={onComplete}
          />
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  checklistContainer: {
    borderRadius: 16,
    marginVertical: 8,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checklistText: {
    fontSize: 17,
    color: '#f9fafb',
    flex: 1,
    marginRight: 12,
    fontWeight: '500',
    lineHeight: 24,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
    opacity: 0.7,
  },
  timestampText: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 8,
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  deleteButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  deleteButtonGradient: {
    padding: 8,
    borderRadius: 8,
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: '#ffffff',
  },
  checkbox: {
    marginLeft: 0,
  },
  subItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    justifyContent: 'space-between',
  },
  subItemText: {
    fontSize: 14,
    flex: 1,
    color: '#f9fafb',
    marginLeft: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#6b7280',
    paddingVertical: 4,
    fontSize: 14,
    marginTop: 8,
    color: '#f9fafb',
  },
  subItemContainer: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
});