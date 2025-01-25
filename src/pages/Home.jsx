import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Delicious Food Delivered To Your Door
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Order your favorite meals from the best restaurants in town
        </p>
        <Button 
          onClick={() => navigate('/menu')}
          className="text-lg px-8 py-3"
        >
          Order Now
        </Button>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Fast Delivery</h3>
          <p className="text-gray-600">
            Get your food delivered within 30 minutes
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Quality Food</h3>
          <p className="text-gray-600">
            We partner with the best restaurants in town
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Best Prices</h3>
          <p className="text-gray-600">
            Enjoy great food at competitive prices
          </p>
        </div>
      </div>
    </div>
  )
} 