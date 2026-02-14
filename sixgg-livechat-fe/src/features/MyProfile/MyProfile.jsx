import { MyProfileContainer, Profile, UserRole } from './MyProfile.styled'
import { Icon } from '@iconify/react'
import { Box } from '../../components/common/Box'
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/slices/userSlice';

function MyProfile() {
  const user = useSelector(selectUser);
  return (
    <MyProfileContainer>
        <UserRole><Icon icon="carbon:user-avatar-filled" fontSize={60} />{user?.role}</UserRole>
        <Profile>
            <h1 className="title">Profile</h1>
            <Box $spacingX="0" $spacingY="0" $flexWrap="wrap" $justifyContent="flex-start">
                <div className="detail">
                    <label htmlFor="">Username</label>
                    <span>{user?.username}</span>
                </div>
                <div className="detail">
                    <label htmlFor="">Email</label>
                    <span>{user?.email}</span>
                </div>
            </Box>
        </Profile>
    </MyProfileContainer>
  )
}

export default MyProfile