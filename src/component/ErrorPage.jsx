// src/component/ErrorPage.jsx
const ErrorPage = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
    <h1 className="text-4xl font-bold text-red-600 mb-4">😵 Oops! Something went wrong.</h1>
    <p className="text-gray-600 mb-6">We couldn’t load this page. Please try again later.</p>
    <a href="/alljobs" className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700">
      Go Back to All Jobs
    </a>
  </div>
);

export default ErrorPage;
