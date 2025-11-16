import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wifi, Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const plans = [
    { name: "Standard", path: "/plans/standard", desc: "2 GB/day high-speed data" },
    { name: "Unlimited", path: "/plans/unlimited", desc: "True unlimited data" },
    { name: "Premium", path: "/plans/premium", desc: "5G device, extended battery" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-primary">
            <Wifi className="h-6 w-6" />
            <span>RoamSteady</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Home
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">Plans</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      {plans.map((plan) => (
                        <li key={plan.path}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={plan.path}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary"
                            >
                              <div className="text-sm font-medium leading-none">{plan.name}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {plan.desc}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/support"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Support
            </Link>

            <Link
              to="/contact"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Contact
            </Link>

            {user ? (
              <>
                <Link
                  to="/my-reservations"
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  My Reservations
                </Link>
                <Button asChild className="bg-gradient-accent font-semibold">
                  <Link to="/reserve">Reserve</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => signOut()}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="bg-gradient-accent font-semibold">
                  <Link to="/reserve">Reserve</Link>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <Link to="/auth">
                    <User className="h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <Link
              to="/"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <div className="space-y-2">
              <div className="text-sm font-semibold text-foreground py-2">Plans</div>
              {plans.map((plan) => (
                <Link
                  key={plan.path}
                  to={plan.path}
                  className="block pl-4 py-2 text-sm text-foreground/80 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {plan.name}
                </Link>
              ))}
            </div>
            <Link
              to="/support"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {user && (
              <Link
                to="/my-reservations"
                className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Reservations
              </Link>
            )}
            <Button asChild className="w-full bg-gradient-accent font-semibold">
              <Link to="/reserve" onClick={() => setMobileMenuOpen(false)}>
                Reserve
              </Link>
            </Button>
            {user ? (
              <Button
                variant="outline"
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <Button asChild variant="outline" className="w-full gap-2">
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
