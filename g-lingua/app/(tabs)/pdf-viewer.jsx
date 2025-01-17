// import React from 'react';
// import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
// import Pdf from 'react-native-pdf';
// import { useLocalSearchParams, useRouter } from 'expo-router';
//
// const PDFViewer = () => {
//   const router = useRouter();
//   const { pdfSource, title } = useLocalSearchParams();
//
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => router.back()}
//           style={styles.backButton}
//         >
//           <Text style={styles.backButtonText}>← Back</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
//       </View>
//
//       <View style={styles.pdfContainer}>
//         <Pdf
//           source={pdfSource}
//           style={styles.pdf}
//           horizontal={false}
//           enablePaging={true}
//           onLoadComplete={(numberOfPages, filePath) => {
//             console.log(`PDF loaded: ${numberOfPages} pages`);
//           }}
//           onError={(error) => {
//             console.log('PDF Error:', error);
//           }}
//         />
//       </View>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0e3ca',
//   },
//   header: {
//     backgroundColor: '#99856f',
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     paddingTop: 20,
//   },
//   backButton: {
//     padding: 8,
//   },
//   backButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     flex: 1,
//   },
//   pdfContainer: {
//     flex: 1,
//   },
//   pdf: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });
//
// export default PDFViewer;