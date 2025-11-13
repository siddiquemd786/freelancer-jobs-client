// src/component/TopCategories.jsx
// src/components/TopCategories.jsx
const categories = [
  {
    name: "Web Development",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Graphic Design",
    img: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Content Writing",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Digital Marketing",
    img: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?auto=format&fit=crop&w=800&q=80",
  },
];

const TopCategories = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-[#081C34]  text-gray-800 dark:text-gray-100 transition-all duration-500 px-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-indigo-700">
        Top Categories
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-lg font-semibold">{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default TopCategories;
