# React Firebase Authentication

This project is a simple React application that implements user authentication using Firebase Authentication with email and password login.

## Features

- User login with email and password
- Firebase Authentication integration
- Responsive design

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/react-firebase-auth.git
   ```

2. Navigate to the project directory:

   ```
   cd react-firebase-auth
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Set up Firebase:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Email/Password authentication in the Authentication section.
   - Obtain your Firebase configuration settings.

5. Create a `.env` file in the root of the project and add your Firebase configuration:

   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

### Running the Application

To start the application, run:

```
npm start
```

This will start the development server and open the application in your default web browser.

### Usage

- Navigate to the login page.
- Enter your email and password to log in.
- You can manage user authentication through Firebase.

### License

This project is licensed under the MIT License. See the LICENSE file for details.