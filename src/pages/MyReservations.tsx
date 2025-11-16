import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar, MapPin, Wifi, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

type Reservation = {
  id: string;
  plan_type: "standard" | "premium" | "unlimited";
  destination: string;
  start_date: string;
  end_date: string;
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  notes: string | null;
  created_at: string;
};

const MyReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to view your reservations");
      navigate("/auth");
      return;
    }

    fetchReservations();
  }, [user, navigate]);

  const fetchReservations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setReservations(data || []);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      toast.error("Failed to load reservations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("reservations")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Reservation cancelled successfully");
      fetchReservations();
    } catch (error) {
      console.error("Error deleting reservation:", error);
      toast.error("Failed to cancel reservation");
    }
  };

  const getStatusColor = (status: Reservation["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "confirmed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "completed":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getPlanName = (planType: Reservation["plan_type"]) => {
    const plans = {
      standard: "Standard",
      unlimited: "Unlimited",
      premium: "Premium",
    };
    return plans[planType];
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display font-bold text-4xl mb-2">My Reservations</h1>
              <p className="text-lg text-muted-foreground">
                View and manage your WiFi device reservations
              </p>
            </div>
            <Button
              onClick={() => navigate("/reserve")}
              className="bg-gradient-accent font-semibold"
            >
              New Reservation
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </Card>
              ))}
            </div>
          ) : reservations.length === 0 ? (
            <Card className="p-12 text-center">
              <Wifi className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-display font-semibold text-xl mb-2">No reservations yet</h3>
              <p className="text-muted-foreground mb-6">
                Start planning your trip by reserving a WiFi device
              </p>
              <Button
                onClick={() => navigate("/reserve")}
                className="bg-gradient-accent font-semibold"
              >
                Make Your First Reservation
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {reservations.map((reservation) => (
                <Card key={reservation.id} className="p-6 shadow-soft hover:shadow-medium transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Wifi className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-lg">
                          {getPlanName(reservation.plan_type)} Plan
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Booked on {format(new Date(reservation.created_at), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(reservation.status)} variant="outline">
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{reservation.destination}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {format(new Date(reservation.start_date), "MMM d")} -{" "}
                        {format(new Date(reservation.end_date), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <p className="text-muted-foreground">Contact</p>
                        <p className="font-medium">{reservation.contact_name}</p>
                        <p className="text-muted-foreground">{reservation.contact_email}</p>
                      </div>

                      {reservation.status === "pending" && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                              Cancel
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancel Reservation?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently cancel your reservation. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Keep Reservation</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(reservation.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Cancel Reservation
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>

                    {reservation.notes && (
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Notes:</p>
                        <p className="text-sm">{reservation.notes}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MyReservations;
