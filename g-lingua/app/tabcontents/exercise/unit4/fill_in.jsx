import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation untuk navigasi

// Komponen untuk tampilan Lesson
const Lesson = () => {
  const navigation = useNavigation(); // Hook untuk navigasi
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    parseInt(localStorage.getItem('currentQuestionIndex')) || 0
  );
  const [feedback, setFeedback] = useState('');
  const [dropZones, setDropZones] = useState([]);

  const questions = [
      { text: '"Saya ingin memesan pizza"', words: ['order', 'want', 'pizza', 'I', 'to'], answer: ['I', 'want', 'to', 'order', 'pizza'] },
      { text: '"Bisakah saya mendapatkan menu?"', words: ['Can', 'the', 'get', 'menu', 'I'], answer: ['Can', 'I', 'get', 'the', 'menu'] },
      { text: '"Dia memesan segelas kopi"', words: ['orders', 'coffee', 'a', 'of', 'cup', 'He'], answer: ['He', 'orders', 'a', 'cup', 'of', 'coffee'] },
      { text: '"Tolong tambah satu porsi kentang goreng"', words: ['add', 'french', 'one', 'fries', 'Please', 'more', 'portion'], answer: ['Please', 'add', 'one', 'more', 'portion', 'french', 'fries'] }
  ];


  const [progress, setProgress] = useState(
    (currentQuestionIndex / questions.length) * 100
  );

  useEffect(() => {
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
    setDropZones(new Array(questions[currentQuestionIndex].words.length).fill(''));
  }, [currentQuestionIndex]);

  const checkAnswer = () => {
    const userAnswer = dropZones;
    if (JSON.stringify(userAnswer) === JSON.stringify(questions[currentQuestionIndex].answer)) {
      setFeedback('Correct! Well done!');
      if (currentQuestionIndex === questions.length - 1) {
        setProgress(100);
      } else {
        setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
      }
    } else {
      setFeedback('Incorrect, try again!');
    }
  };

  const resetDropZones = () => {
    setDropZones(new Array(questions[currentQuestionIndex].words.length).fill(''));
    setFeedback('');
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    resetDropZones();
  };

  const handleWordClick = (word) => {
    const updatedDropZones = [...dropZones];
    const firstEmptyIndex = updatedDropZones.indexOf(''); // cari index pertama yang kosong
    if (firstEmptyIndex !== -1) {
      updatedDropZones[firstEmptyIndex] = word;
      setDropZones(updatedDropZones);
    }
  };

  const finishLesson = () => {
    // Hapus state yang disimpan di localStorage untuk progress
    localStorage.removeItem('currentQuestionIndex');
    // Reset progress dan indeks
    setCurrentQuestionIndex(0);
    setProgress(0);
    // Kembali ke halaman sebelumnya
    navigation.goBack();
  };

  return (
    <View style={styles.lessonContainer}>
      <Text style={styles.heading}>Lesson 1 - Arrange the words</Text>
      <Text style={styles.instruction}>Click on the words to place them in the correct order!</Text>

      <View style={styles.progressSection}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]}></View>
        </View>
      </View>

      <View style={styles.questionInfo}>
        <Text style={styles.questionNumber}>{currentQuestionIndex + 1}.</Text>
        <Text style={styles.questionText}>{questions[currentQuestionIndex].text}</Text>
      </View>

      <View style={styles.quizContainer}>
        <View style={styles.sentenceContainer}>
          {dropZones.map((zone, index) => (
            <View key={index} style={styles.dropZone}>
              <Text>{zone}</Text>
            </View>
          ))}
        </View>

        <View style={styles.wordBank}>
          {questions[currentQuestionIndex].words.map((word, index) => (
            <TouchableOpacity key={index} onPress={() => handleWordClick(word)} style={styles.word}>
              <Text>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.checkAnswerButton} onPress={checkAnswer}>
        <Text style={styles.checkAnswerText}>Check Answer</Text>
      </TouchableOpacity>

      {feedback && <Text style={styles.feedbackText}>{feedback}</Text>}

      {feedback === 'Correct! Well done!' && currentQuestionIndex < questions.length - 1 && (
        <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
          <Text style={styles.nextButtonText}>Next Question</Text>
        </TouchableOpacity>
      )}

      {feedback === 'Correct! Well done!' && currentQuestionIndex === questions.length - 1 && (
        <TouchableOpacity style={styles.finishButton} onPress={finishLesson}>
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.resetButton} onPress={resetDropZones}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

// Komponen utama untuk halaman
const FillIn = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../../../assets/images/adaptive_icon.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>G-Lingua Exercises</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.fillInContainer}>
        <View style={styles.card}>
          <Lesson />
        </View>
      </ScrollView>
    </View>

  );
};

// Styling menggunakan StyleSheet di React Native
const styles = StyleSheet.create({
container: {
    flex: 1, // Ensure the container takes up full space
    backgroundColor: '#F0E3CA',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#99856f',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 1, // To ensure it stays on top
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
//   fillInContainer: {
//     flex: 1,
//     backgroundColor: '#f4f4f4',
//     padding: 20,
//   },
  fillInContainer: {
    flex: 1,
    backgroundColor: '#F0E3CA',

  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    elevation: 5, // shadow effect for iOS and Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  lessonContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 20,
  },
  progressSection: {
    width: '100%',
    marginBottom: 20,
  },
  progressContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    height: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  questionInfo: {
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 16,
    marginTop: 5,
  },
  quizContainer: {
    marginBottom: 20,
  },
  sentenceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  dropZone: {
    width: 100,
    height: 50,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordBank: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  word: {
    backgroundColor: '#ececec',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  checkAnswerButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  checkAnswerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackText: {
    fontSize: 16,
    marginTop: 10,
  },
  nextButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#f44336',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  finishButton: {
    backgroundColor: '#8bc34a',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FillIn;
