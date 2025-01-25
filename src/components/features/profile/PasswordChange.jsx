import { useState } from 'react'
import { updatePassword } from 'firebase/auth'
import { auth } from '../../../services/firebase'
import Input from '../../common/Input'
import Button from '../../common/Button'

export default function PasswordChange() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      await updatePassword(auth.currentUser, formData.newPassword)
      setSuccess(true)
      setFormData({ newPassword: '', confirmPassword: '' })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Change Password</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          Password updated successfully
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          label="New Password"
          value={formData.newPassword}
          onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
          required
        />

        <Input
          type="password"
          label="Confirm New Password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          required
        />

        <Button type="submit" disabled={loading} className="mt-4">
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
      </form>
    </div>
  )
} 