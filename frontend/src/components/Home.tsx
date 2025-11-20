import { useContext } from "react"
import { UserinfoContext } from "../App"  
import { Link } from "react-router";

//components
import UserProfile from "./utils/UserProfile";
//icons
import { IoAdd } from "react-icons/io5";

function Home() {
    const data : any = useContext(UserinfoContext)
    const allBooks = data.userData.books
    console.log(data)

  return (
    <div>
        <div className="flex flex-row m-2 border border-gray-200 rounded-2xl p-2 justify-between items-center">

        <div className="w-64 px-3 py-2 border border-gray-300 flex items-center justify-start rounded-xl mr-auto ml-4  bg-white shadow-sm">
            <label 
                htmlFor="book-status" 
                className="text-md font-semibold text-gray-700 whitespace-nowrap"
            >
                Choose Status: 
            </label>
            
            <div className="relative pl-2   ">
                <select 
                    id="book-status" 
                    name="book-status"
                    className="appearance-none block w-full bg-blue-50 border border-blue-300 text-blue-700 py-1.5 pl-2 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-150 text-sm font-medium"
                    defaultValue="Reading" 
                >
                    <option value="Reading">Reading</option>
                    <option value="Finished" className="text-red-600">Finished</option>
                    <option value="Unread" className="text-yellow-600">Unread</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        </div>
        
        <div className="ml-auto"><UserProfile/></div>
        </div>

    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {allBooks.map((book: any) => (
    <div 
      key={book.id} 
      className="book-card flex max-w-lg h-48 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500"
    >
      
      <div className="w-32 h-full shrink-0">
        <img 
          src={book.coverUrl || "/placeholder-book.png"} 
          alt={`Cover of ${book.name}`} 
          className="w-full h-full object-cover rounded-md border-2 border-yellow-400 bg-yellow-50"
        />
      </div>

      
      <div className="ml-4 flex flex-col justify-between h-full w-full">
          
          <div>
            <p className="text-xl font-bold text-gray-800 line-clamp-2">{book.name}</p>
            <p className="text-sm text-gray-500 font-medium">{book.author}</p>
          </div>

          <div className="mt-auto pt-2 space-y-1">
            
           
            <p className="text-sm font-semibold text-gray-700">
              Status: 
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${book.status === 'Reading' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                {book.status}
              </span>
            </p>
            
           
            <p className="text-sm text-gray-700">
              Total Pages: <span className="font-semibold text-blue-600">{book.total_pages}</span>
            </p>
            
            
            <div className="flex items-center text-sm font-semibold">
                <span className="text-gray-700 mr-2">Done:</span>
                <span className="text-yellow-600">
                    {Math.floor((book.current_page / book.total_pages) * 100)}%
                </span>
            </div>
          </div>
      </div>
    </div>
  ))}
        <Link to="/addBook" className="w-48 h-48"> 
        <div className="add-book-card h-48 w-48 border-2 border-dashed border-blue-400 rounded-xl flex flex-col justify-center items-center relative transition-all duration-300 hover:bg-blue-50 hover:shadow-lg cursor-pointer">
    
            <div className="p-3 border-2 border-yellow-400 rounded-full bg-white shadow-md">
                <IoAdd className="text-4xl text-blue-600"/>
            </div>

            <p className="absolute text-blue-600 font-semibold bottom-6 text-lg">
                Add Book
            </p>
            
        </div>
        </Link>
    </div>
    </div>
  )
}

export default Home