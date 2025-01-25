export default function Button({ children, variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-50'
  }

  return (
    <button
      className={`${variants[variant]} font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      {...props}
    >
      {children}
    </button>
  )
} 