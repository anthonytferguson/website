import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Hammer, Trash2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const services = [
  {
    id: "lawn",
    title: "Lawn and Garden Maintenance",
    description: "Professional mowing, edging, and lawn care to keep your garden looking pristine.",
    icon: Sprout,
    image: "https://tendr-images-bucket.s3.ap-southeast-2.amazonaws.com/lawn-maint.jpg",
    price: "From $50"
  },
  {
    id: "decks",
    title: "Decks & Fences",
    description: "Custom design and construction of high-quality decks and fences for your home.",
    icon: Hammer,
    image: "https://tendr-images-bucket.s3.ap-southeast-2.amazonaws.com/decks.jpg",
    price: "Custom Quote"
  },
  {
    id: "rubbish",
    title: "Rubbish Removal",
    description: "Fast and efficient removal of garden waste, household junk, and construction debris.",
    icon: Trash2,
    image: "https://tendr-images-bucket.s3.ap-southeast-2.amazonaws.com/rubbish.jpg",
    price: "From $80"
  }
];

const features = [
  "Fully Insured Professionals",
  "Transparent Pricing",
  "Easy Online Booking",
  "Satisfaction Guaranteed",
  "Eco-friendly Practices",
  "Reliable & Punctual"
];

const words = ["garden of your", "lawn of your", "home of your"];

export function LandingPage() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://tendr-images-bucket.s3.ap-southeast-2.amazonaws.com/hero.jpg"
            alt="Tendr Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Swipe right for the<br />
              <span className="relative inline-block text-green-500 min-w-[7em] md:min-w-[7.5em] h-[1.1em] align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[wordIndex]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute left-0 bottom-0 whitespace-nowrap"
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              <span>dreams.</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-xl leading-relaxed">
              Professional lawn & garden care, deck & fence construction, and rubbish removal. 
              Reliable quality and dedicated service you can trust.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-lg px-8" render={<a href="https://app.tendr.services/" />}>
                Swipe Right
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur hover:bg-white/20" render={<Link to="/services" />}>
                View Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground text-lg">
            We offer a range of specialized services to keep your property in top shape.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-4 flex items-center justify-between border-t">
                  <span className="font-semibold text-primary">{service.price}</span>
                  <Button variant="ghost" size="sm" className="gap-2" render={<Link to={`/book?service=${service.id}`} />}>
                    Book <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Tendr?</h2>
              <p className="text-muted-foreground text-lg mb-8">
                We pride ourselves on delivering exceptional quality and reliability. 
                Our team is dedicated to making home maintenance stress-free for you.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://tendr-images-bucket.s3.ap-southeast-2.amazonaws.com/gardener.jpg"
                alt="Our Expert Gardener"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-xl shadow-xl hidden md:block">
                <p className="text-3xl font-bold">10+</p>
                <p className="text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-primary rounded-3xl p-8 md:p-16 text-white text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to transform your home?</h2>
            <p className="text-primary-foreground/80 text-lg mb-10">
              Book your service online today and join hundreds of satisfied homeowners.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-10" render={<a href="https://app.tendr.services/" />}>
              Book Now
            </Button>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}
