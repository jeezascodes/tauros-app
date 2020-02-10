
## Instructions

  

After cloning this project you'll need to run:

  

### `cd TaurosApp`

  

### `npm install`

  

### `npx react-native run-android`

  

## TroubleShooting


  

### React Native android build failed. SDK location not found

  


-   Go to the  `android/`  directory of your react-native project
-   Create a file called  `local.properties`  with this line:
 -  Open the file
-  paste your Android SDK path like below
    
    -   in Windows  `sdk.dir = C:\\Users\\USERNAME\\AppData\\Local\\Android\\sdk`
    -   in macOS  `sdk.dir = /Users/USERNAME/Library/Android/sdk`
    -   in linux  `sdk.dir = /home/USERNAME/Android/Sdk`

Replace  `USERNAME`  with your user name

  

### Dependencies used in this project

  

Just in case `npm install` doesn´t correctly install al dependencies you can try installing them manually like so:

  

## 1.React Navigation

- `npm install @react-navigation/native`

- `npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`
- `npm install @react-navigation/stack`
- `npm install @react-navigation/material-top-tabs react-native-tab-view`

### - See full Documentation here: [https://reactnavigation.org/docs/en/getting-started.html](https://reactnavigation.org/docs/en/getting-started.html)


## 2. Paper UI
- `npm install react-native-paper`
- `npm install react-native-vector-icons`
- `npx react-native link react-native-vector-icons`