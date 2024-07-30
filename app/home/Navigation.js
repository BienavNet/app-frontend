import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text } from "react-native";
import { useAuth } from "../../src/hooks/useAuth";
import { HomeDirector } from "./director/index";
import { Redirect } from "expo-router";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//icons
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const IndexHome = () => {
  const { user } = useAuth();
  console.log("user rol", user.rol);

  if (!user) return <Redirect href="/" />;

  let ComponentToRender;

  switch (user.rol) {
    case "director":
      ComponentToRender = HomeDirector;
      break;
    // case "docente":
    //   ComponentToRender = "/(docente)";
    //   break;
    // case "supervisor":
    //   ComponentToRender = "/(supervisor)";
    //   break;
    default:
      ComponentToRender = () => (
        <View>
          <Text>Rol desconocido o sin acceso.</Text>
        </View>
      );
      return;
  }

  return (
    <>
      <View>
      <View>
        <Text>header</Text>
      </View>
      <ComponentToRender/>
    
    </View>
    </>
  );
};
const Drawer2 = () => {
  return (
    <>
      <View>
        <Text>Drawer 2</Text>
      </View>
    </>
  );
};
const Drawer3 = () => {
  return (
    <>
      <View>
        <Text>Drawer 3</Text>
      </View>
    </>
  );
};


function MyTabsHome() {
  const Tab = createBottomTabNavigator();
  const { user } = useAuth();
  if (!user) return <Redirect href="/"/>;

  let tabs = [{
    name:"HomeTab",
    component:IndexHome,
    options:{
      headerShown: false,
      title: "my home",
      tabBarLabel: "Home",
      tabBarIcon: ({ color }) => (
        <FontAwesome6 name="house" size={24} color={color} />
      ),
      tabBarBadge: 4,
    }
  }];
  switch (user.rol) {
    case 'director':
      tabs.push(
        {
          name: 'Docentes',
          component: Drawer2,
          options: {
            headerShown: false,
            title: 'docentes',
            tabBarLabel: 'Docentes',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="human-male-board" size={24} color={ color } />
            ),
          },
        },
        {
          name: 'Horarios',
          component: Drawer3,
          options: {
            headerShown: false,
            title: 'horario',
            tabBarLabel: 'Horarios',
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="calendar-days" size={24} color={ color } />
            ),
          },
        },
        {
          name: 'Salones',
          component: Drawer3,
          options: {
            headerShown: false,
            title: 'salones',
            tabBarLabel: 'Salones',
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="landmark" size={24} color={ color } />
            ),
          },
        }
      );
      break;
    // case 'docente':
    //   tabs = [
    //     { name: 'Home', component: IndexHome, options: { title: 'ni Home', tabBarLabel: 'Home', tabBarIcon: ({ color }) => (<FontAwesome6 name="house" size={25} color={color} />), tabBarBadge: 4 }},
    //     { name: 'Subject', component: SomeOtherComponent, options: { title: 'Mis Subjects', tabBarLabel: 'Subjects' }},
    //     // Agrega más pestañas según sea necesario
    //   ];
    //   break;
    // case 'supervisor':
    //   tabs = [
    //     { name: 'Home', component: IndexHome, options: { title: 'ni Home', tabBarLabel: 'Home', tabBarIcon: ({ color }) => (<FontAwesome6 name="house" size={25} color={color} />), tabBarBadge: 4 }},
    //     { name: 'Reports', component: AnotherComponent, options: { title: 'Reports', tabBarLabel: 'Reports' }},
    //     // Agrega más pestañas según sea necesario
    //   ];
    //   break;
    default:
      <Redirect href="/"/>
      break;
  }
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#3111F3',
        tabBarInactiveTintColor: '#000000',
        tabBarLabelStyle: { 
          fontSize: 12,
          fontWeight: 'semibold',
         },
      }}
    >
        {tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={tab.options}
        />
      ))}
 
      {/* <Tab.Screen
        name="Classroom"
        options={{
          headerShown: false,
          title: "mis classroom",
          tabBarLabel: "Classroom",
          // tabBarIcon: ({ color }) => (
          //   <MaterialCommunityIcons
          //     name="google-classroom"
          //     size={24}
          //     color={color}
          //   />
          // ),
        }}
        component={Drawer2}
      />
      <Tab.Screen
        name="Teacher"
        options={{
          headerShown: false,
          title: "mis teacher",
          tabBarLabel: "Teacher",
          // tabBarIcon: ({ color }) => (
          //   <FontAwesome5 name="user-plus" size={24} color={color} />
          // ),
        }}
        component={Drawer3}
      /> */}
    </Tab.Navigator>
  );
}
export default function DraweHome() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
    screenOptions={{
      drawerActiveTintColor:'#3111F3',
      drawerInactiveTintColor:'#000000',
      drawerLabelStyle: { fontSize: 16 },
      headerStyle: { backgroundColor: '#3111F3' },
      headerTitleStyle: { color: '#fff' },
    }}
    >
      <Drawer.Screen
        options={
          {
            drawerIcon: ({ color }) => (
              <FontAwesome6 name="house" size={24} color={color} />
            )
          }
        }
        name="Home"
        component={MyTabsHome}
      />

        <Drawer.Screen
        options={
          {
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="google-classroom"
                size={24}
                color={color}
              />
            ),
          }
        }
        name="Clases"
        component={Drawer2}
      />
        <Drawer.Screen
        options={
          {
            drawerIcon: ({ color }) => (
              <MaterialIcons name="supervised-user-circle" size={24} color={color} />
            )
          }
        }
        name="Supervisor"
        component={Drawer3}
      />
        <Drawer.Screen
        options={
          {
            drawerIcon: ({ color }) => (
              <FontAwesome6 name="commenting" size={24} color={ color } />
            )
          } 
        }
        name="Comentario"
        component={Drawer2}
      />
        <Drawer.Screen
        options={
          {
            drawerIcon: ({ color }) => (
              <FontAwesome6 name="list-alt" size={24} color={ color } />
            )
          }
        }
        name="Detalle Horario"
        component={Drawer3}
      />

<Drawer.Screen
        options={
          {
            drawerIcon: ({ color }) => (
              <FontAwesome6 name="arrow-right-to-bracket" size={24} color={ color } />
            )
          }
        }
        name="Cerrar Sesion"
        component={Drawer3}
      />

  {/* <Drawer.Screen
        options={
          {
            drawerIcon: ({ color }) => (
              <FontAwesome6 name="house" size={25} color={color} />
            )
          }
        }
        name="Home"
        component={MyTabsHome}
      /> */}
      {/* <Drawer.Screen
        options={
          {
            // drawerIcon: ({ color }) => (
            //   <MaterialCommunityIcons
            //     name="google-classroom"
            //     size={24}
            //     color={color}
            //   />
            // ),
          }
        }
        name="Drawer2"
        component={Drawer2}
      />

      <Drawer.Screen
        options={
          {
            // drawerIcon: ({ color }) => (
            //   <FontAwesome5 name="user-plus" size={24} color={color} />
            // ),
          }
        }
        name="Drawer3"
        component={Drawer3}
      /> */}
      {/* <Drawer.Screen name="UserDoc" component={Userdoc} /> */}
    </Drawer.Navigator>
  );
}
