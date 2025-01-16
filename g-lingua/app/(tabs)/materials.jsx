import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';

// Mock data for all units and their materials
const unitsData = {
  unit1: {
    title: "Unit 1: Weather",
    description: "Learn how to discuss weather conditions and make weather-related conversations in English",
    materials: [
      {
        title: "Weather Vocabulary and Expressions",
        type: "pdf",
        url: "/materials/weather_vocab.pdf"
      },
      {
        title: "Weather Conversation Practice",
        type: "pdf",
        url: "/materials/weather_practice.pdf"
      }
    ],
    video: "https://www.youtube.com/embed/40PRWD1-HWA?feature=oembed"
  },
  unit2: {
    title: "Unit 2: American Culture",
    description: "Explore various aspects of American culture, traditions, and daily life",
    materials: [
      {
        title: "American Customs and Traditions",
        type: "pdf",
        url: "/materials/american_customs.pdf"
      },
      {
        title: "American Lifestyle Guide",
        type: "pdf",
        url: "/materials/american_lifestyle.pdf"
      }
    ],
    video: "https://www.youtube.com/embed/ew864XMV-lY"
  },
  unit3: {
    title: "Unit 3: Daily Activities",
    description: "Learn how to describe your daily routine and activities",
    materials: [
      {
        title: "Daily Activities Vocabulary",
        type: "pdf",
        url: "/materials/daily_activities.pdf"
      }
    ],
    video: "https://www.youtube.com/embed/example3"
  },
  unit4: {
    title: "Unit 4: Food and Dining",
    description: "Explore vocabulary and expressions related to food and dining experiences",
    materials: [
      {
        title: "Food Vocabulary Guide",
        type: "pdf",
        url: "/materials/food_vocab.pdf"
      }
    ],
    video: "https://www.youtube.com/embed/example4"
  },
  unit5: {
    title: "Unit 5: Travel and Transportation",
    description: "Learn how to navigate travel situations and use transportation",
    materials: [
      {
        title: "Travel Expressions Guide",
        type: "pdf",
        url: "/materials/travel_guide.pdf"
      }
    ],
    video: "https://www.youtube.com/embed/example5"
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

const DownloadButton = ({ title, url }) => (
  <TouchableOpacity 
    onPress={() => Linking.openURL(url)}
    style={styles.downloadButton}
  >
    <Text style={styles.downloadButtonText}>📄 {title}</Text>
  </TouchableOpacity>
);

const MaterialContent = ({ unit }) => {
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

export default function Materials() {
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
      <MaterialContent unit={unitsData[selectedUnit]} />
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