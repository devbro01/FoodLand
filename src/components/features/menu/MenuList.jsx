import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../services/firebase'
import { setMenuItems, setLoading, setError } from '../../../store/menuSlice'
import MenuItem from './MenuItem'
import MenuFilters from './MenuFilters'

export default function MenuList() {
  const dispatch = useDispatch()
  const { items, loading, error, selectedCategory } = useSelector(state => state.menu)

  useEffect(() => {
    const fetchMenuItems = async () => {
      dispatch(setLoading(true))
      try {
        const querySnapshot = await getDocs(collection(db, 'menu'))
        const menuItems = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        dispatch(setMenuItems(menuItems))
      } catch (error) {
        dispatch(setError(error.message))
      }
    }

    fetchMenuItems()
  }, [dispatch])

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <MenuFilters />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredItems.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
} 