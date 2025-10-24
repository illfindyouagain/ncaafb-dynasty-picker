-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  conference TEXT NOT NULL,
  categories TEXT[] NOT NULL,
  difficulty TEXT NOT NULL,
  prestige INTEGER NOT NULL,
  overall_rating INTEGER NOT NULL,
  offense_rating INTEGER NOT NULL,
  defense_rating INTEGER NOT NULL,
  stars DECIMAL(2,1) NOT NULL,
  location TEXT NOT NULL,
  color_primary TEXT NOT NULL,
  color_secondary TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_teams_conference ON teams(conference);
CREATE INDEX idx_teams_difficulty ON teams(difficulty);
CREATE INDEX idx_teams_stars ON teams(stars);

-- Enable Row Level Security
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON teams
  FOR SELECT
  TO public
  USING (true);

-- Temporarily allow public insert for migration (disable after migration!)
CREATE POLICY "Allow public insert" ON teams
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for waitlist
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert to waitlist
CREATE POLICY "Allow public insert" ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users can read waitlist
CREATE POLICY "Allow authenticated read" ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);
