import { useNavigate } from "react-router-dom";

function ForecastingPage() {
  const navigate = useNavigate();

  const handleOldDataClick = () => {
    navigate("/dashboard/forecastpage");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle file upload logic here if needed
    navigate("/dashboard/forecastpage");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-6">
      <button
        className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-all"
        onClick={handleOldDataClick}
      >
        Use Old Data
      </button>

      <h3 className="text-lg font-semibold">or</h3>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 bg-gray-100 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-medium">Provide the Updated Data</h2>
        <input type="file" name="file" className="p-2 border rounded-md" />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForecastingPage;
