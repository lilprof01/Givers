import { Link } from "react-router-dom";

const Community = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Community Member",
      content: "I found the perfect desk for my home office through Givers. The best part was meeting my neighbor who gave it to me - we're now good friends!",
      image: "/assets/images/testimonial1.avif"
    },
    {
      name: "Mike Chen",
      role: "Frequent Giver",
      content: "Instead of throwing away items during my move, I shared them with my community. Seeing how happy people were to receive them was incredible.",
      image: "/assets/images/testimonial2.avif"
    },
    {
      name: "Emma Davis",
      role: "New Parent",
      content: "As a new parent, Givers helped us find baby items we couldn't afford. The generosity of our community has been overwhelming.",
      image: "/assets/images/testimonial3.avif"
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dark:text-gray-200">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Community Stories
          </h2>
          <p className="text-xl opacity-70 max-w-3xl mx-auto">
            Real stories from real people who have experienced the joy of giving and receiving
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-black rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                  <p className="text-sm opacity-70">{testimonial.role}</p>
                </div>
              </div>
              <p className="opacity-70 italic leading-relaxed">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-black rounded-3xl p-12 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join the Community?
            </h3>
            <p className="text-xl opacity-70 mb-8 max-w-2xl mx-auto">
              Start your journey of giving and receiving today. Build connections, reduce waste, and make a positive impact in your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
                Get Started Now
              </Link>
              <Link to="/#" className="border-2 dark:border-gray-300 hover:bg-black dark:hover:bg-gray-50 hover:text-gray-200 dark:hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;