-- Fix UMass conference - should be MAC, not Independent
UPDATE teams SET conference = 'MAC' WHERE name = 'Massachusetts';
