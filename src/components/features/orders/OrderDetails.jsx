export default function OrderDetails({ order }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">
            Order #{order.id.slice(-6)}
          </h3>
          <p className="text-gray-600">
            {order.createdAt.toLocaleDateString()} at {order.createdAt.toLocaleTimeString()}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        {order.items.map(item => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between mb-2">
          <span>Delivery Fee</span>
          <span>${order.deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <h4 className="font-semibold mb-2">Delivery Details</h4>
        <p className="text-gray-600">{order.address}</p>
        <p className="text-gray-600">{order.phone}</p>
        {order.notes && (
          <p className="text-gray-600 mt-2">Notes: {order.notes}</p>
        )}
      </div>
    </div>
  )
} 