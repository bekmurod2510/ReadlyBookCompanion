import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

//components
//import BackButton from "./utils/BackButton"

function AddBook() {
  const [name, setName] = useState("")
  const [author, setAuthor] = useState("")
  const [total_pages, setTotal_pages] = useState(0)
  const [current_pages, setCurrent_pages] = useState(0)
  const [status, setStatus] = useState("Reading")

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  
    const postData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/api/addBook", {
          name: name,
          author: author,
          total_pages: total_pages,
          current_page: current_pages,
          status: status
        }, {
          withCredentials : true
        });
        console.log(response.data); 
        console.log(response.data.success); 
        navigate("/home", { state: { refresh: true } })
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false); // Important: Reset loading state
      }
    }

  const handleSubmit= (e : any) => {
    e.preventDefault();
    setLoading(true);
    postData();

  }

  return (
    <div className="flex flex-col  items-center justify-center min-h-screen bg-gray-50 p-4"> 
      
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
          
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-yellow-400 pb-2">
            Add New Book
          </h2>

          <label className="flex flex-col mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-1">Book Name</p>
            <input
              type="text"
              onChange={(e) =>{setName(e.target.value)}}
              placeholder="e.g. Harry Potter"
              className="px-4 py-2 border border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </label>
          
          <label className="flex flex-col mb-4">
           <p className="text-sm font-semibold text-gray-700 mb-1">Author Name</p>
            <input
              type="text"
              onChange={(e) =>{setAuthor(e.target.value)}}
              placeholder="e.g. Dostoyevsky"
              className="px-4 py-2 border border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </label>
          
          <label className="flex flex-col mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-1">Total Pages</p>
            <input
              type="number"
              className="px-4 py-2 border border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => {setTotal_pages(Number(e.target.value))}}
            />
          </label>
          
          <label className="flex flex-col mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-1">Pages Read</p>
            <input
              type="number"
              className="px-4 py-2 border border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => {setCurrent_pages(Number(e.target.value))}}
            />
          </label>
          
          <label className="flex flex-col mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-1">Status</p>
            <select  
              id="status" 
              className="px-4 py-2 border border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none bg-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="reading">Reading</option>
              <option value="finished" className="text-red-600">Finished</option>
              <option value="unread" className="text-yellow-600">Unread</option>
            </select>
          </label>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`
              rounded-xl text-xl font-bold px-6 py-3 transition-all duration-200 shadow-md 
              ${loading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
              }
            `}
          >
            {loading ? 'Submitting...' : 'Add Book'}
          </button>   
      </form>
     
</div>
  )
}

export default AddBook