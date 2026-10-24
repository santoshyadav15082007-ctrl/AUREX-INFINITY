import {
  SignatureExperience,
  CollectionItem,
  MetricItem,
  Testimonial,
  MembershipTier,
} from '../types';

export const SIGNATURE_EXPERIENCES: SignatureExperience[] = [
  {
    id: 'orbital-voyages',
    title: 'Private Orbital Itinerary',
    subtitle: 'Low-Earth orbit suborbital observatory',
    category: 'Aeronautica & Space',
    image: '/src/assets/images/experience_orbital_1792820205589.jpg',
    curatorNotes: 'A seven-day sovereign suborbital residency crafted in collaboration with specialized civilian aerospace engineers. Private panoramic observation cupola, zero-gravity culinary pairings, and bespoke spacesuit commissions.',
    features: [
      'Dedicated suborbital ascent craft with private quarters',
      'Continuous astronomical observation dome',
      'Tailored zero-g physiological preparation protocol',
      'Full personal cinematic documentary archive'
    ],
    availability: '3 Expeditions Annually',
    allocation: 'Sovereign Patron Tier Only'
  },
  {
    id: 'hyper-yacht-charters',
    title: 'The Sovereign Archipelago Navigation',
    subtitle: '115-Meter hybrid kinetic cruiser',
    category: 'Haute Nautical',
    image: '/src/assets/images/hero_luxury_vessel_1792820171701.jpg',
    curatorNotes: 'Silent electric hydrodynamic propulsion gliding through untouched Mediterranean and Polynesian private atolls. Featuring subsea observation suites, helipad ingress, and Michelin-starred onboard culinary residency.',
    features: [
      'Twin silent electric hybrid propulsion pods',
      'Dual submarine tenders and private tender bay',
      'Subaquatic glass viewing lounge with bioluminescent lighting',
      'Master suite with 270-degree cantilevered sea terrace'
    ],
    availability: 'Global Seasonal Deployments',
    allocation: 'By Invitation Only'
  },
  {
    id: 'astronomical-horlogerie',
    title: 'Celestial Tourbillon Atelier',
    subtitle: 'Tri-axial celestial movement bespoke creation',
    category: 'Haute Horlogerie',
    image: '/src/assets/images/collection_timepiece_1792820172108.jpg',
    curatorNotes: 'A single timepiece conceived over 28 months in the Vallée de Joux. Features a mechanical planisphere calibrated precisely to the buyer’s birthplace coordinates and a hand-carved meteorite escapement bridge.',
    features: [
      'Tri-axial spherical tourbillon rotating in 30/60/120s cycles',
      'Gibeon meteorite dial plate with hand-beveled chamfers',
      'Sapphire crystal monolithic monobloc case',
      'Perpetual sidereal calendar and true astronomical moonphase'
    ],
    availability: 'Limit of 4 Commissions / Year',
    allocation: 'Atelier Guild Approved'
  },
  {
    id: 'cliffside-sanctuaries',
    title: 'The Solstice Cliffside Bastion',
    subtitle: 'Monolithic private residential architecture',
    category: 'Sovereign Estates',
    image: '/src/assets/images/collection_sanctuary_1792820172853.jpg',
    curatorNotes: 'Carved directly into the volcanic granite bluffs of the Balearic coastline. Seamless subterranean private tunnel access, infinity horizon saltwater pools, and complete autonomous energy microgrid architecture.',
    features: [
      '14,000 sq ft cantilevered living pavilion above the sea',
      'Private deep-water yacht mooring cove with funicular lift',
      'Independent geothermal and solar sovereign microgrid',
      '24/7 dedicated resident estate steward and concierge staff'
    ],
    availability: 'Private Acquisition or Residency',
    allocation: 'Verified Private Client'
  },
  {
    id: 'supersonic-aeronautica',
    title: 'Aero-Mach Executive Transcontinental',
    subtitle: 'Mach 1.6 supersonic business craft',
    category: 'Private Aviation',
    image: '/src/assets/images/collection_aeronautica_1792820172398.jpg',
    curatorNotes: 'Transforming intercontinental passage into an effortless transition. London to New York in three hours and fifteen minutes, wrapped in bespoke cashmere acoustic insulation and acoustic active damping.',
    features: [
      'Low-boom supersonic aerodynamics engineered for overland routes',
      'Acoustic damping cabin lowering ambient sound to 42 decibels',
      'Direct satellite encrypted communications terminal',
      'Private master stateroom with full en-suite walk-in shower'
    ],
    availability: 'Fleet Membership or Atelier Build',
    allocation: 'Crest Tier Priority'
  },
  {
    id: 'bespoke-atelier-supercar',
    title: 'Aurex One: Coachbuilt Kinetic Sculpture',
    subtitle: 'V12 hybrid limited series of nine units',
    category: 'Bespoke Atelier',
    image: '/src/assets/images/experience_hypercar_1792820205822.jpg',
    curatorNotes: 'A tour de force of unlacquered exposed twill carbon fiber and hand-hammered titanium bodywork. Developed with former Le Mans aerodynamicists to deliver 1,250 brake horsepower with peerless grand touring refinement.',
    features: [
      'Naturally aspirated 6.5L V12 paired with dual axial-flux electric motors',
      'Active predictive aero underfloor creating 900kg of ground-effect downforce',
      'Machined champagne gold magnesium center-lock wheels',
      'Bespoke cabin fitted precisely to the owner’s biometric proportions'
    ],
    availability: '9 Examples Worldwide',
    allocation: 'Private Collectors Syndicate'
  }
];

