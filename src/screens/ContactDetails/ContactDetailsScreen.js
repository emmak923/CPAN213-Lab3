import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useContacts } from '../../utils/ContactContext';
import {
  Colors,
  Fonts,
  Spacing,
  GlobalStyles,
} from '../../styles/globalStyles';
import { formatContactName } from '../../data/contactData';
import CustomButton from '../../components/common/CustomButton';

const ContactDetailsScreen = ({ route, navigation }) => {
  // receive contactId from route params
  const { contactId } = route.params;
  const { contacts, deleteContact } = useContacts();

  const contact = contacts.find(c => c.id === contactId);

  if (!contact) {
    return (
      <View style={GlobalStyles.centered}>
        <Text style={styles.notFound}>Contact not found.</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            deleteContact(contactId);
            navigation.goBack();
          },
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  const fullName = formatContactName(contact);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        {contact.avatar ? (
          <Image source={{ uri: contact.avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.initials}>
              {contact.firstName && contact.lastName
                ? `${contact.firstName[0]}${contact.lastName[0]}`
                : ''}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.name}>{fullName}</Text>
      <Text style={styles.infoLabel}>Company</Text>
      <Text style={styles.infoText}>{contact.company || '—'}</Text>

      <Text style={styles.infoLabel}>Email</Text>
      <Text style={styles.infoText}>{contact.email}</Text>

      <Text style={styles.infoLabel}>Phone</Text>
      <Text style={styles.infoText}>{contact.phone}</Text>

      <Text style={styles.infoLabel}>Notes</Text>
      <Text style={styles.infoText}>{contact.notes || '—'}</Text>

      <CustomButton
        title="Edit Contact"
        onPress={() => navigation.navigate('AddContact', { contact })}
        style={styles.editButton}
      />
      <CustomButton
        title="Delete Contact"
        onPress={handleDelete}
        style={styles.deleteButton}
      />
      <CustomButton
        title="Go Back"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: Colors.text.light,
    fontSize: Fonts.xlarge,
    fontWeight: 'bold',
  },
  name: {
    fontSize: Fonts.large,
    fontWeight: 'bold',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  infoLabel: {
    fontSize: Fonts.small,
    color: Colors.text.secondary,
    marginTop: Spacing.sm,
  },
  infoText: {
    fontSize: Fonts.medium,
    color: Colors.text.primary,
  },
  notFound: {
    fontSize: Fonts.medium,
    color: Colors.text.secondary,
  },
  editButton: {
    marginTop: Spacing.lg,
  },
  deleteButton: {
    marginTop: Spacing.md,
    backgroundColor: Colors.danger,
  },
  backButton: {
    marginTop: Spacing.md,
    backgroundColor: Colors.secondary,
  },
});

export default ContactDetailsScreen;
