import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { useRouter } from 'expo-router';

// Mock data for all units and their materials
const unitsData = {
  unit1: {
    title: "Unit 1: Weather",
    description: "Learn how to discuss weather conditions and make weather-related conversations in English",
    materials: [
      {
        title: "Weather Vocabulary and Expressions",
        type: "pdf",
        url: require('../../assets/file/weather_vocab.pdf')
      },
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
        title: "Hobbies Vocabulary List",
        type: "pdf",
        url: require('../../assets/file/hobbies_vocab.pdf')
      }
    ],
    video: "https://youtu.be/DaDaZcBE8MQ?si=UmNVrWd5YDG5xU_a"
  },
  unit3: {
    title: "Unit 3: Daily Routines",
    description: "Learn how to describe your daily routine and activities",
    materials: [
      {
        title: "Daily Routines Vocabulary",
        type: "pdf",
        url: require('../../assets/file/routines_vocab.pdf')
      },
      {
        title: "Daily Activities Conversation",
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
        title: "Food Vocabulary List",
        type: "pdf",
        url: require('../../assets/file/food_vocab.pdf')
      }
    ],
    video: "https://youtu.be/bgfdqVmVjfk?si=_R8zCepMo_0OKEHV"
  },
  unit5: {
    title: "Unit 5: Travel and Transportation",
    description: "Learn how to navigate travel situations and use transportation",
    materials: [
      {
        title: "Transportation Vocabulary",
        type: "pdf",
        url: require('../../assets/file/transportation_vocab.pdf')
      },
      {
        title: "Travel Expressions Guide",
        type: "link",
        url: "https://www.novakidschool.com/blog/english-for-travel-useful-phrases/"
      }
    ],
    video: "https://youtu.be/3MUWJ7JbNtw?si=RUDKwcDp6hERXJ6A"
  }
};

const UnitButton = ({ title, onClick, isActive }) => (
  <TouchableOpacity 
    onPress={onClick}
    style={[
      styles.unitButton,
      isActive && styles.unitButtonActive
    ]}
  >
    <Text style={[
      styles.unitButtonText,
      isActive && styles.unitButtonTextActive
    ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

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

export default function Materials({ navigation }) {
  const [selectedUnit, setSelectedUnit] = useState(null);

  const renderUnitsList = () => (
    <View style={styles.unitList}>
      <Text style={styles.mainTitle}>Select a Unit</Text>
      {Object.keys(unitsData).map((unitKey) => (
        <UnitButton
          key={unitKey}
          title={unitsData[unitKey].title}
          onClick={() => setSelectedUnit(unitKey)}
          isActive={selectedUnit === unitKey}
        />
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
      <MaterialContent unit={unitsData[selectedUnit]} navigation={navigation} />
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
        <Text style={styles.headerText}>G-Lingua</Text>
      </View>
      
      {selectedUnit ? renderUnitContent() : renderUnitsList()}
    </ScrollView>
  );
}

const MaterialContent = ({ unit, navigation }) => {
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
              navigation={navigation}
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