export const EXCLUSIVE_COLLECTION: CollectionItem[] = [
  {
    id: 'horlogerie-01',
    name: 'Aurex Meridian Tourbillon No. 04',
    edition: 'Edition of 7',
    category: 'horlogerie',
    image: '/src/assets/images/collection_timepiece_1792820172108.jpg',
    description: 'A sovereign astronomical masterwork featuring a hand-finished skeletonized tourbillon cage with champagne gold bridges and deep obsidian slate dial.',
    specifications: [
      { label: 'Caliber', value: 'AX-8800 Manual Wind' },
      { label: 'Power Reserve', value: '120 Hours (Twin Barrels)' },
      { label: 'Case Material', value: '18K Honey Gold & Sapphire' },
      { label: 'Complications', value: 'Sidereal Time & Tourbillon' }
    ],
    status: 'Inquire for Allocation'
  },
  {
    id: 'aeronautica-01',
    name: 'Aurex Skylance Mach VII',
    edition: 'Private Build Slot',
    category: 'aeronautica',
    image: '/src/assets/images/collection_aeronautica_1792820172398.jpg',
    description: 'Supersonic private jet platform offering quiet overland supersonic cruise, ultra-long range intercontinental flight, and bespoke cabin interior architecture.',
    specifications: [
      { label: 'Top Speed', value: 'Mach 1.6' },
      { label: 'Max Range', value: '4,800 Nautical Miles' },
      { label: 'Passenger Capacity', value: '10 VVIP Guests' },
      { label: 'Interior Suite', value: 'Full Stateroom & Conference' }
    ],
    status: 'Delivery Slot Q3 2027'
  },
  {
    id: 'nautical-01',
    name: 'Aurex Oceanic 115M Superyacht',
    edition: 'Flagship Hull No. 2',
    category: 'nautical',
    image: '/src/assets/images/hero_luxury_vessel_1792820171701.jpg',
    description: 'An architectural 115-meter explorer vessel designed for autonomous global navigation with zero-emission harbour transit and a commercial helideck.',
    specifications: [
      { label: 'Length Overall', value: '115.4 Meters (378 ft)' },
      { label: 'Gross Tonnage', value: '4,950 GT' },
      { label: 'Propulsion', value: 'Hybrid Diesel-Electric Pods' },
      { label: 'Range', value: '7,500 NM @ 12 Knots' }
    ],
    status: 'Commission Status: In Build'
  },
  {
    id: 'estates-01',
    name: 'Villa Obsidian Horizon',
    edition: 'Cap d’Antibes Private Bluffs',
    category: 'estates',
    image: '/src/assets/images/collection_sanctuary_1792820172853.jpg',
    description: 'A waterfront architectural estate suspended over deep azure Mediterranean waters with cantilevered terraces, infinity salt pool, and private deep-water dock.',
    specifications: [
      { label: 'Internal Living', value: '1,450 sq meters' },
      { label: 'Grounds', value: '1.8 Private Hectares' },
      { label: 'Suites', value: '7 Master Suites + Staff Annex' },
      { label: 'Amenities', value: 'Subterranean Spa & Helipad' }
    ],
    status: 'Private Portfolio Sale'
  },
  {
    id: 'horlogerie-02',
    name: 'Aurex Chrono Celestial Sovereign',
    edition: 'Unique Piece (1 of 1)',
    category: 'horlogerie',
    image: '/src/assets/images/collection_timepiece_1792820172108.jpg',
    description: 'Monopusher chronograph housing a perpetual calendar that requires zero manual correction for 400 years, adorned with diamond-set indexes and smoked sapphire glass.',
    specifications: [
      { label: 'Caliber', value: 'AX-9100 Integrated Chronograph' },
      { label: 'Frequency', value: '36,000 vph (5 Hz)' },
      { label: 'Dial', value: 'Smoked Obsidian Sapphire' },
      { label: 'Exclusivity', value: 'Single Unique Commission' }
    ],
    status: 'Acquired / Museum Reserve'
  },
  {
    id: 'estates-02',
    name: 'The Starlight Archipelago Villa',
    edition: 'Private Atoll Compound',
    category: 'estates',
    image: '/src/assets/images/collection_sanctuary_1792820172853.jpg',
    description: 'Ultra-secluded tropical sanctuary featuring floating pavilions, direct reef access, private airstrip access, and 100% off-grid clean energy generation.',
    specifications: [
      { label: 'Acreage', value: '14 Private Oceanfront Acres' },
      { label: 'Facilities', value: '4 Independent Villa Pavilions' },
      { label: 'Security', value: 'Biometric Access Control' },
      { label: 'Autonomy', value: 'Desalination & Solar Microgrid' }
    ],
    status: 'Select Residency Available'
  }
];

