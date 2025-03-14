# ScoutX 2025

FRC Scouting App with robot data collection, visualization, and analysis functionality. 

## Installation 

1. Clone the repo

2. Install dependencies:

```sh
npm install
```

## Set Up 

### Prerequisites  
Make sure you have the following installed on your system:  
- [Node.js](https://nodejs.org/) (LTS version recommended)  
- [npm](https://www.npmjs.com/) (comes with Node.js)  
- [Firebase CLI](https://firebase.google.com/docs/cli) (for deployment)  

### Setting Up Firebase 
- Create a new Firebase Project as a web app  
- Select the Blaze billing plan  
- Set read and write rules to true

```sh
allow read, write: if true;
```

### Setting Up API Keys  

### Setting Up Environment Variables  
Create two `.env` files:

One in the root of your project to store important Firebase credentials and the verification code (used to verify users in the scout pages)
```sh
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

REACT_APP_VERIFICATION_CODE=your_verification_code
```

The other one in the functions folder to store your OpenAI API Key
```sh
REACT_APP_OPENAI_API_KEY=your_openai_api_key
```

#### Firebase API Key  
- Navigate to Project Settings → General → Your apps → Config.
- Copy the `apiKey` and other required credentials.
- Place them in your app's .env file in the root of your project.

#### OpenAI API Key  
- Sign up at OpenAI and get your API key from the developer dashboard.
- Store the key securely in the .env file in the functions folder.

## Start Up  

### Running Locally  
To start the development server and view the app on `localhost:3000`, run:  

```sh
npm start
```
This will launch the app in development mode, with hot-reloading enabled.

### Running Firebase Function
Change the Firebase Function URL in the Analytics Component to match the one in your project. 

```sh
const response = await axios.post(
        your_firebase_function_url,
        { teamData: allTeamData, userRequest }
      );
```

If you want to update changes made to the firebase function, run:

```sh
firebase deploy --only functions
```

## Deployment  

To deploy the app using Firebase Hosting:

### 1. Build the Project  
React applications need to be built before deployment. Run:

```sh
npm run build
```
This creates a production-ready version of the app in the `build` folder.

### 2. Initialize Firebase (First-Time Setup)  
If you haven't already set up Firebase Hosting, run:

```sh
firebase login
firebase init
```
- Select **Hosting**.
- Choose your existing Firebase project.
- Set `build` as the public directory.
- Configure as a single-page app (`Yes` for "rewrite all URLs to /index.html").
- Skip automatic builds if prompted.

### 3. Deploy to Firebase  
After initialization, deploy your app with:

```sh
firebase deploy
```
This will upload the built files to Firebase Hosting, making your app live at your Firebase project's domain.

## Usage 

Use the Scout Pages to collect data on various aspects of the teams and Data Analytics Page to visualize the data. Pit Scout Data visualization is currently not supported, so a visualization software such as Tableau would be needed to view that data from the database.  
