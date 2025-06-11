import { JSX } from 'react';
import { Text, StyleSheet, View, Image, Pressable } from 'react-native';
import BouncyCheckBox from 'react-native-bouncy-checkbox';


interface ChecklistProps {
  text: string;
  completed: boolean;
  onDelete: () => void;
  onComplete: () => void;
}


export default function Checklist({text,completed,onDelete,onComplete}:ChecklistProps): JSX.Element {

  return (
    <View style={styles.checklistContainer}>
      <Text style={[styles.checklistText,completed && styles.completedText,]}>{text}</Text>
      <View style={styles.row}>
        <Pressable onPress={onDelete}>
            <Image
            source={require('../assets/deleteIcon/icons8-delete-18.png')}
            style={styles.icon}
            accessibilityLabel="Delete Icon"
            />
        </Pressable>
        <BouncyCheckBox
          fillColor="#4CAF50"
          iconStyle={{ borderColor: "#4CAF50" }}
          size={25}
          style={styles.checkbox}
          isChecked={completed}
          onPress={onComplete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checklistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  checklistText: {
    fontSize: 15,
    color: '#000',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 10,
    width: '55%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 60,
  },
  icon: {
    width: 18,
    height: 18,
  },
  checkbox: {
    marginLeft: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});
