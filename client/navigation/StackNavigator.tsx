import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "../app/layouts/HomeScreen";
import TransfersScreen from "../app/layouts/TransfersScreen";
import CryptoScreen from "../app/layouts/CryptoScreen";
import InvestScreen from "../app/layouts/InvestScreen";
import LifeStyleScreen from "../app/layouts/LifeStyleScreen";
import LoginScreen from "../app/layouts/LoginScreen";
import RegisterScreen from "../app/layouts/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import IntroScreen from "../app/layouts/IntroScreen";
import VerifyScreen from "@/app/layouts/VerifyScreen";
import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "@/app/redux/slice/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/app/theme/Colors";
import Header from "@/components/Header";
import ProfileScreen from "@/app/layouts/ProfileScreen";
import CryptoDetailScreen from "@/app/layouts/CryptoDetailScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser() as any);
  }, []);

  const BottomTab = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarStyle: {
            height: 70,
            paddingBottom: 10,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            shadowOffset: { width: 0, height: 2 },
            elevation: 4,
            shadowColor: "#000",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="home" size={30} color={color} />
            ),
            header: () => <Header />,
            headerTransparent: true,
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Invest"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="trending-up" size={30} color={color} />
            ),

            header: () => <Header />,
            headerTransparent: true,
          }}
          component={InvestScreen}
        />
        <Tab.Screen
          name="Transfers"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="swap-horizontal" size={30} color={color} />
            ),
            header: () => <Header />,
            headerTransparent: true,
          }}
          component={TransfersScreen}
        />
        <Tab.Screen
          name="Crypto"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="logo-bitcoin" size={30} color={color} />
            ),
            header: () => <Header />,
            headerTransparent: true,
          }}
          component={CryptoScreen}
        />
        <Tab.Screen
          name="LifeStyle"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" size={size} color={color} />
            ),
            header: () => <Header />,
            headerTransparent: true,
          }}
          component={LifeStyleScreen}
        />
      </Tab.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Intro"
          component={IntroScreen}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Verify" component={VerifyScreen} />
      </Stack.Navigator>
    );
  };
  const MainStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={BottomTab}
        />
        <Stack.Screen name="CryptoDetail" component={CryptoDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      {user?.isVerified ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
export default StackNavigator;
const styles = StyleSheet.create({});
