import { Gift, Users, Heart, Search } from "lucide-react";

const Benefits = () => {
  const giverBenefits = [
    {
      icon: Gift,
      title: "Declutter with Purpose",
      description:
        "Turn unused items into meaningful gifts for others in your community.",
    },
    {
      icon: Heart,
      title: "Make a Difference",
      description:
        "Experience the joy of giving and knowing your items find new life.",
    },
  ];

  const receiverBenefits = [
    {
      icon: Search,
      title: "Find What You Need",
      description:
        "Discover useful items without the cost, perfect for your specific needs.",
    },
    {
      icon: Users,
      title: "Connect with Community",
      description:
        "Build relationships with neighbors and create lasting connections.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Benefits for Everyone
          </h2>
          <p className="text-xl opacity-50 max-w-3xl mx-auto">
            Whether you're giving or receiving, Givers creates value for the
            entire community
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* For Givers */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-black/40 dark:to-black/40 rounded-3xl p-8 text-gray-900 dark:text-gray-200">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2">For Givers</h3>
              <p className="opacity-50">Share your unused items with purpose</p>
            </div>

            <div className="space-y-6">
              {giverBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white dark:bg-black rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For Receivers */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-black/40 dark:to-black/40 rounded-3xl p-8 text-gray-900 dark:text-gray-200">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2">For Receivers</h3>
              <p className="opacity-50">
                Find exactly what you need for free
              </p>
            </div>

            <div className="space-y-6">
              {receiverBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white dark:bg-black rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      {benefit.title}
                    </h4>
                    <p className="opacity-50">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
