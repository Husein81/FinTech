import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <StackNavigator />
        </GestureHandlerRootView>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
