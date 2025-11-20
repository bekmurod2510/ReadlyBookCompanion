import { useNavigate } from "react-router"
import { useState } from "react"
import axios from "axios"

function LoginForm() {
  const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // ← THIS IS CRITICAL! Prevents page reload
        
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/api/login', {
                email: email,
                password: password
            });
            
            console.log('Full response:', response);
            console.log('Response data:', response.data);
            
            if(response.data.success || response.status === 201){
                navigate('/home');
            } else {
                console.log('Signup failed:', response.data.message);
            }
        } catch (error: any) {
            console.error('Signup error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className='h-full w-full border justify-center items-center flex'>
            <form onSubmit={handleSubmit} className="flex-col flex max-w-2xs">
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="border py-2 px-4 rounded-4xl m-1.5" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    className="border py-2 px-4 rounded-4xl m-1.5" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className={`border py-1 px-3 rounded-4xl m-1.5 max-w-2xs cursor-pointer ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isLoading ? 'Logging In...' : 'Log In'}
                </button>
            </form>
        </div>
  )
}

export default LoginForm