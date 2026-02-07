"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How does Car Atlas work?",
    answer: "Car Atlas aggregates listings from multiple trusted dealers like Cars24, Spinny, and Cardekho. You can search, compare prices, and find the perfect used car all in one place. Simply enter your preferences or browse all available cars.",
  },
  {
    question: "How can I find the best deals on used cars?",
    answer: "Use our search filters to sort by price, year, KM driven, or location. The 'Best Deals' section shows cars sorted by lowest price first. You can also set up price alerts to get notified when cars matching your criteria become available.",
  },
  {
    question: "Are all listings verified?",
    answer: "Yes, all listings come from verified and trusted dealers. We only aggregate listings from reputable sources like Cars24, Spinny, and Cardekho, ensuring quality and authenticity.",
  },
  {
    question: "Can I compare prices from different dealers?",
    answer: "Absolutely! That's one of our main features. When you search for a car, you'll see listings from multiple dealers side-by-side, making it easy to compare prices, specifications, and dealer information.",
  },
  {
    question: "What happens after I click on a listing?",
    answer: "When you click on a listing, you'll be redirected to the dealer's website where you can view more details, contact the dealer, schedule a test drive, or complete your purchase. We track clicks to help improve our service.",
  },
  {
    question: "How do I search for a specific car?",
    answer: "You can use the search form to enter brand, model, and year. All fields are optional - if you leave them blank, you'll see all available cars. You can then use filters to narrow down your search by price, KM driven, location, fuel type, and more.",
  },
  {
    question: "Can I filter cars by location?",
    answer: "Yes! Use the 'Browse by Type' section to select a popular location, or use the search filters to filter by city or state. This helps you find cars near you for easy inspection and test drives.",
  },
  {
    question: "How accurate is the pricing information?",
    answer: "Pricing information is updated daily from our partner dealers. However, prices may change on the dealer's website, so we recommend verifying the final price directly with the dealer.",
  },
  {
    question: "Do you charge any fees for using the platform?",
    answer: "No, Car Atlas is completely free to use. We don't charge any fees for searching, comparing, or viewing listings. Our service is supported by our dealer partners.",
  },
]

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`bg-card rounded-xl border-2 overflow-hidden transition-all hover:border-primary/50 ${
        isOpen ? "border-primary/50" : "border-border"
      }`}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onToggle()
        }}
        className="w-full px-4 sm:px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors rounded-xl"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-foreground pr-4 flex-1">{faq.question}</span>
        <ChevronDown
          size={24}
          className={`text-muted-foreground flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="px-4 sm:px-6 pb-5 pt-0">
          <div className="pt-4 border-t border-border">
            <p className="text-foreground/90 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id="faq" className="bg-muted/50 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Everything you need to know about using Car Atlas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
