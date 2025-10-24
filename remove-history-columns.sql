-- Remove program history columns from teams table
ALTER TABLE teams DROP COLUMN IF EXISTS all_time_wins;
ALTER TABLE teams DROP COLUMN IF EXISTS all_time_losses;
ALTER TABLE teams DROP COLUMN IF EXISTS national_championships;
ALTER TABLE teams DROP COLUMN IF EXISTS conference_championships;
ALTER TABLE teams DROP COLUMN IF EXISTS bowl_appearances;
ALTER TABLE teams DROP COLUMN IF EXISTS playoff_appearances;
ALTER TABLE teams DROP COLUMN IF EXISTS heisman_winners;

-- Remove recent records columns
ALTER TABLE teams DROP COLUMN IF EXISTS record_2024;
ALTER TABLE teams DROP COLUMN IF EXISTS record_2023;
ALTER TABLE teams DROP COLUMN IF EXISTS record_2022;
ALTER TABLE teams DROP COLUMN IF EXISTS bowl_2024;
ALTER TABLE teams DROP COLUMN IF EXISTS bowl_2023;
ALTER TABLE teams DROP COLUMN IF EXISTS bowl_2022;
