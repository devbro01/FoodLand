import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="py-20 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button onClick={() => navigate('/')}>
        Go Back Home
      </Button>
    </div>
  )
} 