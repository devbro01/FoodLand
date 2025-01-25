import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import ProfileDetails from '../components/features/profile/ProfileDetails'
import PasswordChange from '../components/features/profile/PasswordChange'

export default function Profile() {
  const { user } = useSelector(state => state.auth)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="space-y-6">
        <ProfileDetails />
        <PasswordChange />
      </div>
    </div>
  )
} 