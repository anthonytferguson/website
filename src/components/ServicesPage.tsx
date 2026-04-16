import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Hammer, Trash2, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const services = [
  {
    id: "lawn",
    title: "Lawn Maintenance",
    description: "Keep your lawn healthy and beautiful all year round with our professional care services.",
    icon: Sprout,
    image: "/lawn-detail.jpeg",
    features: [
      "Regular Mowing & Edging",
      "Fertilization & Weed Control",
      "Aeration & Overseeding",
      "Hedge Trimming",
      "Seasonal Cleanups"
    ],
    pricing: "Starting at $50 per visit"
  },
  {
    id: "decks",
    title: "Decks & Fences",
    description: "Enhance your outdoor living space with custom-built decks and secure, stylish fencing.",
    icon: Hammer,
    image: "https://picsum.photos/seed/deck-detail/1200/800",
    features: [
      "Custom Deck Design",
      "Timber & Composite Options",
      "Privacy Fencing",
      "Gate Installation",
      "Staining & Maintenance"
    ],
    pricing: "Free on-site consultation & quote"
  },
  {
    id: "rubbish",
    title: "Rubbish Removal",
    description: "Clear out the clutter with our fast and responsible rubbish removal services.",
    icon: Trash2,
    image: "https://picsum.photos/seed/rubbish-detail/1200/800",
    features: [
      "Garden Waste Removal",
      "Household Junk Clearing",
      "Construction Debris",
      "Responsible Disposal",
      "Same-day Service Available"
    ],
    pricing: "Starting at $80 per load"
  }
];

export function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-muted-foreground text-lg">
          We provide high-quality home maintenance solutions tailored to your needs.
        </p>
      </div>

      <div className="space-y-20">
        {services.map((service, index) => (
          <section key={service.id} id={service.id} className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
            index % 2 === 1 ? "lg:flex-row-reverse" : ""
          )}>
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                
                <div className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-muted rounded-xl mb-8">
                  <p className="font-semibold text-primary">{service.pricing}</p>
                </div>

                <Button asChild size="lg" className="gap-2">
                  <Link to={`/book?service=${service.id}`}>
                    Book This Service <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            <div className={cn("relative", index % 2 === 1 ? "lg:order-1" : "")}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover aspect-[4/3]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
