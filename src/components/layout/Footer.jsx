export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FoodDelivery</h3>
            <p className="text-gray-400">Delicious food delivered to your doorstep</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/menu" className="text-gray-400 hover:text-white">Menu</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Phone: +998 90 123 45 67</li>
              <li>Email: info@fooddelivery.com</li>
              <li>Address: Tashkent, Uzbekistan</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
} 