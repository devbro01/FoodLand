import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../../../services/firebase'
import { setOrders, setLoading, setError } from '../../../store/ordersSlice'
import OrderDetails from './OrderDetails'

export default function OrderList() {
  const dispatch = useDispatch()
  const { orders, loading, error } = useSelector(state => state.orders)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return
      
      dispatch(setLoading(true))
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        )
        
        const querySnapshot = await getDocs(q)
        const ordersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate()
        }))
        
        dispatch(setOrders(ordersList))
      } catch (error) {
        dispatch(setError(error.message))
      }
    }

    fetchOrders()
  }, [dispatch, user])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (orders.length === 0) return <div>No orders found</div>

  return (
    <div className="space-y-6">
      {orders.map(order => (
        <OrderDetails key={order.id} order={order} />
      ))}
    </div>
  )
} 