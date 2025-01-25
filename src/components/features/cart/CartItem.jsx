import { useDispatch } from 'react-redux'
import { removeItem, updateQuantity } from '../../../store/cartSlice'
import Button from '../../common/Button'

export default function CartItem({ item }) {
  const dispatch = useDispatch()

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeItem(item.id))
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
    }
  }

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-24 h-24 object-cover rounded"
      />
      
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={() => handleQuantityChange(item.quantity - 1)}
        >
          -
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button 
          variant="outline" 
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          +
        </Button>
      </div>

      <div className="text-right min-w-[100px]">
        <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
        <button 
          onClick={() => dispatch(removeItem(item.id))}
          className="text-red-500 text-sm hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  )
} 