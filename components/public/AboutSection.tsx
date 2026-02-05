export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-br from-[#ED264F]/5 to-blue-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Car Atlas
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Car Atlas is India's leading platform for finding and comparing used cars. 
              We aggregate listings from trusted dealers like Cars24, Spinny, and Cardekho, 
              giving you access to thousands of verified vehicles in one place.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to make car buying transparent, easy, and affordable. 
              Compare prices, verify listings, and connect with trusted dealers across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
