import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Register User
const registerUserAPI = async (userData) => {

  try {
    const response = await fetch('https://bloggingsite7.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to register user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};


export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData) => {
    const response = await registerUserAPI(userData); // Missing import or definition
    return response.data;
  }
);


// Login User API
const loginUserAPI = async (credentials) => {
  try {
    const response = await fetch('https://bloggingsite7.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    
    const data = await response.json();
    console.log("USER DATA AT AFTER LOGIN", data)
    console.log("User Id", data.data._id)
    console.log("User Token", data.token)
    if (response.status === 200) {
      const _id = data.data._id
      const token = data.token

      console.log("TOKEN", token)
      // Store the token in localStorage or secure storage
      localStorage.setItem('accessToken', token);
      localStorage.setItem("userId", _id);
      console.log("LOGIN SUCCESSFULL")
 
    } else {
      console.log('Login failed:', data.message);
      // Handle login failure, show error message, etc.
    }

    return data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

// Login User
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await loginUserAPI(credentials); // Use the loginUserAPI function
    return response.data;
  }
);


// Logout User API
const logoutUserAPI = async () => {
  const token = localStorage.getItem("accessToken");
  if(token){
    try {
        const response = await fetch('https://bloggingsite7.onrender.com/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to logout');
        }
      } catch (error) {
        throw new Error('Logout failed');
      }
  }else {
    console.warn("No access token available.");
  }
  
};
// Logout User
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    await logoutUserAPI(); // Missing import or definition
  }
);
// Slice
const initialState = {
  user: null,
  status: 'idle',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'idle';
      });
  },
});


// Incorrect: Unexpected empty object pattern
const { } = userSlice.actions;


export const selectUser = (state) => state.user.user;
export const selectAuthStatus = (state) => state.auth.status;

export const performActionIfLoggedIn = (actionToPerform) => (dispatch, getState) => {
  const user = selectUser(getState());
  if (user) {
    dispatch(actionToPerform());
  }
};

// Export Slices
export const userReducer = userSlice.reducer;
export const authReducer = authSlice.reducer;

