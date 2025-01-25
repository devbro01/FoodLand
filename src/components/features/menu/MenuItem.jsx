import { useDispatch } from 'react-redux'
import { addItem } from '../../../store/cartSlice'
import Button from '../../common/Button'

export default function MenuItem({ item }) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addItem(item))
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">${item.price}</span>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  )
} 