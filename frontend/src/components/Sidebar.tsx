import {Link } from "react-router";

function Sidebar() {
  return (
    <div className="h-full w-52 bg-white border-r border-gray-200 flex flex-col items-center p-4 shadow-lg sticky">
    
    <div className="flex flex-col items-center justify-center w-full mb-8">
        <div className="flex relative pb-1 justify-center items-start gap-1">
            
            <h1 className="font-['Georgia'] text-4xl font-normal tracking-wide text-gray-800">
                <span className="font-extrabold text-blue-700">Readly</span>
            </h1>
            
            <div className="absolute bottom-0 h-1 bg-yellow-400 w-46 opacity-50"></div>
        </div>
    </div>
    
    <div className="flex flex-col space-y-3 w-full px-2">
        
        <Link 
            to="/home" 
            className="text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors duration-150"
        >
            Home
        </Link>
        
        <Link 
            to="/stats" 
            className="text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors duration-150"
        >
            Stats
        </Link>
        
    </div>
</div>
  )
}

export default Sidebar