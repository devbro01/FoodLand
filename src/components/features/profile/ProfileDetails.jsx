import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../../services/firebase'
import { setUser } from '../../../store/authSlice'
import Input from '../../common/Input'
import Button from '../../common/Button'

export default function ProfileDetails() {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.displayName
      })

      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, {
        displayName: formData.displayName,
        phoneNumber: formData.phoneNumber,
        address: formData.address
      })

      dispatch(setUser({
        ...user,
        displayName: formData.displayName,
        phoneNumber: formData.phoneNumber,
        address: formData.address
      }))

      setIsEditing(false)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        {!isEditing && (
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          value={user?.email}
          disabled
        />

        <Input
          label="Full Name"
          value={formData.displayName}
          onChange={(e) => setFormData({...formData, displayName: e.target.value})}
          disabled={!isEditing}
        />

        <Input
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
          disabled={!isEditing}
        />

        <Input
          label="Default Address"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          disabled={!isEditing}
        />

        {isEditing && (
          <div className="flex gap-4 mt-6">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsEditing(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </div>
  )
} 