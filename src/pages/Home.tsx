import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Truck, RotateCcw, DollarSign, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImage from "@/assets/familytv.png";

const Home = () => {
  const plans = [
    {
      name: "Standard",
      price: "$8",
      period: "day",
      description: "Fair value for everyday travelers",
      features: [
        "2 GB/day high-speed data",
        "Unlimited standard speed after",
        "Coverage across the U.S.",
        "Prepaid return shipping",
        "24/7 support",
      ],
      detailPath: "/plans/standard",
    },
    {
      name: "Unlimited",
      price: "$12",
      period: "day",
      description: "True unlimited for power users",
      features: [
        "Unlimited high-speed data",
        "No throttling or caps",
        "Coverage across the U.S.",
        "Prepaid return shipping",
        "24/7 priority support",
      ],
      detailPath: "/plans/unlimited",
      popular: true,
    },
    {
      name: "Premium",
      price: "$18",
      period: "day",
      description: "5G speed with extended battery",
      features: [
        "5G-capable hardware",
        "Unlimited high-speed data",
        "Extended 20-hour battery",
        "International adapter included",
        "Premium 24/7 support",
      ],
      detailPath: "/plans/premium",
    },
  ];

  const faqs = [
    {
      question: "How does shipping work?",
      answer:
        "We ship your device 2-3 business days before your trip starts. Return shipping is prepaid - just drop it in the included envelope and send it back within 3 days of your rental end date.",
    },
    {
      question: "What's the $200 hold for?",
      answer:
        "We place a $200 refundable hold on your card to cover the device. It's released immediately when we receive your device back in good condition. You're only charged for your selected plan and rental days.",
    },
    {
      question: "Can I extend my rental?",
      answer:
        "Yes! Contact us during your rental period and we'll extend your rental at the same daily rate. We'll bill the additional days separately.",
    },
    {
      question: "What if the device stops working?",
      answer:
        "Contact us immediately and we'll troubleshoot. If it's a device issue, we'll ship a replacement at no charge. You're covered by our reliability guarantee.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 opacity-40">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight">
              Secure, Reliable Wi-Fi That Travels With You
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Rent a portable Wi-Fi device for your U.S. travels. No contracts, no surprises—just dependable connectivity when and where you need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8">
                <Link to="/reserve">Reserve Your Device</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8"
              >
                <Link to="/support">How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Three Steps */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-16">
            Three Simple Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 mx-auto bg-gradient-accent rounded-2xl flex items-center justify-center shadow-soft">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl">1. Ship</h3>
              <p className="text-muted-foreground">
                We send your device 2-3 days before your trip. It arrives ready to connect.
              </p>
            </div>

            <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="w-16 h-16 mx-auto bg-gradient-accent rounded-2xl flex items-center justify-center shadow-soft">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl">2. Connect</h3>
              <p className="text-muted-foreground">
                Power it on, connect your devices, and enjoy secure Wi-Fi across the U.S.
              </p>
            </div>

            <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="w-16 h-16 mx-auto bg-gradient-accent rounded-2xl flex items-center justify-center shadow-soft">
                <RotateCcw className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl">3. Return</h3>
              <p className="text-muted-foreground">
                Drop it in the prepaid envelope within 3 days of your rental end. Done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Plans & Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your travel needs. All plans include coverage across the U.S., prepaid return shipping, and no hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PricingCard {...plan} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why RoamSteady */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-16">
            Why RoamSteady?
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 p-6 rounded-2xl border border-border bg-card shadow-soft hover:shadow-medium transition-all">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl">Reliability You Can Trust</h3>
              <p className="text-muted-foreground">
                Professional-grade devices with 99%+ uptime. If anything goes wrong, we'll ship a replacement immediately—no questions asked.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl border border-border bg-card shadow-soft hover:shadow-medium transition-all">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl">Secure Connection</h3>
              <p className="text-muted-foreground">
                WPA2 encryption and VPN-ready. Your data stays private, whether you're checking email or accessing sensitive accounts.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl border border-border bg-card shadow-soft hover:shadow-medium transition-all">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl">Prepaid Return Shipping</h3>
              <p className="text-muted-foreground">
                Every rental includes a prepaid return envelope. Just drop it in any mailbox within 3 days of your rental end date.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl border border-border bg-card shadow-soft hover:shadow-medium transition-all">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl">No Hidden Fees</h3>
              <p className="text-muted-foreground">
                What you see is what you pay. Daily rate plus a $200 refundable hold (returned when device is back). That's it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Quick answers to common questions. Need more help?{" "}
                <Link to="/support" className="text-secondary hover:underline font-medium">
                  Visit our Support page
                </Link>
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 shadow-soft"
                >
                  <AccordionTrigger className="font-display font-semibold hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-8">
              <Button asChild variant="outline" className="group">
                <Link to="/support#faq">
                  View All FAQs
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-hero text-white rounded-3xl p-12 text-center shadow-medium">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Ready to Stay Connected?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Reserve your device today and travel with confidence. Setup takes less than 2 minutes.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8">
            <Link to="/reserve">Reserve Now</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
