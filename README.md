# Contact Manager App

## Student Information

- **Name:** Ema Maeda
- **Student ID:** N01678730
- **Course:** CPAN 213
- **Lab:** Lab 3
- **Date:** October 16, 2025

## Project Description

This application is a comprehensive Contact Manager built with React Native. It allows users to create, view, update, and delete contact information seamlessly. The app features a clean, intuitive user interface and demonstrates best practices in mobile application development, including state management with React Context, form handling, and component-based architecture.

## Features Implemented

- **Contact List:** View all contacts in a scrollable, performance-optimized list.
- **Add Contact:** A dedicated form to add new contacts with validation for required fields.
- **Edit Contact:** Modify existing contact details through the same form interface.
- **Contact Details:** View detailed information for each contact.
- **State Management:** Centralized contact data management using React Context (`ContactContext`).
- **Error Handling:** An `ErrorBoundary` component to catch and display runtime errors gracefully.
- **User-Friendly Forms:** Custom input fields with icons, error messages, and loading indicators.

## Technologies Used

- React Native
- React Context API
- React Native Vector Icons

## Installation

1. Clone the repository.
2. Install dependencies: `npm install`
3. For iOS (on macOS), install pods: `cd ios && pod install`
4. Run on Android: `npx react-native run-android`
5. Run on iOS: `npx react-native run-ios`

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── ContactListItem.js
│   │   ├── CustomButton.js
│   │   ├── CustomInput.js
│   │   ├── ErrorBoundary.js
│   │   └── LoadingSpinner.js
│   └── forms/
├── data/
│   └── contactData.js
├── screens/
│   ├── AddContact/
│   │   └── AddContactScreen.js
│   ├── ContactDetails/
│   │   └── ContactDetailsScreen.js
│   └── ContactList/
│       └── ContactListScreen.js
├── styles/
│   └── globalStyles.js
└── utils/
    └── ContactContext.js
```

## Known Issues

- No known issues at this time.

## Future Enhancements

- Integrate with device contacts.
- Add profile pictures for contacts.
