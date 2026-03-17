"use client"

import { Star, Quote, Compass } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Mumbai, Maharashtra",
    car: "2022 Hyundai Creta",
    rating: 5,
    text: "I was overwhelmed searching multiple websites until I met Atlas. It searched ALL dealers at once and found THE perfect used car in 10 minutes. Atlas even told me I was getting ₹60,000 below market price. Incredible!",
    avatar: "RK",
    savingAmount: "₹60,000",
  },
  {
    name: "Priya Sharma",
    location: "Bangalore, Karnataka",
    car: "2021 Honda City",
    rating: 5,
    text: "Atlas felt like chatting with a knowledgeable friend, not a robot. It searched all used car listings across Bangalore and when I was confused between 3 cars, Atlas compared them all. Made my decision so easy!",
    avatar: "PS",
    savingAmount: "₹35,000",
  },
  {
    name: "Amit Patel",
    location: "Delhi NCR",
    car: "2023 Tata Nexon",
    rating: 5,
    text: "The best part? One search across ALL dealers. No pressure, no sales tactics. Just Atlas understanding what I needed and showing me all available used cars. The price analysis feature saved me from overpaying. 10/10!",
    avatar: "AP",
    savingAmount: "₹48,000",
  },
  {
    name: "Sneha Reddy",
    location: "Hyderabad, Telangana",
    car: "2022 Maruti Swift",
    rating: 5,
    text: "Atlas remembered all my preferences and searched every used car dealer in Hyderabad! When I came back a week later, it picked up right where we left off. Found my dream car and negotiated the price for me. Amazing!",
    avatar: "SR",
    savingAmount: "₹28,000",
  },
  {
    name: "Vikram Singh",
    location: "Pune, Maharashtra",
    car: "2021 Kia Seltos",
    rating: 5,
    text: "I'm not tech-savvy, but talking to Atlas was so natural. It searched all used car dealers at once and guided me through everything - from choosing to test drives. Felt like having an expert friend by my side!",
    avatar: "VS",
    savingAmount: "₹52,000",
  },
  {
    name: "Meera Nair",
    location: "Chennai, Tamil Nadu",
    car: "2022 Hyundai Venue",
    rating: 5,
    text: "Atlas considered my entire family's needs and searched ALL used cars in Chennai in one go - safety for kids, fuel efficiency, parking ease. It's not just smart, it's thoughtful. Found a car we all love within our budget!",
    avatar: "MN",
    savingAmount: "₹42,000",
  },
]

export default function AtlasTestimonials() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 text-sm font-medium rounded-full bg-[var(--atlas-green)]/20 text-[var(--atlas-green-dark)] border border-[var(--atlas-green)]/30">
            ⭐ Customer Success Stories
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--atlas-navy)] mb-4">
            Real People, Real Results
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            See how Atlas helped thousands of Indians find their perfect used car by searching all dealers in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative p-6 rounded-xl bg-card border-2 border-transparent hover:border-[var(--atlas-cyan)] hover:shadow-2xl transition-all duration-300 group"
            >
              <Quote className="absolute top-4 right-4 size-10 text-[var(--atlas-cyan)]/20 group-hover:text-[var(--atlas-cyan)]/30 transition-colors" />

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="size-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={{ background: "linear-gradient(to bottom right, var(--atlas-cyan), #0099CC)" }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-[var(--atlas-navy)]">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="size-4 fill-[#FFD700] text-[#FFD700]" />
                ))}
              </div>

              <p className="text-sm text-gray-700 mb-5 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--atlas-cyan)]/10 text-[var(--atlas-cyan)]">
                  {testimonial.car}
                </span>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Saved</div>
                  <div className="text-sm font-bold text-[var(--atlas-green)]">{testimonial.savingAmount}</div>
                </div>
              </div>

              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-white px-3 py-1 rounded-full shadow-lg border border-[var(--atlas-cyan)] flex items-center gap-1.5">
                  <Compass className="size-3 text-[var(--atlas-cyan)]" />
                  <span className="text-xs font-medium text-[var(--atlas-navy)]">Guided by Atlas</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-3xl p-10 border-2 border-[var(--atlas-cyan)]/30"
          style={{
            background: "linear-gradient(to right, var(--atlas-cyan)/10, var(--atlas-green)/10, var(--atlas-cyan)/10)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-7 fill-[#FFD700] text-[#FFD700]" />
                ))}
                <span className="text-4xl font-bold text-[var(--atlas-navy)] ml-2">4.9</span>
              </div>
              <p className="text-gray-600 font-medium">
                Average rating from 15,247 verified buyers
              </p>
            </div>

            <div className="hidden md:block w-px h-20 bg-gray-300" />

            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--atlas-green)] mb-2">₹6.75 Cr+</div>
              <p className="text-gray-600 font-medium">
                Total savings delivered to customers
              </p>
            </div>

            <div className="hidden md:block w-px h-20 bg-gray-300" />

            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--atlas-cyan)] mb-2">15,000+</div>
              <p className="text-gray-600 font-medium">
                Happy customers this month alone
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
