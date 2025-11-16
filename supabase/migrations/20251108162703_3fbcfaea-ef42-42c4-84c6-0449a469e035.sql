-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles (admins can manage roles)
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Enable RLS on all unprotected tables
ALTER TABLE public.org_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.device_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_events_raw ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shippo_events_raw ENABLE ROW LEVEL SECURITY;

-- Admin-only policies for org_settings
CREATE POLICY "Admins can view org_settings"
  ON public.org_settings FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert org_settings"
  ON public.org_settings FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update org_settings"
  ON public.org_settings FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete org_settings"
  ON public.org_settings FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Admin-only policies for devices
CREATE POLICY "Admins can view devices"
  ON public.devices FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert devices"
  ON public.devices FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update devices"
  ON public.devices FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete devices"
  ON public.devices FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Admin-only policies for payments
CREATE POLICY "Admins can view payments"
  ON public.payments FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert payments"
  ON public.payments FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update payments"
  ON public.payments FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete payments"
  ON public.payments FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Admin-only policies for shipments
CREATE POLICY "Admins can view shipments"
  ON public.shipments FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert shipments"
  ON public.shipments FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update shipments"
  ON public.shipments FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete shipments"
  ON public.shipments FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Admin-only policies for device_status_history
CREATE POLICY "Admins can view device_status_history"
  ON public.device_status_history FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert device_status_history"
  ON public.device_status_history FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update device_status_history"
  ON public.device_status_history FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete device_status_history"
  ON public.device_status_history FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Admin-only policies for stripe_events_raw
CREATE POLICY "Admins can view stripe_events_raw"
  ON public.stripe_events_raw FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert stripe_events_raw"
  ON public.stripe_events_raw FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update stripe_events_raw"
  ON public.stripe_events_raw FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete stripe_events_raw"
  ON public.stripe_events_raw FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Admin-only policies for shippo_events_raw
CREATE POLICY "Admins can view shippo_events_raw"
  ON public.shippo_events_raw FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert shippo_events_raw"
  ON public.shippo_events_raw FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update shippo_events_raw"
  ON public.shippo_events_raw FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete shippo_events_raw"
  ON public.shippo_events_raw FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));