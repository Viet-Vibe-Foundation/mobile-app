# Mobile-app Documentation

## Project Overview

This project uses **Bare React Native (without Expo support)** for the front end and **Node.js + Express.js** for the back end.

---

## 1. Back-End Setup

### Step 1: Create Environment Variables

- Create a `.env` file in the root directory following the structure in `.env.example`.

### Step 2: Install Dependencies

Run the following commands to install all required dependencies:

```sh
npm install --global yarn
yarn install
```

### Step 3: Set Up Database

Run the following command to open Prisma Studio and manage your database:

```sh
npx prisma studio
```

If this is the first time setting up the project, run database migrations:

```sh
npx prisma pull
npx prisma generate
```

### Step 4: Start the Back-End Server

Run the following command to start the server:

```sh
yarn dev
```

Make sure the `.env` file is properly configured before running the server.

---

## 2. Mobile Project Setup

### Step 1: Set Up React Native Environment

Follow the official [React Native setup guide](https://reactnative.dev/docs/set-up-your-environment) to install the required tools (Node.js, Watchman, Android Studio, Xcode, etc.).

### Step 2: Install Dependencies

Navigate to the project directory and run:

```sh
yarn install
```

### Step 3: Run the Project

#### For Android

```sh
yarn android
```

#### For iOS (MacOS only)

Before running on iOS, install CocoaPods dependencies:

```sh
cd ios && pod install && cd ..
```

Then run:

```sh
yarn ios
```

---

## Notes

- Ensure your `.env` file is correctly configured before running the project.
- If you encounter issues, check the official documentation for [React Native](https://reactnative.dev/) and [Prisma](https://www.prisma.io/docs/).
