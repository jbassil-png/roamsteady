-- DEVICES (inventory of Wi-Fi units)
CREATE TABLE IF NOT EXISTS devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_no TEXT UNIQUE NOT NULL,
  model TEXT,
  purchased_at DATE,
  status TEXT NOT NULL DEFAULT 'available',   -- available | reserved | out | maintenance | lost
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE devices IS 'Inventory of rentable Wi-Fi units';
COMMENT ON COLUMN devices.status IS 'Current lifecycle status of device';

-- DEVICE STATUS HISTORY (utilization log)
CREATE TABLE IF NOT EXISTS device_status_history (
  id BIGSERIAL PRIMARY KEY,
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  reservation_id UUID REFERENCES reservations(id),
  status TEXT NOT NULL,
  note TEXT,
  at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE device_status_history IS 'Audit trail of each device status change';