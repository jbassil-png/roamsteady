import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Wifi, Battery, MapPin, Zap, Sparkles, Plug } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/fatherferry.png";

const PlanPremium = () => {
  const specs = [
    { icon: Zap, label: "Network", value: "5G-capable hardware" },
    { icon: Wifi, label: "Data", value: "Truly unlimited high-speed" },
    { icon: Battery, label: "Battery", value: "20 hours extended" },
    { icon: MapPin, label: "Coverage", value: "All 50 U.S. states" },
  ];

  const features = [
    "5G-capable hardware for maximum speed",
    "Unlimited high-speed data with no caps",
    "Extended 20-hour battery life",
    "Connect up to 15 devices simultaneously",
    "International power adapter included",
    "Premium carrying case",
    "U.S. nationwide 5G/4G coverage",
    "WPA2-secured connection",
    "Prepaid return shipping included",
    "Premium 24/7 priority support",
    "$200 refundable device hold",
  ];

  const useCases = [
    {
      title: "Executive Travel",
      description: "The fastest speeds and longest battery for demanding professionals who can't afford downtime.",
    },
    {
      title: "Film & Production",
      description: "Upload 4K footage and collaborate in real-time with the power of 5G connectivity.",
    },
    {
      title: "Multi-Device Teams",
      description: "Connect up to 15 devices at once—perfect for small teams traveling together.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-hero text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Premium Plan
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl">
              5G Speed, Extended Battery, Premium Experience
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Our flagship device with 5G capability, 20-hour battery, and unlimited data. The ultimate travel companion for professionals.
            </p>
            <div className="flex items-baseline justify-center gap-2 pt-4">
              <span className="text-5xl font-display font-bold">$18</span>
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
                className="p-6 text-center space-y-3 shadow-medium hover:shadow-medium hover:scale-105 transition-all border-primary/20"
              >
                <div className="w-12 h-12 mx-auto bg-gradient-hero rounded-xl flex items-center justify-center">
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

      {/* Premium Differentiators */}
      <section className="bg-accent/5 py-16 border-y border-accent/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-12">
              Premium Advantages
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 space-y-4 shadow-soft hover:shadow-medium transition-all">
                <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-xl">5G Speeds</h3>
                <p className="text-muted-foreground">
                  Experience blazing-fast connectivity in 5G coverage areas, with automatic fallback to 4G LTE for consistent performance.
                </p>
              </Card>

              <Card className="p-6 space-y-4 shadow-soft hover:shadow-medium transition-all">
                <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                  <Battery className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-xl">All-Day Battery</h3>
                <p className="text-muted-foreground">
                  20-hour extended battery means you can work from sunrise to sunset without worrying about charging.
                </p>
              </Card>

              <Card className="p-6 space-y-4 shadow-soft hover:shadow-medium transition-all">
                <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                  <Plug className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-xl">International Adapter</h3>
                <p className="text-muted-foreground">
                  Includes a universal power adapter so you can charge anywhere, making it perfect for international trips.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-12">
            What's Included
          </h2>
          <Card className="p-8 shadow-soft border-primary/20">
            <ul className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-hero text-white rounded-3xl p-12 text-center shadow-medium">
          <Sparkles className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Reserve Your Premium Plan
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            $18/day for the ultimate travel Wi-Fi experience. 5G speeds, all-day battery, and premium support.
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

export default PlanPremium;
