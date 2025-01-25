import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../services/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { setUser, setError } from '../../../store/authSlice'
import Input from '../../common/Input'
import Button from '../../common/Button'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      dispatch(setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email
      }))
      navigate('/')
    } catch (error) {
      dispatch(setError(error.message))
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="flex items-center justify-between">
          <Button type="submit">Sign In</Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  )
} 