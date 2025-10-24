import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Supabase client
const supabaseUrl = 'https://xnhvfmczxifxccvkgxmq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuaHZmbWN6eGlmeGNjdmtneG1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNzEzMDMsImV4cCI6MjA3Njc0NzMwM30.58WeDOMpOriO2DA7PkTk_Eth0znJ89Y4qmzNiFhVVSM'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Conference mappings
const conferenceMap = {
  // SEC
  'Alabama': 'SEC', 'Arkansas': 'SEC', 'Auburn': 'SEC', 'Florida': 'SEC',
  'Georgia': 'SEC', 'Kentucky': 'SEC', 'LSU': 'SEC', 'Mississippi State': 'SEC',
  'Missouri': 'SEC', 'Ole Miss': 'SEC', 'South Carolina': 'SEC', 'Tennessee': 'SEC',
  'Texas': 'SEC', 'Texas A&M': 'SEC', 'Vanderbilt': 'SEC', 'Oklahoma': 'SEC',
  
  // Big Ten
  'Illinois': 'Big Ten', 'Indiana': 'Big Ten', 'Iowa': 'Big Ten', 'Maryland': 'Big Ten',
  'Michigan': 'Big Ten', 'Michigan State': 'Big Ten', 'Minnesota': 'Big Ten',
  'Nebraska': 'Big Ten', 'Northwestern': 'Big Ten', 'Ohio State': 'Big Ten',
  'Oregon': 'Big Ten', 'Penn State': 'Big Ten', 'Purdue': 'Big Ten', 'Rutgers': 'Big Ten',
  'UCLA': 'Big Ten', 'USC': 'Big Ten', 'Washington': 'Big Ten', 'Wisconsin': 'Big Ten',
  
  // ACC
  'Boston College': 'ACC', 'Clemson': 'ACC', 'Duke': 'ACC', 'Florida State': 'ACC',
  'Georgia Tech': 'ACC', 'Louisville': 'ACC', 'Miami': 'ACC', 'NC State': 'ACC',
  'North Carolina': 'ACC', 'Pittsburgh': 'ACC', 'Syracuse': 'ACC', 'Virginia': 'ACC',
  'Virginia Tech': 'ACC', 'Wake Forest': 'ACC', 'California': 'ACC', 'Stanford': 'ACC',
  'SMU': 'ACC',
  
  // Big 12
  'Arizona': 'Big 12', 'Arizona State': 'Big 12', 'Baylor': 'Big 12', 'BYU': 'Big 12',
  'UCF': 'Big 12', 'Cincinnati': 'Big 12', 'Colorado': 'Big 12', 'Houston': 'Big 12',
  'Iowa State': 'Big 12', 'Kansas': 'Big 12', 'Kansas State': 'Big 12',
  'Oklahoma State': 'Big 12', 'TCU': 'Big 12', 'Texas Tech': 'Big 12',
  'Utah': 'Big 12', 'West Virginia': 'Big 12',
  
  // Group of 5 - AAC
  'Army': 'AAC', 'Charlotte': 'AAC', 'East Carolina': 'AAC', 'Florida Atlantic': 'AAC',
  'Memphis': 'AAC', 'Navy': 'AAC', 'North Texas': 'AAC', 'Rice': 'AAC',
  'South Florida': 'AAC', 'Temple': 'AAC', 'Tulane': 'AAC', 'Tulsa': 'AAC',
  'UAB': 'AAC', 'UTSA': 'AAC',
  
  // Mountain West
  'Air Force': 'Mountain West', 'Boise State': 'Mountain West', 'Colorado State': 'Mountain West',
  'Fresno State': 'Mountain West', 'Hawaii': 'Mountain West', 'Hawai\'i': 'Mountain West', 
  'Nevada': 'Mountain West', 'New Mexico': 'Mountain West', 'San Diego State': 'Mountain West', 
  'San Jose State': 'Mountain West', 'San José State': 'Mountain West',
  'UNLV': 'Mountain West', 'Utah State': 'Mountain West', 'Wyoming': 'Mountain West',
  
  // MAC
  'Akron': 'MAC', 'Ball State': 'MAC', 'Bowling Green': 'MAC', 'Buffalo': 'MAC',
  'Central Michigan': 'MAC', 'Eastern Michigan': 'MAC', 'Kent State': 'MAC',
  'Miami (OH)': 'MAC', 'Northern Illinois': 'MAC', 'Ohio': 'MAC', 'Toledo': 'MAC',
  'Western Michigan': 'MAC',
  
  // Sun Belt
  'Appalachian State': 'Sun Belt', 'Arkansas State': 'Sun Belt', 'Coastal Carolina': 'Sun Belt',
  'Georgia Southern': 'Sun Belt', 'Georgia State': 'Sun Belt', 'James Madison': 'Sun Belt',
  'Louisiana': 'Sun Belt', 'Marshall': 'Sun Belt', 'Old Dominion': 'Sun Belt',
  'South Alabama': 'Sun Belt', 'Southern Miss': 'Sun Belt', 'Texas State': 'Sun Belt',
  'Troy': 'Sun Belt', 'UL Monroe': 'Sun Belt',
  
  // C-USA
  'FIU': 'C-USA', 'Jacksonville State': 'C-USA', 'Kennesaw State': 'C-USA',
  'Liberty': 'C-USA', 'Louisiana Tech': 'C-USA', 'Middle Tennessee': 'C-USA',
  'New Mexico State': 'C-USA', 'Sam Houston': 'C-USA', 'UTEP': 'C-USA',
  'Western Kentucky': 'C-USA', 'Delaware': 'C-USA', 'Missouri State': 'C-USA',
  
  // Pac-12 (remaining schools)
  'Oregon State': 'Pac-12', 'Washington State': 'Pac-12',
  
  // Independent
  'Notre Dame': 'Independent', 'UConn': 'Independent', 'UMass': 'Independent', 'Massachusetts': 'Independent'
}

