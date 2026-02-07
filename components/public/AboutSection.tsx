export default function AboutSection() {
  return (
    <section id="about" className="bg-card py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 md:p-10 lg:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              About Car Atlas
            </h2>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6">
              Car Atlas is India's leading platform for finding and comparing used cars. 
              We aggregate listings from trusted dealers like Cars24, Spinny, and Cardekho, 
              giving you access to thousands of verified vehicles in one place.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              Our mission is to make car buying transparent, easy, and affordable. 
              Compare prices, verify listings, and connect with trusted dealers across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
