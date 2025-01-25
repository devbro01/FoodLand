import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const { user } = useSelector(state => state.auth)
  const { items } = useSelector(state => state.cart)
  const navigate = useNavigate()

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">FoodDelivery</Link>
          
          <div className="flex items-center gap-6">
            <Link to="/menu" className="hover:text-orange-500">Menu</Link>
            <Link to="/cart" className="hover:text-orange-500 relative">
              Cart
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <Link to="/orders" className="hover:text-orange-500">Orders</Link>
                <Link to="/profile" className="hover:text-orange-500">Profile</Link>
              </>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 