export const DEMO_METRICS: MetricItem[] = [
  {
    id: 'concierge-cities',
    value: 28,
    suffix: '',
    label: 'Global Metropolises',
    context: 'Direct private concierge lounges spanning Zurich, Mayfair, Ginza, Monaco, and Dubai'
  },
  {
    id: 'bespoke-commissions',
    value: 142,
    prefix: '',
    suffix: '+',
    label: 'Sovereign Acquisitions',
    context: 'Bespoke timepieces, aircraft interior commissions, and private estates completed since inception'
  },
  {
    id: 'client-retention',
    value: 99.4,
    suffix: '%',
    label: 'Patron Trust Index',
    context: 'Multi-generational relationship continuity across our founding private family offices'
  },
  {
    id: 'curated-assets',
    value: 4.8,
    prefix: '$',
    suffix: 'B',
    label: 'Curated Assets Transacted',
    context: 'Cumulative private portfolio volume facilitated under strict nondisclosure agreements'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'The level of discretion and aesthetic precision at Aurex Infinity is without parallel. When acquiring the Mach VII delivery slot, their concierge handled sovereign airspace approvals and bespoke cabin tailoring seamlessly.',
    clientName: 'Lord Alistair Sterling',
    title: 'Chairman, Sterling Sovereign Capital',
    location: 'London & Geneva',
    acquisitionType: 'Supersonic Aviation Commission',
    year: '2025'
  },
  {
    id: 't-2',
    quote: 'Commissioning the Meridian Tourbillon was an intimate artistic collaboration. Visiting the atelier in the Jura mountains and seeing my personal astronomical charts engineered into the gears was pure magic.',
    clientName: 'Elena Rostova-Kahn',
    title: 'Managing Director, Rostova Heritage Trust',
    location: 'Zurich & Monaco',
    acquisitionType: 'Unique Piece Haute Horlogerie',
    year: '2025'
  },
  {
    id: 't-3',
    quote: 'The Solstice cliffside estate exceeded every architectural aspiration. Aurex managed the land tenure, ecological sustainability audits, and custom subterranean yacht slipway without a single complication.',
    clientName: 'Kenzo Takahashi',
    title: 'Principal, Takahashi Architectural Foundation',
    location: 'Tokyo & Mallorca',
    acquisitionType: 'Monolithic Estate Acquisition',
    year: '2026'
  }
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'obsidian-key',
    name: 'The Obsidian Key',
    tagline: 'Entry into our confidential private client registry',
    tierLevel: 'Tier I Privilege',
    annualDues: '$45,000',
    initiation: '$20,000 one-time initiation fee',
    privileges: [
      'Access to preview allocations of limited haute horlogerie drops',
      'Dedicated private client liaison reachable 24 hours daily',
      'Preferred charter rights on partner luxury yacht fleet',
      'Invitations to annual private salon dinners in London & Geneva',
      'Complimentary biometric vault storage for fine assets'
    ]
  },
  {
    id: 'aurex-sovereign',
    name: 'The Aurex Sovereign',
    tagline: 'Unrestricted bespoke commission atelier access',
    tierLevel: 'Tier II Privilege',
    annualDues: '$120,000',
    initiation: '$50,000 one-time initiation fee',
    recommended: true,
    privileges: [
      'Guaranteed build allocation for supersonic aeronautica slots',
      'Direct atelier collaboration with master horologists & designers',
      'Priority sovereign residency bookings at cliffside sanctuaries',
      'Access to private suborbital orbital flight waitlists',
      'Global diplomatic concierge & secure asset escort services',
      'Custom champagne flight lounge reservations in 12 capitals'
    ]
  },
  {
    id: 'infinity-crest',
    name: 'The Infinity Crest',
    tagline: 'By sovereign council invitation and peer endorsement',
    tierLevel: 'Tier III Sovereign',
    annualDues: 'By Application',
    initiation: 'Council Ratification Required',
    privileges: [
      'Unlimited bespoke coachbuilding & yacht naval architecture advisory',
      'Private island compound co-ownership & sovereign leasing rights',
      'Direct seat on the Aurex Innovation Lab advisory guild',
      'Unrestricted priority charter access across entire global fleet',
      'Discreet family office estate preservation consultancy',
      'Enduring legacy membership transferable to designated heir'
    ]
  }
];

export const PHILOSOPHY_PILLARS = [
  {
    title: 'Sovereign Discretion',
    statement: 'True luxury does not clamor for attention. We operate in the quiet realm of private agreements, unsearchable records, and unwavering client confidentiality.'
  },
  {
    title: 'Singular Craftsmanship',
    statement: 'Every mechanical component, aerospace curve, and architectural terrace is executed by world masters with uncompromising material integrity.'
  },
  {
    title: 'Enduring Heritage',
    statement: 'We create tangible and experiential heirlooms engineered to outlast market cycles, trends, and generations with perpetual relevance.'
  }
];
