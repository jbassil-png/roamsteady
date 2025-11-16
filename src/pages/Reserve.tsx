import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, CreditCard, Lock } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const reservationSchema = z.object({
  plan_type: z.enum(["standard", "premium", "unlimited"], {
    required_error: "Please select a plan",
  }),
  destination: z.string().trim().min(1, "Destination is required").max(100),
  start_date: z.date({ required_error: "Start date is required" }),
  end_date: z.date({ required_error: "End date is required" }),
  contact_name: z.string().trim().min(1, "Name is required").max(100),
  contact_email: z.string().trim().email("Invalid email").max(255),
  contact_phone: z.string().trim().max(20).optional(),
  notes: z.string().trim().max(500).optional(),
}).refine((data) => data.end_date > data.start_date, {
  message: "End date must be after start date",
  path: ["end_date"],
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

const Reserve = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please sign in to make a reservation");
      navigate("/auth");
    }
  }, [loading, user, navigate]);

  const plans = {
    standard: { name: "Standard", price: 8 },
    unlimited: { name: "Unlimited", price: 12 },
    premium: { name: "Premium", price: 18 },
  };

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      plan_type: "unlimited",
      destination: "",
      contact_name: "",
      contact_email: user?.email || "",
      contact_phone: "",
      notes: "",
    },
  });

  const watchedValues = form.watch();
  const selectedPlan = watchedValues.plan_type || "unlimited";
  const startDate = watchedValues.start_date;
  const endDate = watchedValues.end_date;

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return days * plans[selectedPlan as keyof typeof plans].price;
  };

  const onSubmit = async (values: ReservationFormValues) => {
    if (!user) {
      toast.error("Please sign in to make a reservation");
      navigate("/auth");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.from("reservations").insert({
        user_id: user.id,
        plan_type: values.plan_type,
        destination: values.destination,
        start_date: format(values.start_date, "yyyy-MM-dd"),
        end_date: format(values.end_date, "yyyy-MM-dd"),
        contact_name: values.contact_name,
        contact_email: values.contact_email,
        contact_phone: values.contact_phone || null,
        notes: values.notes || null,
        status: "pending",
      }).select().single();

      if (error) throw error;

      // Send confirmation email
      try {
        await supabase.functions.invoke("send-confirmation", {
          body: {
            email: values.contact_email,
            name: values.contact_name,
            destination: values.destination,
            startDate: format(values.start_date, "PPP"),
            endDate: format(values.end_date, "PPP"),
            plan: values.plan_type,
            reservationId: data.id,
          },
        });
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
        // Don't fail the reservation if email fails
      }

      toast.success("Reservation created successfully!");
      navigate(`/confirmation?id=${data.id}`);
    } catch (error) {
      console.error("Error creating reservation:", error);
      toast.error("Failed to create reservation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display font-bold text-4xl mb-4">Reserve Your Device</h1>
            <p className="text-lg text-muted-foreground">
              Complete your reservation in minutes. We'll ship your device 2-3 days before your trip.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Reservation Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Plan Selection */}
                  <Card className="p-6 shadow-soft">
                    <h2 className="font-display font-semibold text-xl mb-4">Select Your Plan</h2>
                    <FormField
                      control={form.control}
                      name="plan_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plan Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a plan" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="standard">Standard - $8/day</SelectItem>
                              <SelectItem value="unlimited">Unlimited - $12/day (Most Popular)</SelectItem>
                              <SelectItem value="premium">Premium - $18/day</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Card>

                  {/* Travel Details */}
                  <Card className="p-6 shadow-soft">
                    <h2 className="font-display font-semibold text-xl mb-4">Travel Details</h2>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Destination</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Paris, France" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="start_date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Start Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date()}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="end_date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>End Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date()}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Contact Information */}
                  <Card className="p-6 shadow-soft">
                    <h2 className="font-display font-semibold text-xl mb-4">Contact Information</h2>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="contact_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact_email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact_phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Requests (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any special requirements or notes..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>

                  {/* Payment */}
                  <Card className="p-6 shadow-soft">
                    <h2 className="font-display font-semibold text-xl mb-4 flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </h2>
                    <div className="bg-muted/50 rounded-xl p-4 mb-4 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Stripe-powered secure checkout would appear here
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Supports cards, Apple Pay, Google Pay, and PayPal
                    </p>
                  </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="p-6 shadow-medium sticky top-20">
                    <h2 className="font-display font-semibold text-xl mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Plan</span>
                        <span className="font-medium">{plans[selectedPlan as keyof typeof plans].name}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Daily Rate</span>
                        <span className="font-medium">${plans[selectedPlan as keyof typeof plans].price}/day</span>
                      </div>

                      {startDate && endDate && endDate > startDate && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Rental Days</span>
                          <span className="font-medium">
                            {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                          </span>
                        </div>
                      )}

                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Rental Total</span>
                          <span className="font-medium">${calculateTotal()}</span>
                        </div>

                        <div className="flex justify-between text-sm mt-2">
                          <span className="text-muted-foreground">Device Hold</span>
                          <span className="font-medium">$200</span>
                        </div>
                      </div>

                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between font-display font-bold text-lg">
                          <span>Total Due Now</span>
                          <span className="text-primary">${calculateTotal() + 200}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-accent/10 rounded-lg p-4 mb-6 text-sm">
                      <p className="text-accent-foreground/80">
                        <strong>Note:</strong> The $200 device hold is fully refundable when you return the device in good condition.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-hero font-semibold text-lg py-6"
                    >
                      {isLoading ? "Processing..." : "Complete Reservation"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      By completing this reservation, you agree to our{" "}
                      <a href="/support#terms" className="text-primary hover:underline">
                        Terms of Service
                      </a>
                    </p>
                  </Card>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reserve;
