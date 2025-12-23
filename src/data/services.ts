import {
  Waves,
  Droplets,
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
      'Luxury custom swimming pools and spas designed as the centerpiece of your backyard paradise.',
    longDescription: `At Valley Design Build, we believe a pool should be more than just a place to swim—it should be a destination. Our custom pools are designed to integrate seamlessly with your landscape, creating a cohesive outdoor living experience that reflects your personal style and lifestyle needs.

From infinity edges that blend into the horizon to naturalistic lagoon pools surrounded by boulder waterfalls, we bring imagination and engineering together. Our spa designs complement your pool or stand alone as intimate retreats for relaxation and rejuvenation.`,
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
      'Initial consultation to understand your vision',
      'Custom design development with 3D visualization',
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
      'Dramatic waterfalls, streams, fountains, and water walls that bring movement and sound to your landscape.',
    longDescription: `Water has a transformative power unlike any other landscape element. The sound of flowing water creates instant tranquility, while dramatic waterfalls and cascades add visual excitement. At Valley Design Build, we design water features that become the soul of your outdoor space.

From natural boulder waterfalls that look carved by nature to sleek modern water walls and rain curtains, we engineer each feature for reliability and impact. Our systems are designed for Utah's climate with proper circulation, filtration, and winterization capabilities.`,
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
          'Modern water features with proper filtration need minimal maintenance—occasional cleaning, pump checks, and seasonal winterization. We offer maintenance packages for hands-off ownership.',
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
    slug: 'play-houses',
    title: 'Custom Play Houses',
    shortTitle: 'Play Houses',
    description:
      'Imaginative treehouses and play structures that create magical spaces for adventure and creativity.',
    longDescription: `Every child deserves a space where imagination runs wild. Our custom playhouses and treehouses go far beyond prefab structures—they're architectural adventures designed to inspire creativity, encourage outdoor play, and create lasting memories.

From rustic treehouse retreats nestled in mature trees to elaborate multi-level play complexes with bridges, slides, and climbing walls, we design and build structures that become the backdrop for childhood adventures. Each build is engineered for safety while maximizing fun.`,
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
      'Dream session with the whole family',
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
      'Private skateparks and bike courses that bring world-class action sports to your backyard.',
    longDescription: `Why travel to the skatepark when the skatepark can come to you? Valley Design Build creates private skateparks and bike facilities that rival public parks in quality and creativity. Whether you're raising the next X Games champion or just want a place to enjoy your passion, we build it.

From smooth concrete bowls and half-pipes to street-style plazas with rails, stairs, and ledges, our skateparks are designed by riders for riders. We also build MTB dirt jump lines, pump tracks, and BMX facilities—all engineered for proper flow and progression.`,
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
      'Rider consultation and vision session',
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
      'Professional pump track circuits for bikes, skates, and scooters—endless laps of pure fun.',
    longDescription: `Pump tracks are the ultimate backyard feature for action sports enthusiasts of all ages. These continuous loop circuits of rollers and berms can be ridden without pedaling—using body pumping motions to generate speed through physics and flow.

Valley Design Build creates world-class pump tracks for private properties, from compact residential loops to competition-grade facilities. Our tracks work for bikes, skateboards, scooters, and even rollerblades. They're the perfect family investment for active outdoor play.`,
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
        question: 'Asphalt or concrete—which is better?',
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
      'Outdoor kitchens, pavilions, theaters, and gathering spaces that elevate outdoor living.',
    longDescription: `The best memories are made outdoors. Valley Design Build creates entertainment structures that transform your property into the ultimate destination for family gatherings, parties, and everyday enjoyment. These aren't just structures—they're stages for life's best moments.

From fully-equipped outdoor kitchens with pizza ovens and smokers to covered pavilions with sound systems and outdoor theaters, we design and build spaces that bring people together. Every detail is considered, from lighting to seating to weatherproofing.`,
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
          'Almost anything—grills, smokers, pizza ovens, refrigerators, ice makers, kegerators, sinks, and more. We help you select the right equipment for your cooking style.',
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
      'Sculptural elements, artistic features, and architectural statements that define your landscape.',
    longDescription: `Some features become the defining element of a property—a signature piece that sets your landscape apart. Valley Design Build creates landmark features that serve as focal points, conversation starters, and expressions of personal style.

From dramatic sculptural elements and artistic water features to architectural follies and themed environments, we bring bold visions to life. These aren't catalog pieces—they're custom creations born from collaboration between our designers and your imagination.`,
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
      'Creative consultation and vision exploration',
      'Concept sketches and development',
      'Engineering and fabrication planning',
      'Material sourcing and procurement',
      'Site preparation',
      'Installation and construction',
      'Lighting and finishing',
      'Reveal and documentation',
    ],
    faqs: [
      {
        question: 'Can you bring my specific idea to life?',
        answer:
          'That\'s exactly what we do. Our process starts with your vision—whether it\'s a rough sketch, a photo inspiration, or just an idea in your head.',
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
      'Private ice rinks, winter sports features, and year-round outdoor enjoyment solutions.',
    longDescription: `Why should outdoor fun end when the snow flies? Valley Design Build creates winterscape features that embrace Utah's cold season, from private ice rinks for skating and hockey to snow-making systems and winter sports facilities.

Our residential ice rinks range from simple seasonal installations to elaborate refrigerated rinks with boards and lighting. We also design landscapes that shine in winter—features that look beautiful under snow and invite outdoor enjoyment when the temperature drops.`,
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
