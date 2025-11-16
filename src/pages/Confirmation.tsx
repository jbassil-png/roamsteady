import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Mail, Calendar, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const reservationId = searchParams.get('id');

  useEffect(() => {
    const fetchReservation = async () => {
      if (!reservationId) {
        navigate('/');
        return;
      }

      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('id', reservationId)
        .maybeSingle();

      if (error || !data) {
        navigate('/');
        return;
      }

      setReservation(data);
      setLoading(false);
    };

    fetchReservation();
  }, [reservationId, navigate]);

  if (loading) {
    return null;
  }

  if (!reservation) {
    return null;
  }

  const planNames: Record<string, string> = {
    standard: 'Standard',
    unlimited: 'Unlimited',
    premium: 'Premium',
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <Card className="p-8 shadow-medium">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center shadow-glow">
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="font-display font-bold text-3xl mb-2">Reservation Confirmed!</h1>
              <p className="text-muted-foreground text-lg">
                Your travel WiFi device is reserved
              </p>
            </div>

            <div className="bg-accent/5 rounded-xl p-6 mb-6 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Confirmation Email Sent</p>
                  <p className="text-sm text-muted-foreground">
                    Check your email at {reservation.contact_email} for reservation details
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Destination</p>
                  <p className="text-sm text-muted-foreground">{reservation.destination}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Travel Dates</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(reservation.start_date), 'PPP')} - {format(new Date(reservation.end_date), 'PPP')}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6 mb-6">
              <h2 className="font-display font-semibold text-lg mb-3">Reservation Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reservation ID</span>
                  <span className="font-mono">{reservation.id.slice(0, 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium">{planNames[reservation.plan_type]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="capitalize font-medium text-primary">{reservation.status}</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mb-6 text-sm">
              <p className="font-medium mb-2">What's Next?</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Your device will be shipped 2-3 days before your departure date</li>
                <li>• You'll receive tracking information via email</li>
                <li>• Return the device within 3 days of your return date</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/my-reservations')}
                className="flex-1 bg-gradient-hero"
              >
                View My Reservations
              </Button>
              <Button
                onClick={() => navigate('/my-reservations')}
                variant="outline"
                className="flex-1"
              >
                View All Reservations
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Confirmation;
