import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Support = () => {
  const faqs = [
    { q: "How does shipping work?", a: "We ship your device 2-3 business days before your trip starts. Return shipping is prepaid - just drop it in the included envelope within 3 days of rental end." },
    { q: "What's the $200 hold for?", a: "It's a refundable hold covering the device. Released immediately when we receive your device back in good condition." },
    { q: "Can I extend my rental?", a: "Yes! Contact us during your rental and we'll extend at the same daily rate." },
    { q: "What if the device stops working?", a: "Contact us immediately. If it's a device issue, we'll ship a replacement at no charge." },
    { q: "Is the connection secure?", a: "Yes. All devices use WPA2 encryption and are VPN-ready for additional security." },
    { q: "What if I return the device late?", a: "Late returns are charged at your daily rate. Please contact us if you need an extension." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display font-bold text-4xl mb-8 text-center">Support Center</h1>
        
        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-semibold text-2xl mb-6">How It Works</h2>
          <div className="space-y-4 text-muted-foreground">
            <p><strong>Ordering:</strong> Select your plan, enter rental dates and shipping info, complete payment.</p>
            <p><strong>Shipping:</strong> Device ships 2-3 days before your trip. Arrives ready to use.</p>
            <p><strong>Using:</strong> Power on, connect devices. Enjoy secure Wi-Fi across the U.S.</p>
            <p><strong>Returning:</strong> Drop in prepaid envelope within 3 days of rental end.</p>
          </div>
        </section>

        <section id="faq" className="max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-semibold text-2xl mb-6">FAQ</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border rounded-xl px-6 shadow-soft">
                <AccordionTrigger className="font-semibold">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section id="terms" className="max-w-3xl mx-auto text-sm text-muted-foreground space-y-4">
          <h2 className="font-display font-semibold text-xl">Policies</h2>
          <p><strong>Terms of Service:</strong> Standard rental terms apply. Device must be returned in good condition.</p>
          <p><strong>Privacy Policy:</strong> We protect your data and never share personal information.</p>
          <p><strong>Acceptable Use:</strong> No illegal activities. Device is for personal/business use only.</p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Support;
