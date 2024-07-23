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