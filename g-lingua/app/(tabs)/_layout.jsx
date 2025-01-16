import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from 'react-native';

export default function TabLayout() {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#F0E3CA',
            borderTopWidth: 0,
            elevation: 0,
            height: Platform.OS === 'ios' ? 85 : 65, // Sesuaikan height berdasarkan platform
            paddingBottom: Platform.OS === 'ios' ? 25 : 5, // Lebih besar untuk iOS
            // paddingHorizontal: 10,
            // paddingVertical: 8,
            paddingTop: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            position: 'absolute', // Memastikan posisi absolut
            left: 0,
            right: 0,
            bottom: 0,
          },
          tabBarActiveTintColor: '#685752',
          tabBarInactiveTintColor: '#9C8B85',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            marginTop: 5,
            paddingBottom: Platform.OS === 'ios' ? 5 : 0, // Tambahan padding untuk iOS
          },
          tabBarItemStyle: {
            paddingHorizontal: 5, // Tambah padding untuk item
            marginHorizontal: 5,  // Tambah margin untuk spacing
          },
        }}
      >
      <Tabs.Screen
        name="home"
        options={{
          href: "/home",
          title: "Home",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={size} 
              color={focused ? '#8B4513' : '#946B54'}
              style={{
                marginBottom: -5,
                padding: 3,
                backgroundColor: focused ? '#E6D5C3' : 'transparent',
                borderRadius: 12,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="materials"
        options={{
          href: "/materials",
          title: "Materials",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? "book" : "book-outline"} 
              size={size} 
              color={focused ? '#8B4513' : '#946B54'}
              style={{
                marginBottom: -5,
                padding: 3,
                backgroundColor: focused ? '#E6D5C3' : 'transparent',
                borderRadius: 12,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="exercise"
        options={{
          href: "/exercise",
          title: "Exercise",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? "school" : "school-outline"} 
              size={size} 
              color={focused ? '#8B4513' : '#946B54'}
              style={{
                marginBottom: -5,
                padding: 3,
                backgroundColor: focused ? '#E6D5C3' : 'transparent',
                borderRadius: 12,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: "/profile",
          title: "Profile",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={size} 
              color={focused ? '#8B4513' : '#946B54'}
              style={{
                marginBottom: -5,
                padding: 3,
                backgroundColor: focused ? '#E6D5C3' : 'transparent',
                borderRadius: 12,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}