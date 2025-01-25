import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { clearCart } from '../store/cartSlice'
import Input from '../components/common/Input'
import Button from '../components/common/Button'

export default function Checkout() {
  const { items, total } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    notes: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items,
        total,
        deliveryFee: 5,
        status: 'pending',
        createdAt: new Date(),
        ...formData
      })

      dispatch(clearCart())
      navigate('/orders')
    } catch (error) {
      console.error('Error placing order:', error)
    }
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <Input
            label="Delivery Address"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            required
          />
          
          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
          
          <Input
            label="Additional Notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            as="textarea"
          />
          
          <Button type="submit" className="w-full mt-4">
            Place Order
          </Button>
        </form>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {items.map(item => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${(total + 5).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 