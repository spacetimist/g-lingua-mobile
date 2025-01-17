import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock data for all units and their materials
const unitsData = {
  unit1: {
    title: "Unit 1: Weather",
    description: "Learn how to discuss weather conditions and make weather-related conversations in English",
    materials: [
      
      {
        title: "Weather Conversation Practice",
        type: "link",
        url: "https://www.bbc.co.uk/learningenglish/features/real-easy-english/240906"
      }
    ],
    video: "https://youtu.be/40PRWD1-HWA?si=9E_Tg6AxAc2yYH5s"
  },
  unit2: {
    title: "Unit 2: Hobbies and Free Time Activities",
    description: "Explore vocabulary and expressions related to what activities you do in your spare time",
    materials: [
      {
        title: "Leisure Conversation Practice",
        type: "link",
        url: "https://www.eslfast.com/robot/topics/smalltalk/smalltalk10.htm"
      }
    ],
    video: "https://youtu.be/DaDaZcBE8MQ?si=UmNVrWd5YDG5xU_a"
  },
  unit3: {
    title: "Unit 3: Daily Routines",
    description: "Learn how to describe your daily routine and activities",
    materials: [
      
      {
        title: "Daily Activities Conversation Practice",
        type: "link",
        url: "https://oxfordlanguageclub.com/page/blog/daily-routines-in-english"
      }
    ],
    video: "https://youtu.be/ecF1y2bI2T4?si=SIECQUiPQyeHw6uG"
  },
  unit4: {
    title: "Unit 4: Ordering Food",
    description: "Explore vocabulary and expressions related to ordering food at a restaurant",
    materials: [
      {
        title: "Ordering Food and Drinks Conversation Practice",
        type: "link",
        url: "https://www.eslfast.com/robot/topics/restaurant/restaurant04.htm"
      }
    ],
    video: "https://youtu.be/bgfdqVmVjfk?si=_R8zCepMo_0OKEHV"
  },
  unit5: {
    title: "Unit 5: Travel and Transportation",
    description: "Learn how to navigate travel situations and use transportation",
    materials: [
      
      {
        title: "Travel Expressions Guide Practice",
        type: "link",
        url: "https://www.novakidschool.com/blog/english-for-travel-useful-phrases/"
      }
    ],
    video: "https://youtu.be/3MUWJ7JbNtw?si=RUDKwcDp6hERXJ6A"
  }
};

