import {
  Waves,
  Droplets,
  Leaf,
  TreePine,
  Bike,
  CircleDot,
  Sparkles,
  Landmark,
  Snowflake,
  type LucideIcon,
} from 'lucide-react'

export interface Service {
  slug: string
  title: string
  shortTitle: string
  description: string
  longDescription: string
  icon: LucideIcon
  image: string
  features: string[]
  process: string[]
  faqs: { question: string; answer: string }[]
}

export const SERVICES: Service[] = [
  {
    slug: 'pools-spa',
    title: 'Custom Pools & Spa',
    shortTitle: 'Pools + Spa',
    description:
      'Custom swimming pools and spas planned around grade, equipment, access, and how your family wants to swim.',
    longDescription: `A pool has to fit the yard before it can become the favorite part of it. We plan custom pools around grade, equipment access, drainage, shade, views, and the way people will move between the house, patio, spa, and water.

That can mean a clean modern pool, a natural boulder edge, a spa tucked close to the house, or a full pool and patio layout. The goal is simple: make the water look right, work right, and hold up in Utah weather.`,
    icon: Waves,
    image: '/images/pools.jpg',
    features: [
      'Custom pool shapes and designs',
      'Infinity and vanishing edge pools',
      'Integrated spa and hot tub features',
      'Beach entries and sun shelves',
      'Swim-up bars and in-pool seating',
      'LED lighting and fiber optics',
      'Automated pool systems',
      'Natural and saltwater options',
    ],
    process: [
      'Site walk and project goals',
      'Layout, grades, equipment, and finish planning',
      'Engineering and permit coordination',
      'Excavation and structural installation',
      'Plumbing, electrical, and equipment setup',
      'Finish selection and application',
      'Landscaping integration and final details',
      'System training and handoff',
    ],
    faqs: [
      {
        question: 'How long does a custom pool installation take?',
        answer:
          'Most custom pools take 8-12 weeks from groundbreaking to completion. Complex designs with extensive features may take longer. Weather can also affect timelines.',
      },
      {
        question: 'What pool finishes do you offer?',
        answer:
          'We offer a range of finishes including pebble, quartz, glass bead, and plaster in various colors. Each creates a different look and feel for your pool.',
      },
      {
        question: 'Can you add a spa to an existing pool?',
        answer:
          'In many cases, yes. We can integrate a spa into your existing pool setup or create a standalone spa that complements your current design.',
      },
    ],
  },
  {
    slug: 'water-features',
    title: 'Water Features',
    shortTitle: 'Water Features',
    description:
      'Waterfalls, streams, fountains, and water walls built for movement, sound, service access, and Utah winters.',
    longDescription: `Moving water changes how a yard feels, but it also has to be engineered correctly. We build water features with the right basin, pump, filtration, stone, grade, and winter plan so they do not become a maintenance headache.

That might be a boulder waterfall, a short stream, a fountain, a rain curtain, or a modern water wall. We focus on the sound, the view from the house, the service access, and the way the feature will age outside.`,
    icon: Droplets,
    image: '/images/waterFeature.jpg',
    features: [
      'Natural boulder waterfalls',
      'Cascading stream systems',
      'Modern water walls and rain curtains',
      'Bubbling rock fountains',
      'Reflecting pools and ponds',
      'Fire and water combinations',
      'LED underwater lighting',
      'Smart control systems',
    ],
    process: [
      'Design consultation and feature selection',
      'Site evaluation and water source planning',
      'Excavation and foundation work',
      'Pump and filtration system installation',
      'Boulder and stone placement',
      'Liner and waterproofing application',
      'Plumbing and electrical connections',
      'Testing, balancing, and training',
    ],
    faqs: [
      {
        question: 'How much maintenance do water features require?',
        answer:
          'Modern water features with proper filtration need minimal maintenance, occasional cleaning, pump checks, and seasonal winterization. We offer maintenance packages for hands-off ownership.',
      },
      {
        question: 'Can water features run year-round in Utah?',
        answer:
          'Many features can operate in winter with proper de-icing equipment. Others are winterized seasonally. We design for your preference and Utah\'s climate.',
      },
      {
        question: 'Do water features use a lot of water?',
        answer:
          'Recirculating systems use the same water continuously with minimal evaporation loss. They\'re more efficient than you might expect.',
      },
    ],
  },
  {
    slug: 'outdoor-living-landscaping',
    title: 'Outdoor Living & Landscaping',
    shortTitle: 'Outdoor Living',
    description:
      'Patios, planting, grading, drainage, shade, and landscape gathering areas planned around how the yard gets used.',
    longDescription: `Outdoor living and landscaping are often what make the rest of the yard feel finished. We plan patios, planting, grading, drainage, shade, access, and gathering areas around the pool, track, water feature, kitchen, or open space they need to support.

This is not mow-and-blow landscaping. It is site work, hardscape, softscape, circulation, and outdoor rooms designed to make the whole property easier to use.`,
    icon: Leaf,
    image: '/images/waterFeature.jpg',
    features: [
      'Patio and hardscape layouts',
      'Landscape planting plans',
      'Grading and drainage coordination',
      'Shade and seating areas',
      'Walkways and circulation',
      'Boulder, mulch, and finish details',
      'Lawn and open play areas',
      'Landscape lighting coordination',
    ],
    process: [
      'Site walk and usage goals',
      'Grade, drainage, and access review',
      'Outdoor room and circulation layout',
      'Planting and material selection',
      'Hardscape and softscape installation',
      'Lighting, irrigation, and finish coordination',
      'Final grading and cleanup',
      'Walkthrough and care notes',
    ],
    faqs: [
      {
        question: 'Do you do standalone landscaping projects?',
        answer:
          'Yes, when the project needs design-build planning, grading, hardscape, planting, or outdoor living work. We are a better fit for full site improvements than routine maintenance.',
      },
      {
        question: 'Can landscaping be part of a pool or pumptrack project?',
        answer:
          'Absolutely. Most larger builds need landscape planning around drainage, planting, shade, circulation, and how people move through the yard.',
      },
      {
        question: 'Do you handle patios and outdoor rooms?',
        answer:
          'Yes. We design and build patios, paths, seating areas, shade structures, and gathering spaces that connect the main features of the yard.',
      },
    ],
  },
  {
    slug: 'play-houses',
    title: 'Custom Play Houses',
    shortTitle: 'Play Houses',
    description:
      'Treehouses and play structures built to be sturdy, safe, and worth exploring.',
    longDescription: `A good playhouse has to feel fun without feeling flimsy. We build treehouses and play structures with real framing, safe access, durable materials, and enough detail to keep kids coming back.

Some projects tie into mature trees. Others are freestanding structures with bridges, slides, climbing walls, lookout platforms, and covered areas. We design them around the yard, the age range, and the way the family wants to use the space.`,
    icon: TreePine,
    image: '/images/treehouse.jpg',
    features: [
      'Custom treehouse designs',
      'Multi-level play structures',
      'Rope bridges and zip lines',
      'Climbing walls and cargo nets',
      'Built-in slides and fire poles',
      'Lookout towers and crow\'s nests',
      'Weather-protected spaces',
      'Lighting and electrical options',
    ],
    process: [
      'Family wish list and site walk',
      'Site evaluation and tree assessment',
      'Custom design development',
      'Engineering for safety and longevity',
      'Material selection and preparation',
      'Foundation and structural installation',
      'Feature and finish installation',
      'Safety inspection and family reveal',
    ],
    faqs: [
      {
        question: 'Do we need a large tree for a treehouse?',
        answer:
          'Not necessarily. We can build elevated "treehouses" on posts when suitable trees aren\'t available, or incorporate smaller trees into the design structure.',
      },
      {
        question: 'What age range are your play structures designed for?',
        answer:
          'We design for all ages, from toddler-friendly structures to adventurous builds for older kids. Many designs grow with your children through adjustable features.',
      },
      {
        question: 'How do you ensure safety?',
        answer:
          'Every structure is engineered to exceed safety standards. We use commercial-grade hardware, proper railing heights, and impact-absorbing materials where needed.',
      },
    ],
  },
  {
    slug: 'skate-bike',
    title: 'Skate & Bike Parks',
    shortTitle: 'Skate + Bike',
    description:
      'Private skateparks and bike courses shaped around rider skill, flow, drainage, and available space.',
    longDescription: `A backyard skatepark has to ride well, drain well, and fit the people who will use it. We lay out private skateparks and bike features around skill level, speed, progression, sight lines, and the space available.

That can include concrete bowls, half-pipes, quarter pipes, ledges, rails, stairs, pump lines, dirt jumps, or BMX features. We care about the transitions, the approach, the landing, and whether it still feels good after the first week.`,
    icon: Bike,
    image: '/images/skatepark.jpg',
    features: [
      'Concrete bowls and half-pipes',
      'Street-style plazas',
      'Rails, ledges, and stairs',
      'Quarter pipes and banks',
      'MTB dirt jump lines',
      'BMX racing tracks',
      'Progressive skill features',
      'Night lighting systems',
    ],
    process: [
      'Rider consultation and site walk',
      'Site survey and design development',
      'Engineering and flow analysis',
      'Excavation and base preparation',
      'Steel reinforcement installation',
      'Concrete pour and finishing',
      'Feature construction',
      'Final shaping and rider testing',
    ],
    faqs: [
      {
        question: 'How much space do I need for a backyard skatepark?',
        answer:
          'A meaningful skate feature can fit in spaces as small as 20x30 feet. Larger properties can accommodate full parks with multiple features. We design to maximize your available space.',
      },
      {
        question: 'What skill level do you design for?',
        answer:
          'We design for all skill levels and can include progressive features that grow with your abilities. Many parks include beginner-friendly areas alongside advanced features.',
      },
      {
        question: 'How long do concrete skateparks last?',
        answer:
          'Properly built concrete skateparks last decades with minimal maintenance. The concrete actually improves with skating over time.',
      },
    ],
  },
  {
    slug: 'pumptracks',
    title: 'Pump Tracks',
    shortTitle: 'Pumptracks',
    description:
      'Backyard pumptrack circuits for bikes, scooters, skates, and repeat laps without leaving home.',
    longDescription: `Pumptracks look simple until you ride one that does not flow. The shape of every roller, berm, transition, and straightaway matters. We build residential pumptracks that work for bikes, scooters, skateboards, and different rider levels.

Some tracks are compact loops for young riders. Others are larger asphalt or concrete layouts with multiple lines and faster rhythm. We plan for drainage, maintenance, surfacing, and the room riders need to keep coming back.`,
    icon: CircleDot,
    image: '/images/pumptrack.jpg',
    features: [
      'Asphalt and concrete surfaces',
      'Progressive roller heights',
      'Banked turns and berms',
      'Multi-line options',
      'All-ages design capability',
      'Competition-grade specifications',
      'Drainage integration',
      'Night riding lighting',
    ],
    process: [
      'Site evaluation and space planning',
      'Custom track design and flow analysis',
      'Excavation and subgrade preparation',
      'Base material installation',
      'Roller and berm shaping',
      'Surface application',
      'Fine-tuning and flow testing',
      'Rider orientation and tips',
    ],
    faqs: [
      {
        question: 'What\'s the minimum size for a pump track?',
        answer:
          'Effective pump tracks can be built in spaces as small as 40x60 feet. Larger areas allow for more features and longer runs, but smaller tracks can still provide excellent riding.',
      },
      {
        question: 'Asphalt or concrete, which is better?',
        answer:
          'Both work well. Asphalt is typically more cost-effective and can be easily modified. Concrete is more durable long-term and provides a smoother riding surface.',
      },
      {
        question: 'Can adults and kids ride the same track?',
        answer:
          'Absolutely. We design tracks with progressive features that work for riders of all ages and skill levels. The physics of pumping works the same regardless of size.',
      },
    ],
  },
  {
    slug: 'entertainment',
    title: 'Entertainment Structures',
    shortTitle: 'Entertainment',
    description:
      'Outdoor kitchens, pavilions, theaters, shade structures, and gathering areas built for regular use.',
    longDescription: `Outdoor gathering areas work best when the practical pieces are solved early: shade, wind, seating, utilities, cooking, lighting, sound, storage, and weather protection.

We build outdoor kitchens, bars, pavilions, pergolas, fire features, theaters, and covered rooms that fit the way you actually host. The goal is a space people use often, not a pretty corner that only gets photographed once.`,
    icon: Sparkles,
    image: '/images/entertainment.jpg',
    features: [
      'Outdoor kitchens and bars',
      'Pizza ovens and smokers',
      'Covered pavilions and pergolas',
      'Outdoor theaters and screens',
      'Fire pits and gathering areas',
      'Sound and lighting systems',
      'Heating and cooling options',
      'Weatherproof furniture',
    ],
    process: [
      'Lifestyle consultation and wish list',
      'Custom design and layout planning',
      'Material and equipment selection',
      'Foundation and utility preparation',
      'Structure construction',
      'Appliance and system installation',
      'Finish work and detailing',
      'Walkthrough and celebration',
    ],
    faqs: [
      {
        question: 'Can an outdoor kitchen be used year-round?',
        answer:
          'With proper design including heating, wind protection, and covered areas, outdoor kitchens can be enjoyed in all seasons. We design for Utah\'s climate.',
      },
      {
        question: 'What appliances can go in an outdoor kitchen?',
        answer:
          'Almost anything, grills, smokers, pizza ovens, refrigerators, ice makers, kegerators, sinks, and more. We help you select the right equipment for your cooking style.',
      },
      {
        question: 'Do outdoor theaters work in daylight?',
        answer:
          'Covered structures and high-brightness screens make daytime viewing possible. Evening showings are always stunning under the stars.',
      },
    ],
  },
  {
    slug: 'landmarks',
    title: 'Landmark Features',
    shortTitle: 'Landmarks',
    description:
      'Custom site features, sculptural elements, and one-off builds that need design, fabrication, and installation.',
    longDescription: `Some projects do not fit a normal service category. They might be a sculptural water feature, a custom entry, a small folly, a themed environment, or a one-off structure that needs design, fabrication, and careful installation.

We help turn those ideas into something buildable. That means sketches, materials, engineering, site prep, fabrication, lighting, and enough restraint to make the feature feel intentional instead of random.`,
    icon: Landmark,
    image: '/images/landmark.jpg',
    features: [
      'Custom sculptural elements',
      'Architectural follies and structures',
      'Themed environments',
      'Monumental water features',
      'Artistic lighting installations',
      'Integration of existing art',
      'Material experimentation',
      'Branded or personal elements',
    ],
    process: [
      'Idea review and site walk',
      'Concept sketches and development',
      'Engineering and fabrication planning',
      'Material sourcing and procurement',
      'Site preparation',
      'Installation and construction',
      'Lighting and finishing',
      'Final walkthrough and documentation',
    ],
    faqs: [
      {
        question: 'Can you bring my specific idea to life?',
        answer:
          'That is exactly the kind of work we take on. Bring a rough sketch, a reference photo, or even a loose idea and we will help turn it into a buildable plan.',
      },
      {
        question: 'What materials can be used for landmark features?',
        answer:
          'We work with stone, metal, concrete, glass, wood, and more. Material selection depends on your design, budget, and maintenance preferences.',
      },
      {
        question: 'How do you ensure landmark features are structurally sound?',
        answer:
          'Every feature is engineered by licensed professionals to withstand weather, time, and use. Beauty and safety go hand in hand.',
      },
    ],
  },
  {
    slug: 'winterscape',
    title: 'Winterscape & Ice Rinks',
    shortTitle: 'Winterscape',
    description:
      'Private ice rinks, winter sports features, and cold-weather outdoor spaces built for Utah winters.',
    longDescription: `Utah winter can be part of the backyard instead of the season that shuts it down. We build private ice rinks, hockey setups, warming areas, snow features, and cold-weather layouts that make sense for the site.

Some rinks are seasonal natural-freeze installations. Others use refrigeration, boards, lighting, and more permanent infrastructure. We plan the base, drainage, summer use, winter operations, and the handoff so the system is practical to run.`,
    icon: Snowflake,
    image: '/images/icerink.jpg',
    features: [
      'Natural freeze ice rinks',
      'Refrigerated ice systems',
      'Hockey boards and goals',
      'Skating lighting systems',
      'Warming huts and shelters',
      'Snow-making equipment',
      'Winter-interest landscaping',
      'Heated pathways and patios',
    ],
    process: [
      'Winter recreation consultation',
      'Site evaluation and planning',
      'System selection and sizing',
      'Infrastructure installation',
      'Surface preparation',
      'Equipment and feature installation',
      'Testing and optimization',
      'Seasonal operation training',
    ],
    faqs: [
      {
        question: 'How cold does it need to be for a natural ice rink?',
        answer:
          'Natural ice rinks need consistent temperatures below 25°F for several days to freeze properly. In Utah, this typically means December through February.',
      },
      {
        question: 'Can I have an ice rink in a warmer climate area?',
        answer:
          'Refrigerated systems can maintain ice in temperatures up to 60°F, allowing skating even during mild winter days. They\'re a larger investment but provide reliable ice.',
      },
      {
        question: 'What happens to ice rink infrastructure in summer?',
        answer:
          'Natural rink areas can be designed to function as sport courts, patios, or lawn areas in summer. Refrigerated systems remain dormant until the next season.',
      },
    ],
  },
]
