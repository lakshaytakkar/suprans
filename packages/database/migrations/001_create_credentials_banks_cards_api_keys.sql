-- Create credentials table
CREATE TABLE IF NOT EXISTS credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL, -- Will be encrypted at application level
  email TEXT,
  url TEXT,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create banks table
CREATE TABLE IF NOT EXISTS banks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  account_name TEXT NOT NULL,
  account_number TEXT NOT NULL, -- Will be encrypted at application level
  routing_number TEXT,
  swift_code TEXT,
  bank_name TEXT NOT NULL,
  branch_address TEXT,
  currency TEXT DEFAULT 'USD',
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create cards table
CREATE TABLE IF NOT EXISTS cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_name TEXT NOT NULL,
  card_type TEXT NOT NULL, -- e.g., 'Visa', 'Mastercard', 'Amex'
  last_four TEXT NOT NULL,
  expiry_month INTEGER NOT NULL,
  expiry_year INTEGER NOT NULL,
  cardholder_name TEXT NOT NULL,
  billing_address JSONB,
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create api_keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  key_value TEXT NOT NULL, -- Long text field, will be encrypted at application level
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_credentials_created_by ON credentials(created_by);
CREATE INDEX IF NOT EXISTS idx_credentials_name ON credentials(name);
CREATE INDEX IF NOT EXISTS idx_banks_created_by ON banks(created_by);
CREATE INDEX IF NOT EXISTS idx_banks_name ON banks(name);
CREATE INDEX IF NOT EXISTS idx_cards_created_by ON cards(created_by);
CREATE INDEX IF NOT EXISTS idx_cards_card_name ON cards(card_name);
CREATE INDEX IF NOT EXISTS idx_api_keys_created_by ON api_keys(created_by);
CREATE INDEX IF NOT EXISTS idx_api_keys_name ON api_keys(name);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_credentials_updated_at BEFORE UPDATE ON credentials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banks_updated_at BEFORE UPDATE ON banks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cards_updated_at BEFORE UPDATE ON cards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE banks ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (only superadmin can access)
-- Note: These policies should be adjusted based on your auth setup
-- For now, we'll create policies that allow service role (admin) access
CREATE POLICY "Superadmin can view credentials" ON credentials
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

CREATE POLICY "Superadmin can insert credentials" ON credentials
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

CREATE POLICY "Superadmin can update credentials" ON credentials
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

CREATE POLICY "Superadmin can delete credentials" ON credentials
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

-- Similar policies for banks
CREATE POLICY "Superadmin can view banks" ON banks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

CREATE POLICY "Superadmin can insert banks" ON banks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

CREATE POLICY "Superadmin can update banks" ON banks
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

CREATE POLICY "Superadmin can delete banks" ON banks
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

-- Similar policies for cards
CREATE POLICY "Superadmin can view cards" ON cards
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

CREATE POLICY "Superadmin can insert cards" ON cards
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

CREATE POLICY "Superadmin can update cards" ON cards
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

CREATE POLICY "Superadmin can delete cards" ON cards
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

-- Similar policies for api_keys
CREATE POLICY "Superadmin can view api_keys" ON api_keys
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

CREATE POLICY "Superadmin can insert api_keys" ON api_keys
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

CREATE POLICY "Superadmin can update api_keys" ON api_keys
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

CREATE POLICY "Superadmin can delete api_keys" ON api_keys
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND (u.raw_user_meta_data->>'role' = 'superadmin' OR u.raw_user_meta_data->>'role' = 'admin')
    )
  );

