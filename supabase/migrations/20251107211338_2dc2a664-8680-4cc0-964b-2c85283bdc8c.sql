-- SHIPMENTS (canonical shipping record)
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID REFERENCES reservations(id) ON DELETE CASCADE,
  direction TEXT NOT NULL,                      -- outbound | return
  carrier TEXT,
  tracking_number TEXT,
  shippo_object_id TEXT,
  label_url TEXT,
  status TEXT,                                 -- pre_transit | in_transit | delivered | exception | return_to_sender
  last_event TEXT,
  last_event_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RAW SHIPPO EVENTS
CREATE TABLE IF NOT EXISTS shippo_events_raw (
  id BIGSERIAL PRIMARY KEY,
  event TEXT NOT NULL,
  payload JSONB NOT NULL,
  received_at TIMESTAMPTZ DEFAULT now()
);