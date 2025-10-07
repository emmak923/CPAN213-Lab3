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
      setStack(prevStack => {
        const newStack = prevStack.slice(0, prevStack.length - 1);
        const last = newStack[newStack.length - 1];
        return [...newStack.slice(0, -1), { ...last }];
      });
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
