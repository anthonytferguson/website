import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, Users, Shield, Clock } from "lucide-react";

export function AboutPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Tendre</h1>
          <p className="text-xl text-muted-foreground">
            We're a team of dedicated professionals committed to making home maintenance 
            simple, reliable, and high-quality for every homeowner.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://picsum.photos/seed/about-story/800/600"
              alt="Our Story"
              className="rounded-3xl shadow-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2014, Tendre started with a simple mission: to provide reliable 
              home maintenance services that people can actually count on. We saw too 
              many homeowners struggling with unreliable contractors and inconsistent quality.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we've grown into a full-service maintenance company, but our core 
              values remain the same. We treat every home as if it were our own, 
              ensuring that every lawn mowed, every deck built, and every load of 
              rubbish removed meets our high standards of excellence.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-primary/5 rounded-xl">
                <p className="text-2xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-xl">
                <p className="text-2xl font-bold text-primary">1.2k</p>
                <p className="text-sm text-muted-foreground">Jobs Completed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              These principles guide everything we do, from the first consultation to the final cleanup.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "We never cut corners. Every job is done to the highest professional standard.",
                icon: Shield
              },
              {
                title: "Reliability",
                description: "We show up on time and finish on schedule. You can count on us.",
                icon: Clock
              },
              {
                title: "Customer Focus",
                description: "Your satisfaction is our top priority. We listen to your needs and deliver results.",
                icon: Users
              }
            ].map((value) => (
              <div key={value.title} className="bg-white/10 backdrop-blur p-8 rounded-2xl border border-white/20">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-primary-foreground/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Want to join our team?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          We're always looking for skilled professionals who share our passion for quality work.
        </p>
        <Button asChild variant="outline" size="lg">
          <Link to="/contact">Contact Us Today</Link>
        </Button>
      </section>
    </div>
  );
}
