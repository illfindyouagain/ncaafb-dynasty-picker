-- Recalculate difficulty levels (better teams = easier difficulty)
-- Logic: Conference tier + stars = difficulty (higher = easier)

-- Beginner: P4 teams with 3+ stars OR any team with 4+ stars
UPDATE teams SET difficulty = 'Beginner' 
WHERE stars >= 4 
   OR (stars >= 3 AND conference IN ('SEC', 'Big Ten', 'Big 12', 'ACC'));

-- Intermediate: P4 teams with 2-2.9 stars OR G5 teams with 3+ stars
UPDATE teams SET difficulty = 'Intermediate' 
WHERE (stars >= 2 AND stars < 3 AND conference IN ('SEC', 'Big Ten', 'Big 12', 'ACC'))
   OR (stars >= 3 AND stars < 4 AND conference NOT IN ('SEC', 'Big Ten', 'Big 12', 'ACC'));

-- Advanced: G5 teams with below 3 stars OR P4 teams with below 2 stars (hardest rebuilds)
UPDATE teams SET difficulty = 'Advanced' 
WHERE (stars < 3 AND conference NOT IN ('SEC', 'Big Ten', 'Big 12', 'ACC'))
   OR (stars < 2 AND conference IN ('SEC', 'Big Ten', 'Big 12', 'ACC'));
