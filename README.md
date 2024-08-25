## QUICK start
> npx create-expo-app@latest
> npx expo start

# install dependencies
> npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

Si está desarrollando la aplicación para la Web, instale las siguientes dependencias:
> npx expo install react-native-web react-dom

***NO ES NUESTRO CASO ***

# Borrar caché del empaquetador
> npx expo start -c

# ***Crear páginas con Expo Router***

instalamos react-hook-form para validaciones simples
# react-hook-form [link:](https://react-hook-form.com/)
> npx install react-hook-form

para soporta mas la seguridad utilizaremos la libreria yup, para complementarla con react hook form, 
llevando asi las validaciones mas segura utilizando modelos de schemas.

> npm i yup [linl:](https://www.npmjs.com/package/yup)

pero para añardilo con toca utilizar performant y esto lo logramos instalando
> npm i @hookform/resolvers

instalamos jwt-decode para utilizar autentication con JWT
> npm i jwt-decode [link:](https://www.npmjs.com/package/jwt-decode)

intalamos axios
> npm i axios

usamos el diseño de cajón en Expo Router.
> npx expo install drawer react-native-gesture-handler 

### lectura de variables de entorno de archivo .env
Cree un archivo .env en la raíz del directorio de su proyecto y agregue variables específicas del entorno en nuevas líneas en forma de :EXPO_PUBLIC_[NAME]=VALUE

- EXPO_PUBLIC_API_KEY=abc123

#### AsyncStorage
Una biblioteca que proporciona una API de almacenamiento de clave-valor asíncrona, sin cifrar, persistente.
> npx expo install @react-native-async-storage/async-storage

- configuración del emulador android
para poder conectar una api con express y una frontal con react native, se puede acceder a la maquina host utilizando la dirrecion ip especial 10.0.2.2

para los toast de notificacion personalizados
utilizamos una libreria de diseño UX, React Native Elements [link:](https://reactnativeelements.com/)
> npm install @rneui/base @rneui/themed

tambien existen otras alternativas
> https://reactnativepaper.com/
> https://docs.nativebase.io/ npm i native-base

+
> npm i react-native-alert-notification
> npm uninstall react-native-alert-notification

+++ > npm i react-native-toast-notifications


- app/
-  ├── _layout.js
   ├── index.js
 └── home/
     ├── _layout.js
     ├── index.js
     └── (director)/
         ├── index.js
         ├── [director].js
     └── (teacher)/
         ├── index.js
         ├── [teacher].js
     └── (supervisor)/
         ├── index.js
         ├── [supervisor].js

Ahora utilizaremos la navegation, para ellos instalamos las siguientes librerias
 React Navigation[link:](https://reactnavigation.org/)
 # Installation
> npm install @react-navigation/native

 # Installing the native stack navigator library
 > npm install @react-navigation/native-stack
 
 instalamos la libreria drawer de react native
> npm install @react-navigation/drawer

- [`react-native-reanimated` docs](https://docs.swmansion.com/react-native-reanimated/)

# Step 1: Install the package
> npx expo install react-native-reanimated

# Step 2: Add Reanimated's babel plugin
- plugins: [
      'react-native-reanimated/plugin',
    ],

# Step 3: Clear Metro bundler cache (recommended)
> npx expo start -c


> npm install react-native-tab-view
A continuación, instale react-native-pager-view si planea admitir iOS y Android.
Si utiliza Expo, para asegurarse de que obtiene las versiones compatibles de las bibliotecas, ejecute:
> expo install react-native-pager-view
Si no está utilizando Expo, ejecute lo siguiente:
> npm install react-native-pager-view


Get started with React Native Material
> npm install @react-native-material/core

> npm install @rneui/themed @rneui/base

los Stack
> npm install @react-navigation/stack

#### DateTimePicker
npx expo install @react-native-community/datetimepicker

picker
npx expo install @react-native-picker/picker

momentjs (valida y manipula fechas y horas en javascript)
> npm install moment --save

swiper [link:](https://github.com/leecade/react-native-swiper)
> npm i react-native-swiper --save

> npm i react-native-chart-kit

eslint-plugin-react-hooks
> npm install eslint -D
> npx eslint --init
