# ScoutX 2025

FRC Scouting App with robot data collection, visualization, and analysis functionality. 

## Installation 

Steps to clone the repository:

```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

Install dependencies:

```sh
npm install
```

## Set Up 

### Prerequisites  
Make sure you have the following installed on your system:  
- [Node.js](https://nodejs.org/) (LTS version recommended)  
- [npm](https://www.npmjs.com/) (comes with Node.js)  
- [Firebase CLI](https://firebase.google.com/docs/cli) (for deployment)  

### Setting Up API Keys  

#### Firebase API Key  
- Go to the Firebase Console.
- Create a new project or use an existing one.
- Navigate to Project Settings → General → Your apps → Config.
- Copy the `apiKey` and other required credentials.
- Place them in your app's environment/config file.

#### OpenAI API Key  
- Sign up at OpenAI and get your API key from the developer dashboard.
- Store the key securely in your app's environment variables.

### Setting Up Environment Variables  
1. Create a `.env` file in the root of your project and the functions folder
2. Add your Firebase config, verification code, and OpenAI API keys inside the `.env` files:

```sh
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

REACT_APP_VERIFICATION_CODE=your_verification_code
```
```sh
REACT_APP_OPENAI_API_KEY=your_openai_api_key
```

## Start Up  

### Running Locally  
To start the development server and view the app on `localhost:3000`, run:  

```sh
npm start
```
This will launch the app in development mode, with hot-reloading enabled.

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
- Choose an existing Firebase project or create a new one.
- Set `build` as the public directory.
- Configure as a single-page app (`Yes` for "rewrite all URLs to /index.html").
- Skip automatic builds if prompted.

### 3. Deploy to Firebase  
After initialization, create a production build and deploy your app with:

```sh
npm run build
firebase deploy
```
This will upload the built files to Firebase Hosting, making your app live at your Firebase project's domain.

## Usage 

Use the Scout Pages to collect data on various aspects of the teams and Data Analytics Page to visualize the data. Pit Scout Data visualization is currently not supported, so a visualization software such as Tableau would be needed to view that data from the database.  