// Team metadata (location, colors, categories)
const teamMetadata = {
  'Alabama': { location: 'Tuscaloosa, AL', colors: ['#9E1B32', '#828A8F'], categories: ['Blue Blood', 'P4', 'Championship Contender', 'Elite Recruiting'] },
  'Ohio State': { location: 'Columbus, OH', colors: ['#BB0000', '#666666'], categories: ['Blue Blood', 'P4', 'Championship Contender', 'Elite Recruiting'] },
  'Georgia': { location: 'Athens, GA', colors: ['#BA0C2F', '#000000'], categories: ['Blue Blood', 'P4', 'Championship Contender', 'Elite Recruiting'] },
  'Oregon': { location: 'Eugene, OR', colors: ['#154733', '#FEE123'], categories: ['P4', 'Championship Contender', 'Elite Recruiting', 'Modern Powerhouse'] },
  'Texas': { location: 'Austin, TX', colors: ['#BF5700', '#FFFFFF'], categories: ['Blue Blood', 'P4', 'Sleeping Giant', 'Elite Recruiting'] },
  'Penn State': { location: 'State College, PA', colors: ['#041E42', '#FFFFFF'], categories: ['Blue Blood', 'P4', 'Championship Contender'] },
  'Notre Dame': { location: 'South Bend, IN', colors: ['#0C2340', '#C99700'], categories: ['Blue Blood', 'Independent', 'Championship Contender', 'Elite Recruiting'] },
  'Michigan': { location: 'Ann Arbor, MI', colors: ['#00274C', '#FFCB05'], categories: ['Blue Blood', 'P4', 'Championship Contender', 'Elite Recruiting'] },
  'USC': { location: 'Los Angeles, CA', colors: ['#990000', '#FFC72C'], categories: ['Blue Blood', 'P4', 'Sleeping Giant', 'Elite Recruiting'] },
  'Oklahoma': { location: 'Norman, OK', colors: ['#841617', '#FEFEFE'], categories: ['Blue Blood', 'P4', 'Sleeping Giant'] },
  'LSU': { location: 'Baton Rouge, LA', colors: ['#461D7C', '#FDD023'], categories: ['P4', 'Championship Contender', 'Elite Recruiting'] },
  'Clemson': { location: 'Clemson, SC', colors: ['#F56600', '#522D80'], categories: ['P4', 'Championship Contender', 'Elite Recruiting'] },
  'Florida State': { location: 'Tallahassee, FL', colors: ['#782F40', '#CEB888'], categories: ['Blue Blood', 'P4', 'Sleeping Giant'] },
  'Miami': { location: 'Miami, FL', colors: ['#F47321', '#005030'], categories: ['P4', 'Sleeping Giant', 'The U', 'Elite Recruiting'] },
  'Tennessee': { location: 'Knoxville, TN', colors: ['#FF8200', '#FFFFFF'], categories: ['Blue Blood', 'P4', 'Sleeping Giant'] },
  'Florida': { location: 'Gainesville, FL', colors: ['#0021A5', '#FA4616'], categories: ['Blue Blood', 'P4', 'Sleeping Giant'] },
  'Auburn': { location: 'Auburn, AL', colors: ['#0C2340', '#E87722'], categories: ['P4', 'Dark Horse', 'Giant Killer'] },
  'Texas A&M': { location: 'College Station, TX', colors: ['#500000', '#FFFFFF'], categories: ['P4', 'Sleeping Giant', 'Elite Recruiting'] },
  'Washington': { location: 'Seattle, WA', colors: ['#4B2E83', '#B7A57A'], categories: ['P4', 'Dark Horse'] },
  'Ole Miss': { location: 'Oxford, MS', colors: ['#CE1126', '#14213D'], categories: ['P4', 'Dark Horse'] },
  'Wisconsin': { location: 'Madison, WI', colors: ['#C5050C', '#FFFFFF'], categories: ['P4', 'Solid Program'] },
  'Utah': { location: 'Salt Lake City, UT', colors: ['#CC0000', '#000000'], categories: ['P4', 'Dark Horse'] },
  'Missouri': { location: 'Columbia, MO', colors: ['#F1B82D', '#000000'], categories: ['P4', 'Dark Horse'] },
  'Iowa': { location: 'Iowa City, IA', colors: ['#FFCD00', '#000000'], categories: ['P4', 'Solid Program'] },
  'Kansas State': { location: 'Manhattan, KS', colors: ['#512888', '#FFFFFF'], categories: ['P4', 'Dark Horse'] },
  'Oklahoma State': { location: 'Stillwater, OK', colors: ['#FF7300', '#000000'], categories: ['P4', 'Dark Horse'] },
  'Boise State': { location: 'Boise, ID', colors: ['#0033A0', '#D64309'], categories: ['Group of 5', 'Giant Killer', 'Blue Turf'] },
  'UCF': { location: 'Orlando, FL', colors: ['#BA9B37', '#000000'], categories: ['P4', 'Rising Program'] },
  'BYU': { location: 'Provo, UT', colors: ['#002E5D', '#FFFFFF'], categories: ['P4', 'Dark Horse'] },
  'Baylor': { location: 'Waco, TX', colors: ['#003015', '#FFB81C'], categories: ['P4', 'Dark Horse'] },
  'TCU': { location: 'Fort Worth, TX', colors: ['#4D1979', '#FFFFFF'], categories: ['P4', 'Dark Horse'] },
  'Louisville': { location: 'Louisville, KY', colors: ['#AD0000', '#000000'], categories: ['P4', 'Rising Program'] },
  'North Carolina': { location: 'Chapel Hill, NC', colors: ['#13294B', '#7BAFD4'], categories: ['P4', 'Sleeping Giant'] },
  'NC State': { location: 'Raleigh, NC', colors: ['#CC0000', '#FFFFFF'], categories: ['P4', 'Dark Horse'] },
  'Pittsburgh': { location: 'Pittsburgh, PA', colors: ['#003594', '#FFB81C'], categories: ['P4', 'Dark Horse'] },
  'Virginia Tech': { location: 'Blacksburg, VA', colors: ['#630031', '#CF4420'], categories: ['P4', 'Solid Program'] },
  'South Carolina': { location: 'Columbia, SC', colors: ['#73000A', '#000000'], categories: ['P4', 'Rebuild Project'] },
  'Kentucky': { location: 'Lexington, KY', colors: ['#0033A0', '#FFFFFF'], categories: ['P4', 'Rebuild Project'] },
  'Mississippi State': { location: 'Starkville, MS', colors: ['#660000', '#FFFFFF'], categories: ['P4', 'Rebuild Project'] },
  'Arkansas': { location: 'Fayetteville, AR', colors: ['#9D2235', '#FFFFFF'], categories: ['P4', 'Rebuild Project'] },
  'Vanderbilt': { location: 'Nashville, TN', colors: ['#866D4B', '#000000'], categories: ['P4', 'Rebuild Project', 'Ultimate Challenge'] },
  'Arizona': { location: 'Tucson, AZ', colors: ['#CC0033', '#003366'], categories: ['P4', 'Rebuild Project'] },
  'Arizona State': { location: 'Tempe, AZ', colors: ['#8C1D40', '#FFC627'], categories: ['P4', 'Dark Horse'] },
  'Colorado': { location: 'Boulder, CO', colors: ['#CFB87C', '#000000'], categories: ['P4', 'Rising Program'] },
  'West Virginia': { location: 'Morgantown, WV', colors: ['#002855', '#EAAA00'], categories: ['P4', 'Solid Program'] },
  'Iowa State': { location: 'Ames, IA', colors: ['#C8102E', '#F1BE48'], categories: ['P4', 'Dark Horse'] },
  'Texas Tech': { location: 'Lubbock, TX', colors: ['#CC0000', '#000000'], categories: ['P4', 'Rebuild Project'] },
  'Kansas': { location: 'Lawrence, KS', colors: ['#0051BA', '#E8000D'], categories: ['P4', 'Ultimate Challenge'] },
  'Cincinnati': { location: 'Cincinnati, OH', colors: ['#E00122', '#000000'], categories: ['P4', 'Rising Program'] },
  'Houston': { location: 'Houston, TX', colors: ['#C8102E', '#FFFFFF'], categories: ['P4', 'Rising Program'] },
  'UCLA': { location: 'Los Angeles, CA', colors: ['#2D68C4', '#FFE800'], categories: ['P4', 'Sleeping Giant'] },
  'Stanford': { location: 'Stanford, CA', colors: ['#8C1515', '#FFFFFF'], categories: ['P4', 'Rebuild Project'] },
  'California': { location: 'Berkeley, CA', colors: ['#003262', '#FDB515'], categories: ['P4', 'Rebuild Project'] },
  'Duke': { location: 'Durham, NC', colors: ['#003087', '#FFFFFF'], categories: ['P4', 'Rebuild Project'] },
  'Georgia Tech': { location: 'Atlanta, GA', colors: ['#B3A369', '#003057'], categories: ['P4', 'Rebuild Project'] },
  'Virginia': { location: 'Charlottesville, VA', colors: ['#232D4B', '#E57200'], categories: ['P4', 'Rebuild Project'] },
  'Syracuse': { location: 'Syracuse, NY', colors: ['#F76900', '#000E54'], categories: ['P4', 'Rebuild Project'] },
  'Wake Forest': { location: 'Winston-Salem, NC', colors: ['#9E7E38', '#000000'], categories: ['P4', 'Rebuild Project'] },
  'Boston College': { location: 'Chestnut Hill, MA', colors: ['#8B0015', '#FFFFFF'], categories: ['P4', 'Rebuild Project'] },
  'SMU': { location: 'Dallas, TX', colors: ['#C8102E', '#0033A0'], categories: ['P4', 'Rising Program'] },
  'Michigan State': { location: 'East Lansing, MI', colors: ['#18453B', '#FFFFFF'], categories: ['P4', 'Rebuild Project'] },
  'Minnesota': { location: 'Minneapolis, MN', colors: ['#7A0019', '#FFCC33'], categories: ['P4', 'Solid Program'] },
  'Nebraska': { location: 'Lincoln, NE', colors: ['#E41C38', '#FFFFFF'], categories: ['P4', 'Sleeping Giant'] },
  'Northwestern': { location: 'Evanston, IL', colors: ['#4E2A84', '#FFFFFF'], categories: ['P4', 'Rebuild Project'] },
  'Illinois': { location: 'Champaign, IL', colors: ['#13294B', '#E84A27'], categories: ['P4', 'Rebuild Project'] },
  'Indiana': { location: 'Bloomington, IN', colors: ['#990000', '#FFFFFF'], categories: ['P4', 'Rebuild Project'] },
  'Rutgers': { location: 'Piscataway, NJ', colors: ['#CC0033', '#FFFFFF'], categories: ['P4', 'Rebuild Project'] },
  'Purdue': { location: 'West Lafayette, IN', colors: ['#000000', '#CFB991'], categories: ['P4', 'Rebuild Project'] },
  'Maryland': { location: 'College Park, MD', colors: ['#E03A3E', '#FFD520'], categories: ['P4', 'Rebuild Project'] },
  
  // Group of 5 defaults
  'Memphis': { location: 'Memphis, TN', colors: ['#003087', '#98999E'], categories: ['Group of 5', 'Giant Killer'] },
  'Tulane': { location: 'New Orleans, LA', colors: ['#005F45', '#7BAFD4'], categories: ['Group of 5', 'Rising Program'] },
  'Army': { location: 'West Point, NY', colors: ['#000000', '#FFFFFF'], categories: ['Group of 5', 'Triple Option'] },
  'Navy': { location: 'Annapolis, MD', colors: ['#003087', '#FFFFFF'], categories: ['Group of 5', 'Triple Option'] },
  'Air Force': { location: 'Colorado Springs, CO', colors: ['#003087', '#C0C0C0'], categories: ['Group of 5', 'Triple Option'] },
  'Appalachian State': { location: 'Boone, NC', colors: ['#000000', '#FFCC00'], categories: ['Group of 5', 'Giant Killer'] },
  'James Madison': { location: 'Harrisonburg, VA', colors: ['#450084', '#FFB81C'], categories: ['Group of 5', 'Rising Program'] },
  'Coastal Carolina': { location: 'Conway, SC', colors: ['#006F71', '#F58020'], categories: ['Group of 5', 'Dark Horse'] },
  'Louisiana': { location: 'Lafayette, LA', colors: ['#CE181E', '#FFFFFF'], categories: ['Group of 5', 'Solid Program'] },
  'Liberty': { location: 'Lynchburg, VA', colors: ['#002147', '#A50934'], categories: ['Group of 5', 'Rising Program'] },
  'South Alabama': { location: 'Mobile, AL', colors: ['#003087', '#C8102E'], categories: ['Group of 5', 'Rebuild Project'] },
  'Troy': { location: 'Troy, AL', colors: ['#862234', '#B5B5B5'], categories: ['Group of 5', 'Solid Program'] },
  'Georgia Southern': { location: 'Statesboro, GA', colors: ['#003087', '#FFFFFF'], categories: ['Group of 5', 'Solid Program'] },
  'Georgia State': { location: 'Atlanta, GA', colors: ['#0039A6', '#C8102E'], categories: ['Group of 5', 'Rebuild Project'] },
  'Marshall': { location: 'Huntington, WV', colors: ['#00B140', '#FFFFFF'], categories: ['Group of 5', 'Solid Program'] },
  'Old Dominion': { location: 'Norfolk, VA', colors: ['#003057', '#00709E'], categories: ['Group of 5', 'Rebuild Project'] },
  'South Florida': { location: 'Tampa, FL', colors: ['#006747', '#CFC493'], categories: ['Group of 5', 'Rebuild Project'] },
  'East Carolina': { location: 'Greenville, NC', colors: ['#592A8A', '#FFCC00'], categories: ['Group of 5', 'Rebuild Project'] },
  'Florida Atlantic': { location: 'Boca Raton, FL', colors: ['#003366', '#CC0000'], categories: ['Group of 5', 'Rising Program'] },
  'North Texas': { location: 'Denton, TX', colors: ['#00853E', '#FFFFFF'], categories: ['Group of 5', 'Solid Program'] },
  'UTSA': { location: 'San Antonio, TX', colors: ['#0C2340', '#F15A22'], categories: ['Group of 5', 'Rising Program'] },
  'UAB': { location: 'Birmingham, AL', colors: ['#1E6B52', '#FFCC00'], categories: ['Group of 5', 'Rising Program'] },
  'Charlotte': { location: 'Charlotte, NC', colors: ['#00703C', '#B3A369'], categories: ['Group of 5', 'Rebuild Project'] },
  'Temple': { location: 'Philadelphia, PA', colors: ['#A41E35', '#FFFFFF'], categories: ['Group of 5', 'Rebuild Project'] },
  'Rice': { location: 'Houston, TX', colors: ['#00205B', '#7D97AD'], categories: ['Group of 5', 'Ultimate Challenge'] },
  'Tulsa': { location: 'Tulsa, OK', colors: ['#003366', '#C8102E'], categories: ['Group of 5', 'Rebuild Project'] },
  'San Diego State': { location: 'San Diego, CA', colors: ['#A6192E', '#000000'], categories: ['Group of 5', 'Solid Program'] },
  'Fresno State': { location: 'Fresno, CA', colors: ['#CC0033', '#003087'], categories: ['Group of 5', 'Solid Program'] },
  'San José State': { location: 'San Jose, CA', colors: ['#0055A2', '#E5A823'], categories: ['Group of 5', 'Rebuild Project'] },
  'UNLV': { location: 'Las Vegas, NV', colors: ['#B10202', '#666666'], categories: ['Group of 5', 'Dark Horse'] },
  'Colorado State': { location: 'Fort Collins, CO', colors: ['#1E4D2B', '#C8C372'], categories: ['Group of 5', 'Rebuild Project'] },
  'Utah State': { location: 'Logan, UT', colors: ['#0F2439', '#003087'], categories: ['Group of 5', 'Solid Program'] },
  'Nevada': { location: 'Reno, NV', colors: ['#003366', '#C0C0C0'], categories: ['Group of 5', 'Rebuild Project'] },
  'New Mexico': { location: 'Albuquerque, NM', colors: ['#BA0C2F', '#C0C0C0'], categories: ['Group of 5', 'Rebuild Project'] },
  'Wyoming': { location: 'Laramie, WY', colors: ['#492F24', '#FFC425'], categories: ['Group of 5', 'Rebuild Project'] },
  'Hawai\'i': { location: 'Honolulu, HI', colors: ['#024731', '#FFFFFF'], categories: ['Group of 5', 'Island Football'] },
  'Toledo': { location: 'Toledo, OH', colors: ['#003E7E', '#FFC82E'], categories: ['Group of 5', 'Solid Program'] },
  'Miami (OH)': { location: 'Oxford, OH', colors: ['#C8102E', '#FFFFFF'], categories: ['Group of 5', 'Cradle of Coaches'] },
  'Ohio': { location: 'Athens, OH', colors: ['#00694E', '#FFFFFF'], categories: ['Group of 5', 'Solid Program'] },
  'Bowling Green': { location: 'Bowling Green, OH', colors: ['#FE5000', '#4F2C1D'], categories: ['Group of 5', 'Rebuild Project'] },
  'Buffalo': { location: 'Buffalo, NY', colors: ['#005BBB', '#FFFFFF'], categories: ['Group of 5', 'Rebuild Project'] },
  'Central Michigan': { location: 'Mount Pleasant, MI', colors: ['#6A0032', '#FFC82E'], categories: ['Group of 5', 'Rebuild Project'] },
  'Eastern Michigan': { location: 'Ypsilanti, MI', colors: ['#006633', '#FFFFFF'], categories: ['Group of 5', 'Rebuild Project'] },
  'Kent State': { location: 'Kent, OH', colors: ['#002664', '#EAAA00'], categories: ['Group of 5', 'Rebuild Project'] },
  'Northern Illinois': { location: 'DeKalb, IL', colors: ['#BA0C2F', '#000000'], categories: ['Group of 5', 'Solid Program'] },
  'Western Michigan': { location: 'Kalamazoo, MI', colors: ['#612C2B', '#FFFFFF'], categories: ['Group of 5', 'Rebuild Project'] },
  'Ball State': { location: 'Muncie, IN', colors: ['#BA0C2F', '#FFFFFF'], categories: ['Group of 5', 'Rebuild Project'] },
  'Akron': { location: 'Akron, OH', colors: ['#041E42', '#A89968'], categories: ['Group of 5', 'Ultimate Challenge'] },
  'Western Kentucky': { location: 'Bowling Green, KY', colors: ['#C8102E', '#FFFFFF'], categories: ['Group of 5', 'Solid Program'] },
  'Middle Tennessee': { location: 'Murfreesboro, TN', colors: ['#0066CC', '#FFFFFF'], categories: ['Group of 5', 'Rebuild Project'] },
  'Louisiana Tech': { location: 'Ruston, LA', colors: ['#002D62', '#E31B23'], categories: ['Group of 5', 'Rebuild Project'] },
  'Jacksonville State': { location: 'Jacksonville, AL', colors: ['#CC0000', '#FFFFFF'], categories: ['Group of 5', 'Rising Program'] },
  'Sam Houston': { location: 'Huntsville, TX', colors: ['#F47920', '#FFFFFF'], categories: ['Group of 5', 'Rising Program'] },
  'New Mexico State': { location: 'Las Cruces, NM', colors: ['#7C0019', '#FFFFFF'], categories: ['Group of 5', 'Rebuild Project'] },
  'UTEP': { location: 'El Paso, TX', colors: ['#FF8200', '#041E42'], categories: ['Group of 5', 'Rebuild Project'] },
  'FIU': { location: 'Miami, FL', colors: ['#081E3F', '#B6862C'], categories: ['Group of 5', 'Rebuild Project'] },
  'Kennesaw State': { location: 'Kennesaw, GA', colors: ['#000000', '#FDB82A'], categories: ['Group of 5', 'Rising Program'] },
  'UConn': { location: 'Storrs, CT', colors: ['#000E2F', '#FFFFFF'], categories: ['Independent', 'Rebuild Project'] },
  'UMass': { location: 'Amherst, MA', colors: ['#881C1C', '#FFFFFF'], categories: ['Independent', 'Ultimate Challenge'] },
  'Arkansas State': { location: 'Jonesboro, AR', colors: ['#CC092F', '#000000'], categories: ['Group of 5', 'Rebuild Project'] },
  'Southern Miss': { location: 'Hattiesburg, MS', colors: ['#000000', '#FFAA3C'], categories: ['Group of 5', 'Rebuild Project'] },
  'Texas State': { location: 'San Marcos, TX', colors: ['#501214', '#FFFFFF'], categories: ['Group of 5', 'Rebuild Project'] },
  'UL Monroe': { location: 'Monroe, LA', colors: ['#7C0019', '#FFFFFF'], categories: ['Group of 5', 'Ultimate Challenge'] },
  
  // Missing teams
  'Oregon State': { location: 'Corvallis, OR', colors: ['#DC4405', '#000000'], categories: ['Pac-12', 'Rebuild Project'] },
  'Washington State': { location: 'Pullman, WA', colors: ['#981E32', '#5E6A71'], categories: ['Pac-12', 'Rebuild Project'] },
  'Delaware': { location: 'Newark, DE', colors: ['#00539F', '#FFD200'], categories: ['Group of 5', 'Rising Program'] },
  'Missouri State': { location: 'Springfield, MO', colors: ['#5E0000', '#FFFFFF'], categories: ['Group of 5', 'Rebuild Project'] },
  'Hawaii': { location: 'Honolulu, HI', colors: ['#024731', '#FFFFFF'], categories: ['Group of 5', 'Island Football'] },
  'San Jose State': { location: 'San Jose, CA', colors: ['#0055A2', '#E5A823'], categories: ['Group of 5', 'Rebuild Project'] },
  'Massachusetts': { location: 'Amherst, MA', colors: ['#881C1C', '#FFFFFF'], categories: ['Independent', 'Ultimate Challenge'] }
}

