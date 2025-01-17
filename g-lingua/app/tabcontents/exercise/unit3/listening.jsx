import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image
} from "react-native";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";

const Lesson2 = () => {
  const correctAnswers = [
    "The weather is lovely",
    "Today is rainy",
    "It's hot outside",
  ];

  const audioFiles = [
    require("../../../../assets/audio/audio1.mp3"),
    require("../../../../assets/audio/audio2.mp3"),
    require("../../../../assets/audio/audio3.mp3"),
  ];

  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(
    parseInt(localStorage.getItem("currentQuestion")) || 0
  );
  const [feedback, setFeedback] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [audio, setAudio] = useState(null);
  const [progress, setProgress] = useState(
    (currentQuestion / correctAnswers.length) * 100
  );

  useEffect(() => {
    loadAudio();
    return () => {
      unloadAudio();
    };
  }, [currentQuestion]);

  const loadAudio = async () => {
    if (audio) {
      await audio.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync(audioFiles[currentQuestion]);
    setAudio(sound);
    await sound.playAsync();
  };

  const unloadAudio = async () => {
    if (audio) {
      await audio.unloadAsync();
    }
  };

  const checkAnswer = () => {
    if (
      userAnswer.trim().toLowerCase() ===
      correctAnswers[currentQuestion].toLowerCase()
    ) {
      setFeedback("Correct! Well done!");
      if (currentQuestion === correctAnswers.length - 1) {
        setProgress(100);
      } else {
        setProgress(((currentQuestion + 1) / correctAnswers.length) * 100);
      }
      saveProgress();
    } else {
      setFeedback("Incorrect, try again!");
    }
  };

  const saveProgress = () => {
    localStorage.setItem("currentQuestion", currentQuestion);
  };

  const nextQuestion = () => {
    if (currentQuestion < correctAnswers.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setUserAnswer("");
      setFeedback("");
    }
  };

  const finishLesson = () => {
    localStorage.removeItem("currentQuestion");
    setCurrentQuestion(0);
    setProgress(0);
    navigation.goBack();
  };

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../../../assets/images/adaptive_icon.png")}
          style={styles.logo}
        />
        <Text style={styles.headerText}>G-Lingua Exercises</Text>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.lessonTitle}>
            Lesson 2 - Listen and Type the Answer
          </Text>
          <Text style={styles.instruction}>
            Listen to the audio and type what you hear!
          </Text>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View
              style={[styles.progressBar, { width: `${progress}%` }]}
            />
          </View>

          {/* Question Info */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionNumber}>{currentQuestion + 1}.</Text>
            <Text style={styles.questionText}>
              Listen carefully and type the sentence you hear:
            </Text>
          </View>

          {/* Audio Section */}
          <TouchableOpacity
            style={styles.audioButton}
            onPress={async () => {
              if (audio) {
                await audio.replayAsync();
              }
            }}
          >
            <Text style={styles.audioButtonText}>Play Audio</Text>
          </TouchableOpacity>

          {/* Answer Section */}
          <TextInput
            style={styles.input}
            placeholder="Type your answer here"
            value={userAnswer}
            onChangeText={setUserAnswer}
          />

          <TouchableOpacity style={styles.checkButton} onPress={checkAnswer}>
            <Text style={styles.checkButtonText}>Check Answer</Text>
          </TouchableOpacity>

          {feedback && (
            <Text
              style={[
                styles.feedbackText,
                { color: feedback === "Correct! Well done!" ? "green" : "red" },
              ]}
            >
              {feedback}
            </Text>
          )}

          {feedback === "Correct! Well done!" &&
            currentQuestion < correctAnswers.length - 1 && (
              <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
                <Text style={styles.nextButtonText}>Next Question</Text>
              </TouchableOpacity>
            )}

          {feedback === "Correct! Well done!" &&
            currentQuestion === correctAnswers.length - 1 && (
              <View style={styles.completionContainer}>
                <Text style={styles.completionText}>
                  Congratulations! You've completed the lesson!
                </Text>
                <TouchableOpacity
                  style={styles.finishButton}
                  onPress={finishLesson}
                >
                  <Text style={styles.finishButtonText}>Finish Lesson</Text>
                </TouchableOpacity>
              </View>
            )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#99856f",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#F0E3CA",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  lessonTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 20,
  },
  progressContainer: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  questionText: {
    fontSize: 16,
  },
  audioButton: {
    backgroundColor: "#2196f3",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  audioButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  checkButton: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  checkButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  feedbackText: {
    fontSize: 16,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#2196f3",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  completionContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  completionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  finishButton: {
    backgroundColor: "#8bc34a",
    padding: 10,
    borderRadius: 5,
  },
  finishButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Lesson2;
