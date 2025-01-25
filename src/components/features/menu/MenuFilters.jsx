import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../services/firebase'
import { setCategories, setSelectedCategory } from '../../../store/menuSlice'

export default function MenuFilters() {
  const dispatch = useDispatch()
  const { categories, selectedCategory } = useSelector(state => state.menu)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'))
        const categoryList = querySnapshot.docs.map(doc => doc.data().name)
        dispatch(setCategories(categoryList))
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [dispatch])

  return (
    <div className="flex gap-4 mb-6">
      <button
        className={`px-4 py-2 rounded-full ${
          selectedCategory === 'all'
            ? 'bg-orange-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
        onClick={() => dispatch(setSelectedCategory('all'))}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === category
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => dispatch(setSelectedCategory(category))}
        >
          {category}
        </button>
      ))}
    </div>
  )
} 