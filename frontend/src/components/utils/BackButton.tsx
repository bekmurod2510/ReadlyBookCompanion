import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <button 
      onClick={handleGoBack}
      className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
    >
      ← Back
    </button>
  );
}

export default BackButton