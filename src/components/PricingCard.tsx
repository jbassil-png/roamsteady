import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  detailPath: string;
  popular?: boolean;
}

const PricingCard = ({
  name,
  price,
  period,
  description,
  features,
  detailPath,
  popular = false,
}: PricingCardProps) => {
  return (
    <Card
      className={`relative p-8 rounded-2xl transition-all duration-300 hover:shadow-medium ${
        popular
          ? "border-2 border-secondary shadow-medium scale-105"
          : "border border-border shadow-soft hover:border-secondary/50"
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-accent text-white text-xs font-semibold px-4 py-1.5 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="font-display font-bold text-2xl mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-display font-bold text-primary">{price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/80">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-3">
        <Button asChild className="w-full bg-gradient-hero font-semibold">
          <Link to="/reserve">Reserve Now</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link to={detailPath}>Learn More</Link>
        </Button>
      </div>
    </Card>
  );
};

export default PricingCard;
