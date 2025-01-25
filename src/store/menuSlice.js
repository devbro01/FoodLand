import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  categories: [],
  loading: false,
  error: null,
  selectedCategory: 'all'
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action) => {
      state.items = action.payload
      state.loading = false
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const { 
  setMenuItems, 
  setCategories, 
  setSelectedCategory, 
  setLoading, 
  setError 
} = menuSlice.actions

export default menuSlice.reducer 