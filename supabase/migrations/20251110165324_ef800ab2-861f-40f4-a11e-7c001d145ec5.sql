-- 1. Enable RLS (will fail silently if already enabled)
DO $$
BEGIN
  ALTER TABLE public.refresh_log ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  ALTER TABLE public.matview_refresh_history ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- 2. Create policies only if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'refresh_log' AND policyname = 'Admins can view refresh_log'
  ) THEN
    CREATE POLICY "Admins can view refresh_log"
      ON public.refresh_log FOR SELECT
      USING (public.has_role(auth.uid(), 'admin'::app_role));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'refresh_log' AND policyname = 'Admins can insert refresh_log'
  ) THEN
    CREATE POLICY "Admins can insert refresh_log"
      ON public.refresh_log FOR INSERT
      WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'refresh_log' AND policyname = 'Admins can update refresh_log'
  ) THEN
    CREATE POLICY "Admins can update refresh_log"
      ON public.refresh_log FOR UPDATE
      USING (public.has_role(auth.uid(), 'admin'::app_role));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'refresh_log' AND policyname = 'Admins can delete refresh_log'
  ) THEN
    CREATE POLICY "Admins can delete refresh_log"
      ON public.refresh_log FOR DELETE
      USING (public.has_role(auth.uid(), 'admin'::app_role));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'matview_refresh_history' AND policyname = 'Admins can view matview_refresh_history'
  ) THEN
    CREATE POLICY "Admins can view matview_refresh_history"
      ON public.matview_refresh_history FOR SELECT
      USING (public.has_role(auth.uid(), 'admin'::app_role));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'matview_refresh_history' AND policyname = 'Admins can insert matview_refresh_history'
  ) THEN
    CREATE POLICY "Admins can insert matview_refresh_history"
      ON public.matview_refresh_history FOR INSERT
      WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'matview_refresh_history' AND policyname = 'Admins can update matview_refresh_history'
  ) THEN
    CREATE POLICY "Admins can update matview_refresh_history"
      ON public.matview_refresh_history FOR UPDATE
      USING (public.has_role(auth.uid(), 'admin'::app_role));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'matview_refresh_history' AND policyname = 'Admins can delete matview_refresh_history'
  ) THEN
    CREATE POLICY "Admins can delete matview_refresh_history"
      ON public.matview_refresh_history FOR DELETE
      USING (public.has_role(auth.uid(), 'admin'::app_role));
  END IF;
END $$;

-- 3. Add device_id column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'reservations' 
      AND column_name = 'device_id'
  ) THEN
    ALTER TABLE public.reservations ADD COLUMN device_id uuid;
  END IF;
END $$;

-- 4. Add foreign key constraints
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'reservations_device_fk'
  ) THEN
    ALTER TABLE public.reservations
      ADD CONSTRAINT reservations_device_fk
      FOREIGN KEY (device_id) REFERENCES public.devices(id)
      ON DELETE SET NULL;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'shipments_reservation_fk'
  ) THEN
    ALTER TABLE public.shipments
      ADD CONSTRAINT shipments_reservation_fk
      FOREIGN KEY (reservation_id) REFERENCES public.reservations(id)
      ON DELETE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'payments_reservation_fk'
  ) THEN
    ALTER TABLE public.payments
      ADD CONSTRAINT payments_reservation_fk
      FOREIGN KEY (reservation_id) REFERENCES public.reservations(id)
      ON DELETE SET NULL;
  END IF;
END $$;

-- 5. Attach handle_new_user trigger
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc 
    WHERE proname = 'handle_new_user'
  ) AND NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;