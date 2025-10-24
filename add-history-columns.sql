-- Add program history columns to existing teams table
ALTER TABLE teams ADD COLUMN IF NOT EXISTS all_time_wins INTEGER DEFAULT 0;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS all_time_losses INTEGER DEFAULT 0;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS national_championships INTEGER DEFAULT 0;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS conference_championships INTEGER DEFAULT 0;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS bowl_appearances INTEGER DEFAULT 0;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS playoff_appearances INTEGER DEFAULT 0;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS heisman_winners INTEGER DEFAULT 0;

-- Add recent records columns (last 3 years)
ALTER TABLE teams ADD COLUMN IF NOT EXISTS record_2024 TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS record_2023 TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS record_2022 TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS bowl_2024 TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS bowl_2023 TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS bowl_2022 TEXT;

-- Add additional indexes
CREATE INDEX IF NOT EXISTS idx_teams_categories ON teams USING GIN(categories);
CREATE INDEX IF NOT EXISTS idx_teams_name ON teams(name);

-- Add constraints for data validation
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_overall_rating') THEN
        ALTER TABLE teams ADD CONSTRAINT check_overall_rating 
        CHECK (overall_rating >= 0 AND overall_rating <= 99);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_offense_rating') THEN
        ALTER TABLE teams ADD CONSTRAINT check_offense_rating 
        CHECK (offense_rating >= 0 AND offense_rating <= 99);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_defense_rating') THEN
        ALTER TABLE teams ADD CONSTRAINT check_defense_rating 
        CHECK (defense_rating >= 0 AND defense_rating <= 99);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_stars') THEN
        ALTER TABLE teams ADD CONSTRAINT check_stars 
        CHECK (stars >= 0 AND stars <= 5);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_prestige') THEN
        ALTER TABLE teams ADD CONSTRAINT check_prestige 
        CHECK (prestige >= 0 AND prestige <= 100);
    END IF;
END $$;

-- Auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_teams_updated_at ON teams;
CREATE TRIGGER update_teams_updated_at 
  BEFORE UPDATE ON teams 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Add waitlist improvements
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS subscribed BOOLEAN DEFAULT true;

-- Add email validation to waitlist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'valid_email') THEN
        ALTER TABLE waitlist ADD CONSTRAINT valid_email 
        CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
