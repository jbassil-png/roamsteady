import { Link } from "react-router-dom";
import { Wifi } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-primary">
              <Wifi className="h-6 w-6" />
              <span>RoamSteady</span>
            </Link>
            <p className="text-sm text-muted-foreground italic">
              Wi-Fi that travels with you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/plans/standard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Standard Plan
                </Link>
              </li>
              <li>
                <Link to="/plans/unlimited" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Unlimited Plan
                </Link>
              </li>
              <li>
                <Link to="/plans/premium" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Premium Plan
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/support#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/support#terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/support#privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/support#acceptable-use" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Acceptable Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} RoamSteady. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