// Assign difficulty based on ratings
function getDifficulty(overallRating) {
  if (overallRating >= 90) return 'Elite'
  if (overallRating >= 85) return 'Hard'
  if (overallRating >= 80) return 'Medium'
  if (overallRating >= 75) return 'Easy'
  return 'Beginner'
}

// Calculate prestige (1-6 star system based on program history)
function getPrestige(teamName, overallRating) {
  const blueBlood = ['Alabama', 'Ohio State', 'Michigan', 'Notre Dame', 'USC', 'Texas', 'Oklahoma', 'Nebraska', 'Tennessee', 'Florida State', 'Florida', 'Penn State']
  const elitePrograms = ['Georgia', 'LSU', 'Clemson', 'Oregon', 'Miami', 'Auburn', 'Texas A&M', 'Wisconsin', 'Washington']
  
  if (blueBlood.includes(teamName)) return 6
  if (elitePrograms.includes(teamName)) return 5
  if (overallRating >= 85) return 4
  if (overallRating >= 80) return 3
  if (overallRating >= 75) return 2
  return 1
}

async function migrateTeams() {
  try {
    console.log('Reading ratings file...')
    const ratingsFile = fs.readFileSync(path.join(__dirname, 'update-ratings.txt'), 'utf-8')
    const lines = ratingsFile.trim().split('\n')
    
    const teams = []
    
    for (const line of lines) {
      if (!line.trim()) continue
      // Split by tab and filter out empty strings
      const parts = line.split('\t').map(p => p.trim()).filter(p => p)
      if (parts.length !== 5) {
        console.log(`Skipping line (${parts.length} parts):`, parts)
        continue
      }
      
      const [name, stars, overall, offense, defense] = parts
      const conference = conferenceMap[name] || 'Independent'
      const metadata = teamMetadata[name] || {
        location: 'Unknown',
        colors: ['#000000', '#FFFFFF'],
        categories: ['Group of 5']
      }
      
      const team = {
        name: name,
        conference: conference,
        categories: metadata.categories,
        difficulty: getDifficulty(parseInt(overall)),
        prestige: getPrestige(name, parseInt(overall)),
        overall_rating: parseInt(overall),
        offense_rating: parseInt(offense),
        defense_rating: parseInt(defense),
        stars: parseFloat(stars),
        location: metadata.location,
        color_primary: metadata.colors[0],
        color_secondary: metadata.colors[1]
      }
      
      teams.push(team)
    }
    
    console.log(`Parsed ${teams.length} teams from ratings file`)
    
    // Insert teams into Supabase
    console.log('Inserting teams into Supabase...')
    const { data, error } = await supabase
      .from('teams')
      .insert(teams)
    
    if (error) {
      console.error('Error inserting teams:', error)
      return
    }
    
    console.log(`✅ Successfully migrated ${teams.length} teams to Supabase!`)
    
    // Verify
    const { count } = await supabase
      .from('teams')
      .select('*', { count: 'exact', head: true })
    
    console.log(`Total teams in database: ${count}`)
    
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

migrateTeams()