const UnitButton = ({ title, onClick, isActive }) => {
  const handlePress = async () => {
    // Call the original onClick handler
    onClick();
    
    // Extract unit key from title (e.g., "Unit 1: Weather" -> "unit1")
    const unitNumber = title.match(/Unit (\d+):/)?.[1];
    if (unitNumber) {
      const unitKey = `unit${unitNumber}`;
      try {
        // Get existing progress data
        const savedProgress = await AsyncStorage.getItem('userProgress') || '[]';
        let progressData = JSON.parse(savedProgress);
        
        // Update atau tambah progress untuk unit ini
        const unitProgress = {
          title: title.split(': ')[1], // Ambil nama unit (Weather, Hobbies, dll)
          progress: 50, // 50% karena baru materials
          lastAccessed: Date.now(),
          materials: true,
          exercises: false
        };
        
        // Cari unit yang sudah ada
        const existingIndex = progressData.findIndex(item => 
          item.title === unitProgress.title
        );
        
        if (existingIndex >= 0) {
          // Update existing unit
          progressData[existingIndex] = {
            ...progressData[existingIndex],
            ...unitProgress,
            // Jika exercise sudah selesai, progress tetap 100%
            progress: progressData[existingIndex].exercises ? 100 : 50
          };
        } else {
          // Tambah unit baru
          progressData.push(unitProgress);
        }
        
        // Simpan progress
        await AsyncStorage.setItem('userProgress', JSON.stringify(progressData));
        
        // Update overall progress di home
        const totalUnits = Object.keys(unitsData).length;
        const completedProgress = progressData.reduce((sum, unit) => sum + unit.progress, 0);
        const overallProgress = Math.round(completedProgress / totalUnits);
        await AsyncStorage.setItem('overallProgress', overallProgress.toString());
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      style={[styles.unitButton, isActive && styles.unitButtonActive]}
    >
      <Text style={[styles.unitButtonText, isActive && styles.unitButtonTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};


// const DownloadButton = ({ title, url, type }) => (
//   <TouchableOpacity 
//     onPress={() => Linking.openURL(url)}
//     style={styles.downloadButton}
//   >
//     <Text style={styles.downloadButtonText}>📄 {title}</Text>
//   </TouchableOpacity>
// );

const DownloadButton = ({ title, url, type }) => {
  const router = useRouter();

  const handlePress = () => {
    if (type === "link") {
      // Untuk link eksternal, gunakan Linking.openURL
      Linking.openURL(url);
    } else if (type === "pdf") {
       // Untuk file PDF, handle secara lokal
      try {
        const asset = url;  // url sudah berupa hasil require()
        Linking.openURL(asset.uri);
      } catch (error) {
        console.error('Error opening PDF:', error);
        Alert.alert('Error', 'Could not open PDF file');
      }
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      style={styles.downloadButton}
    >
      <Text style={styles.downloadButtonText}>
        {type === "pdf" ? "📄" : "🔗"} {title}
      </Text>
    </TouchableOpacity>
  );
};

// const MaterialContent = ({ unit }) => {
//   const handleVideoPress = () => {
//     if (unit.video) {
//       const videoId = unit.video.split('/').pop().split('?')[0];
//       const youtubeUrl = `https://youtube.com/watch?v=${videoId}`;
//       Linking.openURL(youtubeUrl);
//     }
//   };

//   return (
//     <View style={styles.materialContent}>
//       <Text style={styles.unitTitle}>{unit.title}</Text>
//       <Text style={styles.unitDescription}>{unit.description}</Text>
      
//       <View style={styles.materialsSection}>
//         <Text style={styles.sectionTitle}>Study Materials:</Text>
//         <View style={styles.materialsGrid}>
//           {unit.materials.map((material, index) => (
//             <DownloadButton 
//               key={index}
//               title={material.title}
//               url={material.url}
//             />
//           ))}
//         </View>
//       </View>

//       <View style={styles.videoSection}>
//         <Text style={styles.sectionTitle}>Video Material:</Text>
//         <TouchableOpacity 
//           onPress={handleVideoPress}
//           style={styles.videoPlaceholder}
//         >
//           <Text style={styles.videoText}>Click to Watch Video</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default function Materials({ navigation }) {
//   const [selectedUnit, setSelectedUnit] = useState(null);

//   const renderUnitsList = () => (
//     <View style={styles.unitList}>
//       <Text style={styles.mainTitle}>Select a Unit</Text>
//       {Object.keys(unitsData).map((unitKey) => (
//         <UnitButton
//           key={unitKey}
//           title={unitsData[unitKey].title}
//           onClick={() => setSelectedUnit(unitKey)}
//           isActive={selectedUnit === unitKey}
//         />
//       ))}
//     </View>
//   );

//   const renderUnitContent = () => (
//     <View style={styles.contentContainer}>
//       <TouchableOpacity
//         onPress={() => setSelectedUnit(null)}
//         style={styles.backButton}
//       >
//         <Text style={styles.backButtonText}>← Back to Units</Text>
//       </TouchableOpacity>
//       <MaterialContent unit={unitsData[selectedUnit]} navigation={navigation} />
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Image 
//           source={require('../../assets/images/adaptive_icon.png')} 
//           style={styles.logo}
//           resizeMode="contain"
//         />
//         <Text style={styles.headerText}>G-Lingua</Text>
//       </View>
      
//       {selectedUnit ? renderUnitContent() : renderUnitsList()}
//     </ScrollView>
//   );
// }

// const MaterialContent = ({ unit, navigation }) => {
//   const handleVideoPress = () => {
//     if (unit.video) {
//       const videoId = unit.video.split('/').pop().split('?')[0];
//       const youtubeUrl = `https://youtube.com/watch?v=${videoId}`;
//       Linking.openURL(youtubeUrl);
//     }
//   };

//   return (
//     <View style={styles.materialContent}>
//       <Text style={styles.unitTitle}>{unit.title}</Text>
//       <Text style={styles.unitDescription}>{unit.description}</Text>
      
//       <View style={styles.materialsSection}>
//         <Text style={styles.sectionTitle}>Study Materials:</Text>
//         <View style={styles.materialsGrid}>
//           {unit.materials.map((material, index) => (
//             <DownloadButton 
//               key={index}
//               title={material.title}
//               url={material.url}
//               type={material.type}
//               navigation={navigation}
//             />
//           ))}
//         </View>
//       </View>

//       <View style={styles.videoSection}>
//         <Text style={styles.sectionTitle}>Video Material:</Text>
//         <TouchableOpacity 
//           onPress={handleVideoPress}
//           style={styles.videoPlaceholder}
//         >
//           <Text style={styles.videoText}>Click to Watch Video</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

const MaterialContent = ({ unit, unitKey }) => {
  useEffect(() => {
    updateProgress(unitKey);
  }, [unitKey]);
  const handleVideoPress = () => {
    if (unit.video) {
      const videoId = unit.video.split('/').pop().split('?')[0];
      const youtubeUrl = `https://youtube.com/watch?v=${videoId}`;
      Linking.openURL(youtubeUrl);
    }
  };

  return (
    <View style={styles.materialContent}>
      <Text style={styles.unitTitle}>{unit.title}</Text>
      <Text style={styles.unitDescription}>{unit.description}</Text>
      
      <View style={styles.materialsSection}>
        <Text style={styles.sectionTitle}>Study Materials:</Text>
        <View style={styles.materialsGrid}>
          {unit.materials.map((material, index) => (
            <DownloadButton 
              key={index}
              title={material.title}
              url={material.url}
              type={material.type}
             
            />
          ))}
        </View>
      </View>

      <View style={styles.videoSection}>
        <Text style={styles.sectionTitle}>Video Material:</Text>
        <TouchableOpacity 
          onPress={handleVideoPress}
          style={styles.videoPlaceholder}
        >
          <Text style={styles.videoText}>Click to Watch Video</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function Materials({ navigation }) {
  const [selectedUnit, setSelectedUnit] = useState(null);
  // Safely get unit keys, with a fallback
  const unitKeys = unitsData ? Object.keys(unitsData) : [];

  const renderUnitsList = () => (
    <View style={styles.unitList}>
      <Text style={styles.mainTitle}>Select a Unit</Text>
      {Object.entries(unitsData).map(([unitKey, unit]) => (
        <UnitButton
          key={unitKey}
          title={unit.title}
          onClick={() => setSelectedUnit(unitKey)}
          isActive={selectedUnit === unitKey}
        />
      ))}
    </View>
  );

  // Add null check for selectedUnit
  const renderUnitContent = () => (
    <View style={styles.contentContainer}>
      <TouchableOpacity
        onPress={() => setSelectedUnit(null)}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>← Back to Units</Text>
      </TouchableOpacity>
      {unitsData[selectedUnit] && (
        <MaterialContent 
          unit={unitsData[selectedUnit]} 
          unitKey={selectedUnit}
          navigation={navigation} 
        />
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/adaptive_icon.png')} 
          style={styles.logo}
          //resizeMode="contain"
        />
        <Text style={styles.headerText}>G-Lingua - Materials</Text>
      </View>
      
      {selectedUnit ? renderUnitContent() : renderUnitsList()}
    </ScrollView>
  );
}

const updateProgress = async (unitKey) => {
  try {
    // Get existing progress
    const progressString = await AsyncStorage.getItem('unitProgress');
    let progress = progressString ? JSON.parse(progressString) : {};
    
    // Mark unit as started
    if (!progress[unitKey]) {
      progress[unitKey] = {
        started: true,
        materials: true,
        exercises: progress[unitKey]?.exercises || false,
        lastAccessed: new Date().toISOString()
      };
      
      // Calculate overall progress
      const totalUnits = Object.keys(unitsData).length;
      const startedUnits = Object.keys(progress).length;
      const overallProgress = Math.round((startedUnits / totalUnits) * 100);
      
      // Save progress
      await AsyncStorage.setItem('unitProgress', JSON.stringify(progress));
      await AsyncStorage.setItem('overallProgress', JSON.stringify(overallProgress));
    }
  } catch (error) {
    console.error('Error updating progress:', error);
  }
};

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
    width: 80,
    height: 40,
    marginRight: 1,
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
    // Shadow
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // untuk Android
  },
  unitButtonActive: {
    backgroundColor: '#99856f',
  },
  unitButtonText: {
    fontSize: 16,
    color: '#543A14',
    fontWeight: 'bold',
  },
  unitButtonTextActive: {
    color: 'white',
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
  materialContent: {
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
    color: '#666',
    marginBottom: 20,
    fontSize: 15,
    color: '#754E1A',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#543A14',
  },
  materialsSection: {
    marginBottom: 10,
  },
  materialsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  downloadButton: {
    backgroundColor: '#99856f',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  downloadButtonText: {
    color: 'white',
  },
  videoSection: {
    marginTop: 10,
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    color: '#666',
    fontSize: 16,
  }
});