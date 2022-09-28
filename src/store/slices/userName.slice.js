import { createSlice } from '@reduxjs/toolkit';

export const userName = createSlice({
		name: 'userName',
    initialState: "",
    reducers: {
        changeName: (state,action) => {
            const userName = action.payload
            return userName
        }
        
    }
})

export const { changeName } = userName.actions;

export default userName.reducer;