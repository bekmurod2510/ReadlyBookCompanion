import { useContext } from "react"
import { UserinfoContext } from "../../App"

function UserProfile() {
    const {userData} = useContext(UserinfoContext)
  return (
    <div className="flex items-center p-3 w-fit bg-white  border-gray-100">
    
    <div className='h-14 w-14 rounded-full bg-blue-500 flex items-center justify-center text-xl font-extrabold text-yellow-300 shrink-0'>
        {userData.name ? userData.name[0].toUpperCase() : 'U'}
    </div>

    <div className='px-4 flex flex-col items-start'>
      <p className='text-xl font-bold text-gray-800 line-clamp-1'>
          {userData.name}
      </p>
      <p className='text-sm text-gray-500 font-medium'>
          {userData.email}
      </p>
    </div>
</div>
  )
}

export default UserProfile