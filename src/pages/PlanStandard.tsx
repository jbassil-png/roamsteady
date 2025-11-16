import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Wifi, Battery, MapPin, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/solotraveler.png";

const PlanStandard = () => {
  const specs = [
    { icon: Wifi, label: "Data", value: "2 GB/day high-speed" },
    { icon: Battery, label: "Battery", value: "12 hours typical use" },
    { icon: MapPin, label: "Coverage", value: "All 50 U.S. states" },
    { icon: Shield, label: "Security", value: "WPA2 encryption" },
  ];

  const features = [
    "2 GB/day high-speed data (then unlimited standard speed)",
    "Connect up to 10 devices simultaneously",
    "12-hour battery life",
    "U.S. nationwide coverage",
    "WPA2-secured connection",
    "Prepaid return shipping included",
    "24/7 customer support",
    "$200 refundable device hold",
  ];

  const useCases = [
    {
      title: "Weekend Getaways",
      description: "Perfect for short trips where you need reliable connectivity for navigation, photos, and staying in touch.",
    },
    {
      title: "Business Travel",
      description: "Check emails, join video calls, and access cloud documents during your work trips.",
    },
    {
      title: "Family Road Trips",
      description: "Keep the kids entertained and navigate confidently with consistent coverage across the country.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-white py-16">
        <div className="absolute inset-0 opacity-40">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Standard Plan
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl">
              Fair Value for Everyday Travelers
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              2 GB/day of high-speed data with unlimited standard speed after. The perfect balance of performance and affordability.
            </p>
            <div className="flex items-baseline justify-center gap-2 pt-4">
              <span className="text-5xl font-display font-bold">$8</span>
              <span className="text-xl text-white/80">/day</span>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-12">
            Technical Specifications
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specs.map((spec, index) => (
              <Card
                key={index}
                className="p-6 text-center space-y-3 shadow-soft hover:shadow-medium transition-all"
              >
                <div className="w-12 h-12 mx-auto bg-gradient-accent rounded-xl flex items-center justify-center">
                  <spec.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">{spec.label}</div>
                  <div className="font-semibold">{spec.value}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-12">
              What's Included
            </h2>
            <Card className="p-8 shadow-soft">
              <ul className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-12">
            Perfect For
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className="p-6 space-y-3 shadow-soft hover:shadow-medium transition-all"
              >
                <h3 className="font-display font-semibold text-xl">{useCase.title}</h3>
                <p className="text-muted-foreground">{useCase.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-hero text-white rounded-3xl p-12 text-center shadow-medium">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Reserve Your Standard Plan
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            $8/day for reliable connectivity wherever your travels take you. No hidden fees, no surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8">
              <Link to="/reserve">Reserve This Plan</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8"
            >
              <Link to="/">Compare All Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlanStandard;
