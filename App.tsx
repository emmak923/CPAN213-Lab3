// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;

import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import AddContactScreen from './src/screens/AddContact/AddContactScreen';
import ContactDetailsScreen from './src/screens/ContactDetails/ContactDetailsScreen';
import ContactListScreen from './src/screens/ContactList/ContactListScreen';
import { Colors, GlobalStyles } from './src/styles/globalStyles.js';
import { ContactProvider } from './src/utils/ContactContext';

import ErrorBoundary from './src/components/common/ErrorBoundary';

const App = () => {
  const [stack, setStack] = useState([
    {
      name: 'ContactList',
      params: undefined,
    },
  ]);

  const navigation = {
    navigate(name, params) {
      setStack(prevStack => [...prevStack, { name, params }]);
    },
    goBack() {
      setStack(prevStack => prevStack.slice(0, prevStack.length - 1));
    },
  };

  const currentScreen = stack[stack.length - 1];

  const renderScreen = () => {
    switch (currentScreen.name) {
      case 'ContactList':
        return <ContactListScreen navigation={navigation} />;
      case 'AddContact':
        return (
          <AddContactScreen navigation={navigation} route={currentScreen} />
        );
      case 'ContactDetails':
        return (
          <ContactDetailsScreen navigation={navigation} route={currentScreen} />
        );
      default:
        return <ContactListScreen navigation={navigation} />;
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <ContactProvider>
        <ErrorBoundary>{renderScreen()}</ErrorBoundary>
      </ContactProvider>
    </SafeAreaView>
  );
};

export default App;
