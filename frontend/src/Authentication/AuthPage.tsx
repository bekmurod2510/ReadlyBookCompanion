import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

function AuthPage() {
  return (
    <div className='flex w-full h-screen px-36 py-36'>
        <LoginForm/>
        <SignupForm/>
    </div>
  )
}

export default AuthPage