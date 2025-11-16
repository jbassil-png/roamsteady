import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Wifi, Battery, MapPin, Shield, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/momhotel.png";

const PlanUnlimited = () => {
  const specs = [
    { icon: Wifi, label: "Data", value: "Truly unlimited high-speed" },
    { icon: Zap, label: "Speed", value: "No throttling, ever" },
    { icon: Battery, label: "Battery", value: "14 hours typical use" },
    { icon: MapPin, label: "Coverage", value: "All 50 U.S. states" },
  ];

  const features = [
    "Unlimited high-speed data with no caps",
    "No throttling or speed reductions",
    "Connect up to 10 devices simultaneously",
    "14-hour extended battery life",
    "U.S. nationwide coverage",
    "WPA2-secured connection",
    "Prepaid return shipping included",
    "24/7 priority customer support",
    "$200 refundable device hold",
  ];

  const useCases = [
    {
      title: "Remote Work",
      description: "Video conferences, large file uploads, and cloud applications without worrying about data limits.",
    },
    {
      title: "Content Creators",
      description: "Upload videos, stream live, and backup photos on the go without speed concerns.",
    },
    {
      title: "Extended Travel",
      description: "Perfect for long road trips or extended stays where you need consistent, unlimited connectivity.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-accent text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              🔥 Most Popular
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl">
              True Unlimited for Power Users
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Unlimited high-speed data with absolutely no throttling, caps, or fine print. Use as much as you need, whenever you need it.
            </p>
            <div className="flex items-baseline justify-center gap-2 pt-4">
              <span className="text-5xl font-display font-bold">$12</span>
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
                className="p-6 text-center space-y-3 shadow-soft hover:shadow-medium transition-all border-secondary/20"
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
            <Card className="p-8 shadow-soft border-secondary/20">
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

      {/* Why Unlimited */}
      <section className="bg-secondary/5 py-16 border-y border-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-display font-bold text-2xl md:text-3xl">
              Why Choose Unlimited?
            </h2>
            <p className="text-lg text-muted-foreground">
              Unlike many "unlimited" plans that throttle after a certain threshold, our Unlimited plan means exactly what it says: no caps, no slowdowns, no surprises. Stream 4K video, upload large files, or host video meetings—all at full speed.
            </p>
            <div className="grid sm:grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-3xl font-display font-bold text-secondary mb-2">0</div>
                <div className="text-sm text-muted-foreground">Data caps</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-secondary mb-2">0</div>
                <div className="text-sm text-muted-foreground">Speed throttling</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-secondary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Full speed, always</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-accent text-white rounded-3xl p-12 text-center shadow-medium">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Reserve Your Unlimited Plan
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            $12/day for true unlimited connectivity. Perfect for power users who need reliable, fast internet everywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90 font-semibold text-lg px-8">
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

export default PlanUnlimited;
