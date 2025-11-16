import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display font-bold text-4xl mb-4 text-center">Contact Us</h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            We're here to help. Reach out with any questions about your rental or our service.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 shadow-soft">
              <h2 className="font-display font-semibold text-xl mb-6">Send Us a Message</h2>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="How can we help?" rows={5} />
                </div>
                <Button className="w-full bg-gradient-hero font-semibold">Send Message</Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 shadow-soft">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-secondary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Email Support</h3>
                    <p className="text-muted-foreground">support@roamsteady.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-secondary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Support Hours</h3>
                    <p className="text-muted-foreground">24/7 for active rentals<br/>Mon-Fri 9am-6pm PT for general inquiries</p>
                  </div>
                </div>
              </Card>

              <div className="bg-muted/50 rounded-xl p-6">
                <p className="text-sm text-muted-foreground">
                  RoamSteady is committed to providing reliable, secure Wi-Fi rental service with exceptional customer support. We're a small team dedicated to making travel connectivity simple and dependable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
