import{ useContext } from 'react'
import { UserinfoContext } from '../App'
import UserProfile from './utils/UserProfile';

//components
import StatsOverview from './utils/StatsOverview';
//circle progress bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PercentageCircle = ({ percentage }: { percentage: number }) => {
  return (
    <div style={{ width: '50px', height: '50px' }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textSize: '28px',
          pathColor: `blue`,
          textColor: '#374151',
          trailColor: '#d6d6f9',
          backgroundColor: '#3e98c7',
        })}
      />
    </div>
  );
};

function Stats() {
  const { userData } = useContext(UserinfoContext);
  
  // 1. Guard Clause for Loading/Null State
  if (!userData) {
    return <h1>Loading User Data...</h1>; 
  }

  return (
    <div className="h-full p-10">
      <div className='grid grid-flow-row grid-cols-3  gap-4'>

        <div className='col-span-3 row-span-1 h-24 border rounded-2xl border-gray-200 flex items-center p-5 w-full'>
            <div className='ml-auto'><UserProfile /></div>
        </div>

        <div className='row-span-2 col-span-2  border rounded-2xl border-gray-200'>2</div>

        <div className="col-span-1 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      
      <div className="p-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-lg font-semibold text-gray-800">Current Library</h2>
      </div>

      <div className="h-96 w-full overflow-y-auto p-2 custom-scrollbar">
        {userData.books.map((book: any) => {
          
          const percentage = Math.round((book.current_page / book.total_pages) * 100) || 0;
          return(
          <div 
              key={book.id} 
              className="group flex items-center justify-between p-4 mb-2 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
            >
              <div className="flex flex-row gap-1 w-full">
                <p className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {book.name}
                </p>
                
               <div className="flex justify-start ml-auto">
                  <span 
                    className={`
                      px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wide
                      ${book.status === 'Reading' 
                        ? 'bg-blue-100 text-blue-700 border-blue-200'
                        : book.status === 'finished' 
                          ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                          : 'bg-red-100 text-red-400 border-red-200' 
                      }
                    `}
                  >
                    {book.status}
                  </span>
                </div>
              </div>
              <div className="ml-4">
                 <PercentageCircle percentage={percentage} />
              </div>
            </div>
        )})}
      </div>
    </div>

        <div className='col-span-1 border p-5 rounded-2xl border-gray-200 flex flex-col items-start min-h-72 '>
          <p className='text-5xl '>
            Total of:
          </p>
          <p className='text-6xl'>3000+</p>
          <p className='text-4xl'>Pages read this month</p>
        </div>
        <div className='col-span-3 row-span-1 min-h-24 border rounded-2xl border-gray-200 flex items-center w-full'>
          <StatsOverview totalPageCount={2}
        booksFinishedCount={32}
        currentBookTitle={"something"}/>
        </div>
      </div>
    </div>
  )
}

export default Stats