import { User } from "@/app/models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
}
const loadUserAction = async () => {
  try {
    const response = await AsyncStorage.getItem("user");
    return response ? JSON.parse(response) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginActionUser: (state, action) => {
      state.user = action.payload;
      AsyncStorage.setItem("user", JSON.stringify(action.payload));
    },
    setUserAction: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      AsyncStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutActionUser: (state) => {
      state.user = null;
      AsyncStorage.removeItem("user");
    },
  },
});

export const { loginActionUser, logoutActionUser, setUserAction } =
  authSlice.actions;
export default authSlice.reducer;
export const loadUser = () => async (dispatch: any) => {
  const user = await loadUserAction();
  if (user) {
    dispatch(setUserAction(user));
  }
};
