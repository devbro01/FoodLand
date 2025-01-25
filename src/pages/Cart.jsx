import { useSelector } from 'react-redux'
import CartItem from '../components/features/cart/CartItem'
import CartSummary from '../components/features/cart/CartSummary'

export default function Cart() {
  const { items } = useSelector(state => state.cart)

  if (items.length === 0) {
    return (
      <div className="py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600">Add some delicious items from our menu!</p>
      </div>
    )
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  )
} 