import { View, ScrollView } from "react-native";
import { FormRegisterDetailHorario } from "./components/formRegisterDetailHorario";
import { HeaderTitle } from "../../../share/titulos/headerTitle";

export const RegisterDetailHorario = ({ navigation, route , idhorario, editing, handleCloseModal}) => {

  return (
    <>
    <HeaderTitle
    registerText="Registrar Detalle Horario"
    updateText="Actualizar Detalle Horario"
    editing={editing}
    />
      <ScrollView className="pt-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex pb-5 h-full">
          {console.log("editing ??????? ", editing)}
          {!editing ? (
           <FormRegisterDetailHorario
           handleCloseModal={handleCloseModal}
           navigation={navigation}
           idhorario={idhorario}
           editing={editing}
           /> 
          ) : (
            <>
              {/* <View className="flex-row justify-items-stretch">
                <View className="w-1/2 justify-self-start">
                  <CustomInput
                    variant="outlined"
                    control={control}
                    placeholder="example"
                    label="Nombre"
                    icon={
                      <FontAwesome6
                        name="user-circle"
                        size={24}
                        color="black"
                      />
                    }
                    name="nombre"
                  />
                </View>

                <View className="w-1/2 justify-self-end">
                  <CustomInput
                    variant="outlined"
                    name="apellido"
                    control={control}
                    placeholder="example"
                    label="Apellido"
                  />
                </View>
              </View>

              <View>
                <CustomInput
                  variant="outlined"
                  name="correo"
                  control={control}
                  placeholder="example@example.com"
                  keyboardType="email-address"
                  label="Correo Electronico"
                  icon={
                    <MaterialIcons
                      name="alternate-email"
                      size={24}
                      color="black"
                    />
                  }
                />
              </View> */}
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};
