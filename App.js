import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalisvisible, setModalIsvisible] = useState(false);
  const [userGoals, setUserGoals] = useState([]);

  startAddGoalhandler = () => {
    setModalIsvisible(true);
  };

  endAddGoalHandler = () => {
    setModalIsvisible(false);
  };

  addGoalHandler = (enteredGoalText) => {
    setUserGoals((currentUserGoals) => [
      ...currentUserGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  };

  deleteGoalHandler = (id) => {
    setUserGoals((currentUserGoals) => {
      return currentUserGoals.filter((goal) => goal.id != id);
    });
  };

  return (
    <>
      <StatusBar style='light'/>
      <View style={styles.appContainer}>
        <Button
          title="Add new Goal"
          color="#5e0acc"
          onPress={startAddGoalhandler}
        />
        <GoalInput
          visible={modalisvisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={userGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeletItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a"
  },
  goalsContainer: {
    flex: 4,
  },
});
