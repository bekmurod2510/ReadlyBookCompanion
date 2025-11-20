 interface StatsProps {
   totalPageCount: string | number;
   booksFinishedCount: string | number;
   currentBookTitle: string;
 }

function StatsOverview({ totalPageCount, 
                         booksFinishedCount, 
                         currentBookTitle 
                        }: StatsProps ) {
  return (
    // Outer container ensures padding and responsiveness
    <div className="w-full p-4 lg:p-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

        {/* ------------------------------------- */}
        {/* CARD 1: Total Pages Read (Blue Focus) */}
        {/* ------------------------------------- */}
        <div className='p-6 rounded-2xl bg-white shadow-xl border border-gray-100 flex flex-col items-start max-h-72 relative overflow-hidden group'>
            
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-bl-full opacity-60 transform translate-x-1/2 -translate-y-1/2"></div>

            <p className='text-xl font-semibold text-gray-600 z-10'>
                Total of:
            </p>
            <p className='text-6xl font-extrabold text-blue-700 mt-2 mb-4 z-10'>
                {totalPageCount || 'N/A'}
            </p>
            <p className='text-2xl font-medium text-gray-800 border-b-2 border-blue-400 pb-1 z-10'>
                Pages read this month
            </p>

            <div className="absolute top-6 right-6 text-blue-400 opacity-20 text-5xl z-0">
                📚 
            </div>
        </div>

        {/* ----------------------------------------- */}
        {/* CARD 2: Books Finished (Yellow/Green Focus) */}
        {/* ----------------------------------------- */}
        <div className='p-6 rounded-2xl bg-white shadow-xl border border-gray-100 flex flex-col items-start min-h-72 relative overflow-hidden group'>
            
            <div className="absolute bottom-0 right-0 w-full h-1/2 bg-yellow-100 opacity-70 transform rotate-2 origin-bottom-right -translate-x-4 translate-y-4"></div>

            <p className='text-xl font-semibold text-gray-600 z-10'>
                Books:
            </p>
            <p className='text-6xl font-extrabold text-yellow-600 mt-2 mb-4 z-10'>
                {booksFinishedCount || 0}
            </p>
            <p className='text-2xl font-medium text-gray-800 border-b-2 border-green-500 pb-1 z-10'>
                Finished this year
            </p>

            <div className="absolute top-6 right-6 text-green-500 opacity-20 text-5xl z-0">
                ✅
            </div>
        </div>

       
        <div className='p-6 rounded-2xl bg-white shadow-xl border border-gray-100 flex flex-col items-start min-h-72 relative overflow-hidden group'>
            
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-red-50 opacity-80 rounded-full"></div>

            <p className='text-xl font-semibold text-gray-600 z-10'>
                You are currently reading:
            </p>
            <p className='text-4xl font-extrabold text-blue-700 mt-2 mb-4 z-10 line-clamp-2'>
                "{currentBookTitle || 'No active book'}"
            </p>
            <p className='text-2xl font-medium text-gray-800 border-b-2 border-red-400 pb-1 z-10'>
                Time to read!
            </p>

            <div className="absolute top-6 right-6 text-red-400 opacity-20 text-5xl z-0">
                👁️
            </div>
        </div>

      </div>
    </div>
  );
}

export default StatsOverview;