import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, GlobalStyles } from '../../styles/globalStyles';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={[GlobalStyles.centered, styles.container]}>
          <Text style={styles.title}>Something went wrong.</Text>
          <Text style={styles.message}>{this.state.error?.message}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: Fonts.large,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 10,
  },
  message: {
    fontSize: Fonts.medium,
    color: Colors.text.secondary,
  },
});

export default ErrorBoundary;
