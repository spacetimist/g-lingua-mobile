import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';

const exercisesData = {
  unit1: {
    title: "Unit 1: Weather",
    description: "Practice your understanding of weather-related vocabulary and expressions.",
    exercises: [
      {
        type: "Fill in the Blanks",
        description: "Complete the sentences with the correct words.",
        url: "/tabcontents/exercise/unit1/fill_in"
      },
      {
        type: "Listen to the Audio",
        description: "Type the sentence you hear.",
        url: "/tabcontents/exercise/unit1/listening"
      },
    ]
  },
  unit2: {
      title: "Unit 2: Hobbies and Free Time Activities",
      description: "Practice your understanding of daily vocabulary and expressions.",
      exercises: [
        {
          type: "Listen to the Audio",
          description: "Type the sentence you hear.",
          url: "/tabcontents/exercise/unit2/listening"
        },
        {
          type: "Fill in the Blanks",
          description: "Complete the sentences with the correct words.",
          url: "/tabcontents/exercise/unit2/fill_in"
        }
      ]
    },
   unit3: {
         title: "Unit 3: Daily Routines",
         description: "Practice your understanding of daily vocabulary and expressions.",
         exercises: [
           {
             type: "Listen to the Audio",
             description: "Type the sentence you hear.",
             url: "/tabcontents/exercise/unit3/listening"
           },
           {
             type: "Fill in the Blanks",
             description: "Complete the sentences with the correct words.",
             url: "/tabcontents/exercise/unit3/fill_in"
           }
         ]
       },
      unit4: {
               title: "Unit 4: Ordering Food",
               description: "Practice your understanding of vocabulary and expressions when ordering food.",
               exercises: [
                 {
                   type: "Listen to the Audio",
                   description: "Type the sentence you hear.",
                   url: "/tabcontents/exercise/unit4/listening"
                 },
                 {
                   type: "Fill in the Blanks",
                   description: "Complete the sentences with the correct words.",
                   url: "/tabcontents/exercise/unit4/fill_in"
                 }
               ]
             },
      unit5: {
               title: "Unit 5: Travel and Transportation",
               description: "Practice your understanding vocabulary and expressions when travelling.",
               exercises: [
                 {
                   type: "Listen to the Audio",
                   description: "Type the sentence you hear.",
                   url: "/tabcontents/exercise/unit5/listening"
                 },
                 {
                   type: "Fill in the Blanks",
                   description: "Complete the sentences with the correct words.",
                   url: "/tabcontents/exercise/unit5/fill_in"
                 }
               ]
             },
  // Tambahkan unit lainnya...
};


const ExerciseButton = ({ type, description, url }) => {
  const router = useRouter(); // Gunakan router dari Expo Router

  return (
    <TouchableOpacity
      onPress={() => router.push(url)} // Navigasi menggunakan router
      style={styles.exerciseButton}
    >
      <Text style={styles.exerciseType}>{type}</Text>
      <Text style={styles.exerciseDescription}>{description}</Text>
    </TouchableOpacity>
  );
};


const UnitContent = ({ unit }) => (
  <View style={styles.unitContent}>
    <Text style={styles.unitTitle}>{unit.title}</Text>
    <Text style={styles.unitDescription}>{unit.description}</Text>
    <Text style={styles.sectionTitle}>Exercise Types:</Text>
    {unit.exercises.map((exercise, index) => (
      <ExerciseButton
        key={index}
        type={exercise.type}
        description={exercise.description}
        url={exercise.url}
      />
    ))}
  </View>
);

export default function Exercises() {
  const [selectedUnit, setSelectedUnit] = useState(null);

  const renderUnitsList = () => (
    <View style={styles.unitList}>
      <Text style={styles.mainTitle}>Select a Unit</Text>
      {Object.keys(exercisesData).map((unitKey) => (
        <TouchableOpacity
          key={unitKey}
          onPress={() => setSelectedUnit(unitKey)}
          style={styles.unitButton}
        >
          <Text style={styles.unitButtonText}>
            {exercisesData[unitKey].title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderUnitContent = () => (
    <View style={styles.contentContainer}>
      <TouchableOpacity
        onPress={() => setSelectedUnit(null)}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>← Back to Units</Text>
      </TouchableOpacity>
      <UnitContent unit={exercisesData[selectedUnit]} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/adaptive_icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>G-Lingua Exercises</Text>
      </View>
      {selectedUnit ? renderUnitContent() : renderUnitsList()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0e3ca',
  },
  header: {
    backgroundColor: '#99856f',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  unitList: {
    padding: 15,
  },
  unitButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  unitButtonText: {
    fontSize: 16,
    color: '#543A14',
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 15,
  },
  backButton: {
    marginBottom: 15,
  },
  backButtonText: {
    color: '#99856f',
    fontSize: 16,
    fontWeight: 'bold',
  },
  unitContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  unitTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#543A14',
  },
  unitDescription: {
    color: '#754E1A',
    marginBottom: 20,
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#543A14',
  },
  exerciseButton: {
    backgroundColor: '#99856f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseType: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  exerciseDescription: {
    color: '#f5f5f5',
    fontSize: 14,
  },
});
