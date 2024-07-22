import { Link, Stack } from "expo-router";
import Checkbox from "expo-checkbox";
import { View, Text, TextInput, Button, Alert, Pressable } from "react-native";
import { buttonColor, backgroundColor } from "../components/colorPalette";
import { useState } from "react";

function index(){

    const [isSelectedDoc, setSelectionDoc] = useState(false)
    const [isSelectedAdm, setSelectionAdm] = useState(false)
    const [isSelectedSup, setSelectionSup] = useState(false)

    return (


        <View style= {{backgroundColor: backgroundColor}} className="w-full h-full">
            {/* <Stack.Screen options={
                {
                    headerShown: true,

                }
            }/> */}
            <View className="items-center justify-center my-44">
                <Text className="text-4xl text-center ">
                    App Salones UPC Aguachica
                </Text>
            </View>

            <View className="m-2 p-3">
                <TextInput className="border-2 border-gray-400 pl-3 m-2 rounded-lg  bg-white" placeholder="Correo Electrónico"/>
                <TextInput className="border-2 border-gray-400 pl-3 m-2 mb-3 rounded-lg  bg-white" placeholder="Contraseña" secureTextEntry={true} />
                <View style={{flexDirection: "row"}} className="p-3">
                    <View style={{flexDirection: "column"}} className="items-center">
                        <Checkbox
                            value={isSelectedAdm}
                            onValueChange={() => {
                                setSelectionAdm(true)
                                setSelectionDoc(false)
                                setSelectionSup(false)
                            }}
                            color={buttonColor}

                        />
                        <Text> Administrador/Director </Text>
                    </View>
                    <View style={{flexDirection: "column"}} className="items-center mx-5">
                        <Checkbox
                            value={isSelectedDoc}
                            onValueChange={() => {
                                setSelectionAdm(false)
                                setSelectionDoc(true)
                                setSelectionSup(false)
                            }}
                            color={buttonColor}

                        />
                        <Text> Docente </Text>
                    </View>
                    <View style={{flexDirection: "column"}} className="items-center">
                        <Checkbox
                            value={isSelectedSup}
                            onValueChange={() => {
                                setSelectionAdm(false)
                                setSelectionDoc(false)
                                setSelectionSup(true)
                            }}
                            color={buttonColor}

                        />
                        <Text> Supervisor </Text>
                    </View>
                </View>
                <Link asChild href='/register'>
                    <Pressable>
                        <Text>Registrar</Text>
                        {/* <Button
                            title="Iniciar Sesión"
                            color={buttonColor}
                            // onPress={() => Alert.alert("Pronto se definira la funcionalidad.")}
                            className="p-10 rounded-lg"
                        /> */}
                    </Pressable>    
                </Link>
                
            </View>

        </View>

    )
}


export default index;