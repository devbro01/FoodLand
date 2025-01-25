import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../../common/Button'

export default function CartSummary() {
  const { items, total } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const deliveryFee = 5
  const subtotal = total
  const finalTotal = subtotal + deliveryFee

  const handleCheckout = () => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal ({items.length} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button 
        onClick={handleCheckout}
        className="w-full mt-6"
        disabled={items.length === 0}
      >
        Proceed to Checkout
      </Button>
    </div>
  )
} 