import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useContacts } from '../../utils/ContactContext';
import {
  Colors,
  Fonts,
  Spacing,
  GlobalStyles,
} from '../../styles/globalStyles';
import { formatContactName } from '../../data/contactData';
import { TouchableOpacity } from 'react-native';

const ContactDetailsScreen = ({ route, navigation }) => {
  const { contactId } = route.params;
  const { contacts } = useContacts();

  const contact = contacts.find(c => c.id === contactId);

  if (!contact) {
    return (
      <View style={GlobalStyles.centered}>
        <Text style={styles.notFound}>Contact not found.</Text>
      </View>
    );
  }

  const fullName = formatContactName(contact);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        {contact.avatar ? (
          <Image source={{ uri: contact.avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.initials}>
              {contact.firstName[0]}
              {contact.lastName[0]}
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

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('AddContact', { contact })}
      >
        <Text style={styles.editButtonText}>Edit Contact</Text>
      </TouchableOpacity>
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
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    alignSelf: 'center',
  },

  editButtonText: {
    color: Colors.text.light,
    fontSize: Fonts.medium,
    fontWeight: 'bold',
  },
});

export default ContactDetailsScreen;
