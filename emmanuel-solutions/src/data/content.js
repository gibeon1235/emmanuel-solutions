// ─────────────────────────────────────────────────────────
// EMMANUEL SOLUTIONS — Content Data
// ─────────────────────────────────────────────────────────

// Hero stats (Option C — impact numbers)
export const heroStats = [
  { num: "30+",     label: "Years of Industry Experience" },
  { num: "₹92K Cr", label: "Post-Harvest Loss Problem Being Solved" },
  { num: "90%",     label: "Material Recovery in PU Foam Recycling" }
];

// ── SERVICES (summary cards on homepage) ─────────────────
export const services = [
  {
    id: "sustainable-tech",
    title: "Sustainable Technology Advisory",
    description: "Deploying practical climate-smart technologies that preserve food, improve value chains, and increase farmer resilience.",
    highlights: [
      "Solar cold chain systems",
      "Post-harvest loss reduction",
      "Food security solutions",
      "Renewable energy integration"
    ]
  },
  {
    id: "circular-economy",
    title: "Circular Economy Strategy",
    description: "Reducing waste and turning by-products into value through decentralised models that strengthen rural economies.",
    highlights: [
      "Chemical recycling solutions",
      "Waste valorisation",
      "Supply chain transformation",
      "Sustainable materials sourcing"
    ]
  },
  {
    id: "innovation-training",
    title: "Innovation Capability Building",
    description: "Facilitating behaviour-first innovation programs that increase creative confidence and risk-balanced execution.",
    highlights: [
      "Creatrix Innovation Model (Certified Consultant)",
      "Team workshops & assessments",
      "Creativity & risk-taking index uplift",
      "Behaviour-first methodology"
    ]
  },
  {
    id: "industrial-marketing",
    title: "Industrial Marketing & Strategy",
    description: "Applying outside-in, needs-based strategy to help industrial teams move from product push to high-margin market penetration.",
    highlights: [
      "Market positioning & segmentation",
      "Go-to-market strategy",
      "Sales enablement",
      "Industrial segment insights"
    ]
  }
];

// ── SERVICE DETAIL PAGES ──────────────────────────────────
export const serviceDetails = {
  "sustainable-tech": {
    title: "Sustainable Technology Advisory",
    tagline: "Deploying practical climate-smart technologies that preserve food, improve value chains, and increase farmer resilience.",
    overview: [
      "India faces some of the world's most acute challenges at the intersection of food security and environmental sustainability. Post-harvest losses alone cost the country an estimated ₹92,000 crore annually — roughly 30% of total agricultural output. That number represents not just economic loss, but farmer debt, hunger, and avoidable environmental waste.",
      "Emmanuel Solutions works at this precise intersection — identifying, evaluating, and scaling climate-smart technologies that address real pain points for farmers, agribusinesses, and communities. With 30+ years of experience deploying high-tech materials and solutions in demanding real-world contexts, Isaac Emmanuel Yenubari brings a rare combination of technical depth and commercial pragmatism to sustainability advisory."
    ],
    approach: {
      title: "Our Approach",
      steps: [
        { label: "Technology Identification", desc: "Systematic evaluation of emerging climate-smart technologies against real deployment constraints — cost, infrastructure availability, farmer capability, and market linkages." },
        { label: "Advisory & Scaling Support", desc: "Working alongside innovators and deployers to navigate the specific challenges of scaling in the Indian agricultural context: policy alignment, supply chain readiness, and community engagement." },
        { label: "Market Linkage Development", desc: "Connecting technology providers with the agribusinesses, NGOs, and government schemes needed to achieve commercial viability and impact at scale." },
        { label: "Impact Assessment", desc: "Establishing clear metrics for food security, farmer income, and environmental impact — and tracking them rigorously." }
      ]
    },
    focusAreas: [
      {
        title: "Solar Cold Chain Solutions",
        body: "Traditional refrigeration is inaccessible for most smallholder farmers. Solar-powered cold storage — like the systems developed by Ecozen Solutions — operates off-grid, requires minimal maintenance, and can be owned by farmer producer organisations. The economics work because the cost of spoilage avoided consistently exceeds the cost of the technology."
      },
      {
        title: "Solar Dehydration Technology",
        body: "For commodities like tomatoes, onions, ginger, chillies, bananas, and spices, solar dehydration extends shelf life, reduces transport weight, and creates significantly higher-value products. The patented Mone Solar Dome — co-developed through Emmanuel Solutions' advisory — demonstrates what next-generation solar dehydration can deliver: 2x+ efficiency over conventional dryers, spectral-selective UV protection, and modular design suited to Indian farming realities."
      },
      {
        title: "Renewable Energy Integration",
        body: "Agricultural operations across India remain heavily dependent on diesel and unreliable grid power. We advise on renewable energy integration strategies that reduce operational costs, lower carbon footprints, and improve the economics of technology deployment in rural and peri-urban contexts."
      },
      {
        title: "Food Value Chain Transformation",
        body: "End-to-end advisory from farm gate to market — identifying where value is lost, where technology can intervene, and how to structure commercial models that create sustainable incentives for all stakeholders in the chain."
      }
    ],
    projects: ["ecozen", "devrays"],
    audience: [
      "Agribusinesses seeking to improve supply chain sustainability",
      "Technology innovators looking to scale in the Indian market",
      "Government bodies and NGOs deploying food security solutions",
      "Investors evaluating climate-smart agricultural technologies"
    ]
  },

  "circular-economy": {
    title: "Circular Economy Strategy",
    tagline: "Reducing waste and turning by-products into value through decentralised models that strengthen rural economies.",
    overview: [
      "The world generates millions of tonnes of industrial waste annually that ends up in landfills or incinerators. Emmanuel Solutions believes this is a design failure, not an inevitability. With deep expertise in polymer chemistry and materials science — built across 30+ years at Bayer MaterialScience and Covestro — we help industrial organisations identify, develop, and scale circular economy solutions that turn waste streams into value streams.",
      "Our work spans plastic pollution cleanups, chemical recycling, and the development of non-linear economic models that allow resources to be used, recovered, and reused without degradation. We engage with exceptional technologies and connect them with the industrial partners, investors, and policy frameworks needed to create lasting impact."
    ],
    approach: {
      title: "Our Approach",
      steps: [
        { label: "Waste Stream Assessment", desc: "Characterising the volume, composition, and geography of waste streams to identify the most viable intervention points and technology solutions." },
        { label: "Circular Technology Matchmaking", desc: "Connecting waste generators with recycling innovators, upcyclers, and technology providers — and helping both sides navigate the commercial and technical requirements for successful partnerships." },
        { label: "Supply Chain Transformation", desc: "Redesigning procurement, operations, and logistics to integrate recycled or recovered materials without compromising product performance or commercial viability." },
        { label: "Policy & Ecosystem Development", desc: "Engaging with industry associations, regulators, and government bodies to create the enabling conditions — standards, incentives, and infrastructure — that circular models require." }
      ]
    },
    focusAreas: [
      {
        title: "Chemical Recycling of Polyurethane Foam",
        body: "Polyurethane foam — used in mattresses, footwear, automotive seating, and insulation — has historically been extremely difficult to recycle. Working with Thaal Innovations, Emmanuel Solutions supports the commercialisation of patented chemical recycling technology that achieves up to 90% material recovery, producing recycled polyol with near-virgin quality. Clients including Wakefit Mattress, Adient, VKC Pride Footwear, and Kingspan Jindal are already using this material in production."
      },
      {
        title: "Plastic Pollution & Post-Consumer Waste",
        body: "Beyond industrial waste, we work on collection and upcycling systems for post-consumer plastic waste — developing models that create economic incentives for collection at the grassroots level and connect recovered materials with industrial buyers who can use them productively."
      },
      {
        title: "Industrial By-product Valorisation",
        body: "Many industrial processes generate by-products that are currently treated as waste. We identify opportunities to reposition these materials as inputs to other processes — reducing disposal costs, creating new revenue streams, and building more resilient supply chains."
      },
      {
        title: "Sustainable Materials Sourcing",
        body: "Helping organisations transition from virgin to circular materials without compromising on performance. This includes evaluating the technical feasibility of recycled content, managing supplier relationships, and building the internal capability to specify and use sustainable materials consistently."
      }
    ],
    projects: ["thaal"],
    audience: [
      "Manufacturers generating industrial waste seeking circular solutions",
      "Materials companies exploring sustainable raw material alternatives",
      "Waste management organisations upgrading their value proposition",
      "Corporate sustainability teams reducing scope 3 emissions"
    ]
  },

  "innovation-training": {
    title: "Innovation Capability Building",
    tagline: "Facilitating behaviour-first innovation programs that increase creative confidence and risk-balanced execution.",
    overview: [
      "Most innovation programs fail — not because of a lack of ideas, but because of behavioural barriers. Fear of failure, unwillingness to challenge assumptions, and an inability to tolerate ambiguity kill more good ideas than bad strategy ever could.",
      "Emmanuel Solutions, as a Certified Consultant of the Creatrix Innovation Model, takes a fundamentally different approach: we start with behaviour. Before we talk about design thinking, agile methodologies, or ideation techniques, we assess the creative and risk-taking capacity of your team — and build the behavioural foundations that make innovation sustainable."
    ],
    approach: {
      title: "The Creatrix Process",
      steps: [
        { label: "Assessment", desc: "Each participant completes the validated Creatrix assessment, mapping their individual scores across eight creativity and risk-taking drivers. Results reveal where behavioural barriers to innovation currently exist." },
        { label: "Analysis & Debrief", desc: "Individual and team-level analysis identifies the specific patterns holding your team back — and the strengths that can be leveraged. Each participant receives a personalised debrief." },
        { label: "Targeted Training", desc: "Workshops designed around your team's specific profile — not a generic curriculum. We work on the exact dimensions where your team needs development, using the Creatrix methodology." },
        { label: "Embedding & Follow-through", desc: "Innovation capability degrades quickly without reinforcement. We provide follow-up coaching and tools to embed new behaviours into day-to-day work." }
      ]
    },
    focusAreas: [
      {
        title: "Creativity Drivers",
        body: "The Creatrix model identifies four creativity drivers: Ambiguity (comfort with undefined problems), Independence (ability to work outside convention), Inner-Directedness (motivation from internal values rather than external pressure), and Uniqueness (comfort with being different from the group). Low scores on any of these create predictable blocks to creative output."
      },
      {
        title: "Risk-Taking Drivers",
        body: "Innovation requires action, not just ideas — and action requires a tolerance for risk. The model assesses three risk-taking drivers: Authenticity (willingness to show your true thinking), Resilience (ability to recover from setbacks and criticism), and Self-Acceptance (comfort with your own capabilities and limitations). Teams with low risk-taking capacity generate ideas but fail to execute."
      },
      {
        title: "Team-Level Innovation Culture",
        body: "Beyond individual capability, we look at team dynamics — how individual profiles interact to either amplify or suppress innovation. Some teams have creative individuals who cancel each other out; others have a single risk-taker carrying the team. We help leaders understand and actively manage their team's innovation culture."
      },
      {
        title: "Application to Real Business Challenges",
        body: "The training is always grounded in your actual strategic priorities. Participants apply the frameworks to real innovation challenges your organisation faces — making the learning immediately relevant and the outputs immediately useful."
      }
    ],
    projects: [],
    audience: [
      "R&D and product development teams",
      "Leadership teams building an innovation culture",
      "Companies undergoing digital or sustainability transformation",
      "Organisations where innovation is a stated priority but a practical challenge"
    ],
    featuredEngagements: [
      {
        title: "Somaiya Vidyavihar University, Mumbai",
        date: "March 2026",
        location: "Vinay Mandir, Vidyavihar, Mumbai",
        description: "Led a full-day Creatrix Innovation Training workshop for 50+ Gen Z students from Dr Shantilal K Somaiya School of Commerce & Business Studies and Somaiya School of Basic and Applied Sciences. Facilitated by Dr Daly Davis and the Innovation Incubation and Entrepreneurship Cell.",
        highlight: "Equipping future leaders with life-shaping skills and providing tools for resilience and success — through innovation capacity building.",
        quote: "The Creatrix way is tailored for every organisation which is looking to systematically and scientifically transform its people into high-powered and top-delivery teams.",
        images: [
          "/assets/innovation-training-presenting.jpg",
          "/assets/innovation-training-students.jpg",
          "/assets/innovation-training-workshop.jpg"
        ]
      }
    ]
  },

  "industrial-marketing": {
    title: "Industrial Marketing & Strategy",
    tagline: "Applying outside-in, needs-based strategy to help industrial teams move from product push to high-margin market penetration.",
    overview: [
      "Industrial companies often have exceptional products but struggle to find the right markets, articulate their value clearly, or build a scalable sales approach. The default — hiring more salespeople and pushing harder — rarely solves the underlying strategic problem.",
      "After 30+ years of applying exactly these disciplines at Bayer MaterialScience and Covestro — organisations that sell technically complex, high-value materials into demanding industrial markets across multiple continents — Isaac Emmanuel Yenubari brings a proven outside-in methodology to mid-size industrial clients who need to punch above their weight."
    ],
    approach: {
      title: "The Outside-In Methodology",
      steps: [
        { label: "Market Intelligence", desc: "Understanding the landscape from the customer's perspective — their problems, their purchasing process, their criteria for supplier selection, and where they are dissatisfied with current solutions." },
        { label: "Segment Prioritisation", desc: "Identifying the specific segments where you have the highest probability of winning: where your capabilities are genuinely differentiated, where the customer's problem is acute, and where the economics are attractive." },
        { label: "Value Proposition Development", desc: "Articulating your unique value in terms that resonate with industrial buyers — not features and specifications, but outcomes and economics. This is harder than it sounds and most industrial companies do it poorly." },
        { label: "Go-to-Market Execution", desc: "Systematic approach to penetrating target segments — from channel selection and pricing strategy to sales team enablement and customer success." }
      ]
    },
    focusAreas: [
      {
        title: "Market Segmentation & Targeting",
        body: "Not all customers are worth pursuing equally. Scientific segmentation identifies the clusters of customers where you can win consistently, command a premium, and build durable relationships. This focus is the single most impactful thing most industrial companies can do to improve commercial performance."
      },
      {
        title: "Value Proposition Development",
        body: "Most industrial companies lead with product specifications. Sophisticated industrial buyers purchase outcomes — cost reduction, quality improvement, risk mitigation, regulatory compliance. We help you reframe your offering in the language your best customers actually use when they decide to buy."
      },
      {
        title: "Sales Enablement",
        body: "Technical teams often struggle to sell — not because they lack knowledge, but because they are trained to explain rather than persuade. We equip your commercial teams with the frameworks, tools, and practice they need to have value conversations rather than specification conversations."
      },
      {
        title: "Competitive Positioning",
        body: "Understanding your competitive landscape deeply — not just who your competitors are, but how they compete, where they are vulnerable, and how to position against them without triggering destructive price competition. Built on 30+ years of competitive intelligence in the global polymer and materials industry."
      }
    ],
    projects: [],
    audience: [
      "Industrial manufacturers entering new market segments",
      "Specialty chemicals companies commercialising new products",
      "SMBs competing against large multinationals",
      "Companies with strong technical capability but weak commercial results"
    ]
  }
};

// ── CASE STUDIES ──────────────────────────────────────────
export const caseStudies = [
  {
    id: "ecozen",
    title: "Ecozen Solutions",
    service: "sustainable-tech",
    website: "www.ecozensolutions.com",
    problem: "India loses crores annually to post-harvest spoilage. Traditional refrigeration is grid-dependent, expensive, and inaccessible for rural smallholder farmers — leaving perishables to spoil between farm and market.",
    solution: "Ecofrost — the world's leading solar cold room solution. A smart AI & IoT-enabled solar cold room with patented Thermal Energy Storage technology (IceCore) that provides up to 30 hours of batteryless backup, dramatically reducing food waste and increasing farmer incomes.",
    approach: "Advisory leadership supporting the scaling of Ecozen's climate-smart deeptech solutions across rural India and 20+ countries. Emmanuel Solutions advises on market positioning, agribusiness partnerships, and go-to-market strategy for both Ecofrost (solar cold rooms) and Ecotron (solar pumping).",
    features: [
      "Solar powered with hybrid option — truly off-grid for rural deployment",
      "Patented IceCore thermal storage: up to 30 hours of batteryless backup",
      "Humidity control: 65%–95% for optimal produce preservation",
      "Capacity range: 2MT to 30MT — portable and modular",
      "AI & IoT enabled with real-time remote monitoring via ecozen.ai platform",
      "Global presence: India, Kenya, Nigeria, Uganda, Bangladesh and 15+ more countries"
    ],
    outcomes: [
      "59,000+ farmers helped to reduce waste, increase shelf life and reach farther markets",
      "Significant reduction in post-harvest food loss at scale",
      "Increased shelf life of perishables, enabling export-quality produce",
      "Higher and more stable farmer incomes through better market access",
      "Women-led rural employment creation through accessible cold storage infrastructure"
    ],
    metrics: "1,100+ Ecofrost units deployed across 20+ countries · 59,000+ farmers impacted · 245,000+ solar pumps (Ecotron) in operation"
  },
  {
    id: "devrays",
    title: "Devrays Solar Dehydrators",
    service: "sustainable-tech",
    website: "www.devrays.com",
    problem: "India loses over ₹92,000 crore annually due to post-harvest spoilage. Rural farmers lack accessible, affordable dehydration solutions.",
    solution: "Patented Mone Solar Dome: a portable, rugged solar dehydrator designed for Indian farming realities.",
    approach: "Co-founded with Nilesh Mone and Ashok More. First installation completed at Malegaon, Maharashtra's vegetable belt.",
    features: [
      "Spectral-selective dome blocks 99.98% UV for safer dehydration",
      "Modular tray design with negative-pressure airflow",
      "2x+ efficiency versus conventional solar dryers",
      "Validated for bananas, tomatoes, onions, ginger, and spices"
    ],
    outcomes: [
      "Reduced post-harvest waste for smallholder farmers",
      "Increased farmer incomes through longer shelf life",
      "Strengthened export readiness for agri produce",
      "Women-led rural employment creation"
    ],
    metrics: "First installation live — Malegaon, Maharashtra (February 2026)"
  },
  {
    id: "thaal",
    title: "Thaal Innovations",
    service: "circular-economy",
    website: "thaalinnovations.com",
    problem: "Polyurethane foam waste accumulates at industrial scale, creating environmental burden. Traditional disposal methods are non-circular.",
    solution: "Chemical recycling of PU foam with up to 90% material recovery. Commercialised recycled polyol demonstrates near-virgin quality performance.",
    approach: "Founded by Dr. Devi Ramamoorthy (CEO, IIT Madras doctorate) and Prem Anandh S (COO). Trusted industrial adoption at scale.",
    clients: ["Wakefit Mattress", "VKC Pride Footwear", "Adient", "Kingspan Jindal"],
    outcomes: [
      "Low-carbon raw material production at 70% less CO₂",
      "90% material recovery rate — near-infinite recycling",
      "Industrial-grade circular supply chain established",
      "Patented technology with proven commercial validation"
    ],
    metrics: "Active paying customers: Wakefit, Adient, Kingspan Jindal",
    profileUrl: "/docs/thaal-innovations-profile.pdf"
  }
];

// ── TEAM ──────────────────────────────────────────────────
export const team = [
  {
    id: "isaac-emmanuel",
    name: "Isaac Emmanuel Yenubari",
    role: "Founder & Principal Consultant",
    bio: "Isaac Emmanuel Yenubari brings over 30 years of polymer industry leadership spanning sales, market development, sustainability advocacy, and high-tech materials innovation — almost entirely with multinational companies that invented leading materials, including Bayer MaterialScience and Covestro.",
    credentials: [
      "Executive Committee Member — Indian Polyurethane Association (IPUA)",
      "Technical & Sustainability Committees — IPUA",
      "Visionary-Interlocutor — India Insulation Forum",
      "Visionary-Interlocutor — Spray Foam Alliance of India",
      "Editor — PU Today, the magazine of IPUA",
      "Last role: Inclusive Business, Covestro India"
    ],
    experience: [
      "Polymer & high-tech materials innovation",
      "Multinational sales & market development",
      "Sustainability transformation",
      "Affordable housing innovation",
      "Food security solutions",
      "Agro-waste value applications"
    ],
    photo: "/assets/isaac-headshot.jpg",
    education: "M.Sc. Polymer Chemistry"
  }
];

// ── INSIGHTS (summary cards) ──────────────────────────────
export const insights = [
  {
    id: "post-harvest-loss",
    title: "India's Post-Harvest Challenge: Technology as the Bridge",
    category: "Sustainability",
    date: "2026-02-15",
    excerpt: "With ₹92,000 crore lost annually to spoilage, the path forward combines solar dehydration, cold chain innovation, and farmer empowerment.",
    readTime: "5 min"
  },
  {
    id: "circular-polyurethane",
    title: "Chemical Recycling: Closing the Loop on Industrial Foam Waste",
    category: "Circular Economy",
    date: "2026-01-28",
    excerpt: "How chemical recycling of polyurethane is enabling industrial-grade circular supply chains without compromising material performance.",
    readTime: "6 min"
  },
  {
    id: "innovation-behavior",
    title: "The Behavioural Foundations of Innovation: Beyond Creativity Workshops",
    category: "Innovation",
    date: "2025-12-10",
    excerpt: "True innovation capability comes from mapping creativity and risk-taking drivers. Here's the Creatrix framework in action.",
    readTime: "7 min"
  }
];

// ── INSIGHT DETAIL PAGES ──────────────────────────────────
export const insightDetails = {
  "post-harvest-loss": {
    title: "India's Post-Harvest Challenge: Technology as the Bridge",
    category: "Sustainability",
    date: "2026-02-15",
    readTime: "5 min",
    author: "Isaac Emmanuel Yenubari",
    intro: "India is the world's second-largest producer of fruits and vegetables, yet it loses an estimated ₹92,000 crore worth of produce annually to post-harvest spoilage. That number represents not just economic loss, but farmer debt, hunger, and avoidable environmental waste. The problem is not new. What is new is the technology available to address it.",
    sections: [
      {
        heading: "The Cold Chain Gap",
        body: "India has roughly 8,000 cold storage facilities, but they are concentrated in a small number of states, focused primarily on potatoes and onions, and inaccessible to the majority of smallholder farmers who produce most of the country's fruits and vegetables. Building conventional cold chain infrastructure is capital-intensive and requires reliable grid power — two constraints that make rural deployment extremely difficult.\n\nThe result is a system that protects a narrow band of commodities in well-connected locations, while leaving the majority of perishable produce vulnerable to spoilage between farm and market."
      },
      {
        heading: "Solar Cold Storage: A New Paradigm",
        body: "Companies like Ecozen Solutions have demonstrated that solar-powered cold storage can be financially viable, reliable, and deployable in remote areas. Their units operate off-grid, require minimal maintenance, and can be owned by farmer producer organisations or deployed by agribusinesses as a service.\n\nThe model works economically because the cost of spoilage avoided consistently exceeds the cost of the technology. A smallholder farmer who can sell produce over two weeks rather than two days captures fundamentally different price dynamics — and the income difference can be transformative."
      },
      {
        heading: "Solar Dehydration: Preservation Without Refrigeration",
        body: "Not all post-harvest preservation requires cold. For commodities like tomatoes, onions, ginger, chillies, bananas, and spices, solar dehydration dramatically extends shelf life, reduces weight for transport, and creates a product with significantly higher value. Dried spices command multiples of the fresh price; dehydrated vegetables can enter export markets that fresh produce cannot.\n\nThe Devrays Mone Solar Dome — developed in Malegaon, Maharashtra's vegetable belt — demonstrates what next-generation solar dehydration can deliver: a patented spectral-selective dome that blocks 99.98% of UV radiation, modular stainless steel tray configuration, and passive negative-pressure airflow that achieves over twice the efficiency of conventional solar dryers. The first installation was inaugurated in February 2026."
      },
      {
        heading: "The Role of Women in Rural Food Processing",
        body: "One of the most significant and underappreciated aspects of post-harvest technology deployment is the opportunity it creates for women's economic participation. Food processing — cleaning, sorting, slicing, drying, packaging — is work that can be performed close to home, fits around agricultural and domestic schedules, and creates income that flows directly to women and their households.\n\nThe Devrays installation at Malegaon specifically designed its community engagement model around women's self-help groups. Early results suggest that women-led solar dehydration units create more durable economic participation than male-dominated deployment models."
      },
      {
        heading: "The Path Forward",
        body: "The solutions exist. The economics work. What remains is the hard work of scaling — connecting farmers to technology, building local technical capacity, aligning with government schemes like PM-KUSUM and the PLI for food processing, and developing the market linkages that make preservation commercially worthwhile.\n\nThis is not a technology problem. It is a deployment and ecosystem problem. Solving it requires people who understand both the technical and commercial dimensions — and are willing to work in the field, not just the boardroom. It is the work Emmanuel Solutions is actively engaged in."
      }
    ]
  },

  "circular-polyurethane": {
    title: "Chemical Recycling: Closing the Loop on Industrial Foam Waste",
    category: "Circular Economy",
    date: "2026-01-28",
    readTime: "6 min",
    author: "Isaac Emmanuel Yenubari",
    intro: "Polyurethane foam is everywhere. It is in the mattress you sleep on, the seat of your car, the soles of your shoes, and the insulation in your walls. It is one of the most versatile and widely used materials in modern manufacturing. It is also, historically, one of the most difficult to recycle — and one of the least recycled.",
    sections: [
      {
        heading: "Why PU Foam Has Been So Hard to Recycle",
        body: "Polyurethane is a thermoset polymer — unlike thermoplastics such as PET bottles, it cannot simply be melted and remoulded. The chemical bonds that give PU foam its unique combination of cushioning, durability, and thermal resistance also make it resistant to conventional mechanical recycling.\n\nThe result is that the vast majority of post-consumer and post-industrial PU foam ends up in landfill or incineration — at best, shredded into 'rebond' foam for carpet underlay, which is a low-value application with limited market absorption. The circular economy aspirations of major manufacturers have collided repeatedly with the chemical reality of the material."
      },
      {
        heading: "Chemical Recycling: Breaking the Chain",
        body: "Chemical recycling takes a fundamentally different approach. Rather than trying to recover the polymer physically, it breaks the chemical bonds that formed during the original reaction — recovering the polyol component, which is the most valuable raw material in PU foam production.\n\nThaal Innovations, a Chennai-based company supported by Emmanuel Solutions, has developed and patented a chemical recycling process that achieves up to 90% polyol recovery from post-industrial PU foam waste. The recovered polyol is not a degraded by-product — it is a performance-grade material that, when blended at 10-20% with virgin polyol, produces foam with density and hardness characteristics essentially identical to 100% virgin material."
      },
      {
        heading: "Commercial Validation: Beyond the Laboratory",
        body: "The critical test for any recycling technology is not whether it works in a laboratory — it is whether it works commercially. Thaal has passed that test. Their recycled polyol is already in production use at Wakefit Mattress, VKC Pride Footwear, Adient (automotive seating), and Kingspan Jindal (insulation panels) — companies with stringent quality requirements and zero tolerance for material performance variability.\n\nThe foam rise comparison curves — a standard industry test for consistency of chemical reaction — show that recycled polyol blends maintain the same reaction profile as virgin material. This is the data point that convinces industrial quality managers. It is also the data point that took years of process development to achieve."
      },
      {
        heading: "The Carbon Case",
        body: "Chemical recycling of PU foam produces raw material with approximately 70% lower carbon emissions than virgin polyol production. For manufacturers with scope 3 emissions targets — and increasingly, all large manufacturers face such targets — this represents a genuinely useful lever that does not require compromising on material performance.\n\nThe circular logic is also compelling: if foam that would otherwise become landfill waste can be recovered and re-enter the supply chain as a performance-grade raw material, the system has effectively replaced a virgin material that would have required energy-intensive production from petroleum feedstocks."
      },
      {
        heading: "What Needs to Happen Next",
        body: "The technology exists and is commercially validated. The constraint now is collection infrastructure and scale. Chemical recycling requires consistent, sorted feedstock — and the collection of post-consumer PU foam at sufficient scale and purity is a logistics and incentive design problem, not a chemistry problem.\n\nBuilding the reverse supply chain — from consumer to collector to processor to manufacturer — requires coordination across stakeholders who do not currently have strong incentives to work together. This is where policy, industry association leadership, and patient capital all have essential roles to play. Emmanuel Solutions is actively engaged in building these ecosystems through its industry association relationships and advisory work."
      }
    ]
  },

  "innovation-behavior": {
    title: "The Behavioural Foundations of Innovation: Beyond Creativity Workshops",
    category: "Innovation",
    date: "2025-12-10",
    readTime: "7 min",
    author: "Isaac Emmanuel Yenubari",
    intro: "Every organisation says it values innovation. Most run workshops, set up idea contests, or hire 'design thinking' consultants. Most are disappointed with the results. The problem is not the process. The problem is that sustainable innovation requires specific behavioural capacities — and most organisations have never assessed, understood, or deliberately developed those capacities in their people.",
    sections: [
      {
        heading: "Why Innovation Programs Fail",
        body: "The standard innovation program typically works as follows: bring a group of people into a room, teach them a framework (design thinking, jobs-to-be-done, lean startup), run them through an ideation exercise, generate a large number of post-it notes, prioritise the best ideas, assign owners, and wait for transformation.\n\nThe transformation rarely comes. The ideas generated are often incremental or impractical. The owners assigned return to their day jobs. The post-it notes are photographed and filed. Six months later, the same program is run with a different consultant.\n\nThe problem is not the framework. The problem is that the people in the room have not been assessed for the behavioural capacities that innovation requires — and in many cases, they lack those capacities. No framework can substitute for the underlying behaviour."
      },
      {
        heading: "The Creatrix Model: Measuring What Matters",
        body: "The Creatrix Innovation Model, developed over decades of research, identifies and measures eight specific behavioural dimensions that determine an individual's capacity for creative output and risk-taking action. These are not personality traits that are fixed at birth — they are behavioural tendencies that can be assessed, understood, and deliberately developed.\n\nFour dimensions relate to creativity: Ambiguity (comfort with undefined problems and uncertain outcomes), Independence (ability to work outside convention and resist conformity pressure), Inner-Directedness (motivation driven by internal values rather than external approval), and Uniqueness (comfort with being different, doing things differently, and generating unconventional solutions).\n\nFour dimensions relate to risk-taking: Authenticity (willingness to express genuine thinking rather than calculated positions), Resilience (ability to absorb criticism and setbacks without losing momentum), and Self-Acceptance (comfort with one's own capabilities and limitations — neither overconfidence nor paralysing self-doubt)."
      },
      {
        heading: "What the Assessment Reveals",
        body: "When an organisation goes through the Creatrix assessment process, the results are frequently surprising — and illuminating. Individual contributors who are dismissed as 'not creative' often score very highly on Inner-Directedness and Uniqueness, but very low on Authenticity — they have creative ideas but do not believe it is safe to express them. Senior leaders who see themselves as bold innovators often score very high on Independence but very low on Ambiguity — they are comfortable doing things differently, but only when the problem is clearly defined.\n\nTeam-level patterns are equally revealing. A team where most members score low on Resilience will generate ideas actively but fail to persist when the first objections arise. A team with high creativity scores but low risk-taking scores will produce excellent analysis and strong concepts but be unable to commit to action."
      },
      {
        heading: "From Assessment to Action",
        body: "The value of the Creatrix assessment is not in the data itself — it is in what the data enables. With a clear picture of where behavioural gaps exist at individual and team levels, it becomes possible to design training interventions that address the actual constraint rather than the assumed one.\n\nA team that scores low on Ambiguity needs to practice working with undefined problems — not to be taught a framework for structuring problems better, but to build comfort with the discomfort of not knowing. A team that scores low on Authenticity needs psychological safety and structured practice in expressing genuine thinking — not a new ideation technique.\n\nAs a Certified Consultant of the Creatrix Innovation Model, Isaac Emmanuel Yenubari works with leadership teams to interpret assessment results, design targeted interventions, and build the sustained practice that moves behavioural scores in meaningful directions."
      },
      {
        heading: "The Long Game",
        body: "Behavioural change is not fast. A two-day workshop will not move an Ambiguity score significantly. What moves scores is sustained, deliberate practice — regularly working on problems that require the targeted capability, with feedback, coaching, and enough psychological safety to experiment and fail.\n\nThe organisations that build genuine innovation cultures — that produce consistent streams of meaningful new ideas and have the commercial confidence to act on them — are the ones that commit to this long game. They treat innovation capability the way elite sports organisations treat athletic capability: as something that is developed systematically over time, measured rigorously, and coached with expertise.\n\nIt is a different kind of investment from the two-day workshop. But it produces a different kind of result."
      }
    ]
  }
};

// ── GALLERY ───────────────────────────────────────────────
// Place renamed WhatsApp images in /public/assets/
export const galleryImages = [
  {
    src: "/assets/devrays-inauguration-team.jpeg",
    alt: "Inauguration ceremony at first Devrays solar dehydrator installation",
    caption: "Inauguration of the first Devrays Mone Solar Dome — Malegaon, Maharashtra (Feb 2026)"
  },
  {
    src: "/assets/devrays-community.jpeg",
    alt: "Community participation at Devrays solar dehydrator facility",
    caption: "Local community and women entrepreneurs at the Devrays facility"
  },
  {
    src: "/assets/devrays-exterior.jpeg",
    alt: "Exterior view of Devrays Mone Solar Dome",
    caption: "The Mone Solar Dome — polycarbonate structure with rooftop turbine ventilation"
  },
  {
    src: "/assets/devrays-interior.jpeg",
    alt: "Interior stainless steel tray configuration inside solar dehydrator",
    caption: "Interior stainless steel trays — modular design for high-volume dehydration"
  }
];

// ── CASE STUDY DETAIL PAGES ───────────────────────────────
export const caseStudyDetails = {
  "ecozen": {
    title:       "Ecozen Solutions — Ecofrost",
    brandName:   "ecozen",
    productName: "ecofrost",
    tagline:     "The World's Leading Solar Cold Room Solution",
    service:     "sustainable-tech",
    heroStats: [
      { val: "59,000+",  label: "Farmers Impacted" },
      { val: "30 Hrs",   label: "Batteryless Backup" },
      { val: "20+",      label: "Countries Deployed" },
      { val: "100/mo",   label: "Production Capacity" }
    ],
    challenge: {
      heading: "Post-Harvest Loss at Scale",
      body: [
        "India loses an estimated ₹92,000 crore worth of produce every year due to inadequate cold-chain infrastructure. Smallholder farmers, Farmer Producer Organisations, and perishable aggregators have no access to affordable, reliable on-farm cooling — forcing distress sales and limiting market reach.",
        "Grid-dependent cold rooms are impractical in rural areas with unreliable power, high operational costs, and zero portability. The result: food waste, income loss, and a broken supply chain from farm to consumer."
      ]
    },
    segments: [
      { icon: "🌾", title: "Farmers", desc: "Smallholder and commercial growers needing on-farm pre-cooling" },
      { icon: "🤝", title: "Farmer Producer Organisations", desc: "FPOs managing perishable aggregation across multiple farms" },
      { icon: "📦", title: "Perishable Aggregators", desc: "Middlemen and logistics players handling fresh produce" },
      { icon: "🏭", title: "Warehousing Companies", desc: "Cold-chain operators expanding rural storage capacity" }
    ],
    product: {
      heading: "Smart. Solar. Self-Sufficient.",
      body: [
        "Ecofrost is an AI & IoT-enabled solar cold room with patented Thermal Energy Storage (IceCore) technology. It provides up to 30 hours of batteryless backup — ensuring uninterrupted cooling even during zero-sunshine periods.",
        "The system operates on solar, grid, or generator — automatically switching to the available power source. A variable frequency compressor enables operation even in low sunshine hours, while R407F refrigerant ensures the lowest GWP with zero ODP. Temperature and humidity levels are auto-selected based on the produce stored."
      ],
      pillars: [
        { icon: "☀️", title: "Solar Powered", sub: "Hybrid grid/generator fallback" },
        { icon: "💧", title: "Humidity Control", sub: "65% – 95% range" },
        { icon: "🔋", title: "30-Hr Backup", sub: "Batteryless via IceCore" },
        { icon: "🚛", title: "Truly Portable", sub: "Modular, deployable anywhere" }
      ]
    },
    technology: {
      heading: "Four Pillars of Engineering Excellence",
      pillars: [
        {
          title: "AI Platform",
          desc: "Real-time tracking of 120+ parameters, remote portfolio management (monitoring, control & diagnostics), and seamless data integration through ecozen.ai — a proprietary analytics and management platform."
        },
        {
          title: "Energy Management System",
          desc: "Operates on solar, grid, or generator and automatically switches to the available power source. A variable frequency compressor works in low sunshine hours with batteryless operation."
        },
        {
          title: "Thermal Storage & Virtual Cooling",
          desc: "Patented IceCore thermal energy storage provides up to 30 hours of batteryless backup. Optimised cooling fan arrangement ensures better air circulation and more consistent temperature control."
        },
        {
          title: "Refrigeration System",
          desc: "R407F refrigerant — the lowest GWP with zero ODP. The system can both pre-cool and store produce. Temperature and humidity levels are automatically selected by the unit based on the produce stored."
        }
      ]
    },
    businessModels: [
      {
        icon: "🤲",
        title: "Lease",
        desc: "Farmers and FPOs lease Ecofrost units, spreading capital cost over time. Low upfront investment makes deployment accessible to smallholder farmers and cooperatives."
      },
      {
        icon: "❄️",
        title: "CaaS — Cooling as a Service",
        desc: "Pay-per-use cooling model. Customers pay for the cold storage they consume, with no ownership of the unit. Removes all capital expenditure and maintenance burden."
      }
    ],
    impact: {
      headline: "59,000+",
      subline: "Farmers helped to reduce waste, increase shelf life, reach farther markets and earn more",
      outcomes: [
        "Significant reduction in post-harvest food loss at scale",
        "Increased shelf life of perishables, enabling export-quality produce",
        "Higher and more stable farmer incomes through better market access",
        "Women-led rural employment creation through accessible cold storage infrastructure"
      ]
    },
    scale: [
      { val: "25,000 sqft", label: "State-of-the-Art Manufacturing Facility" },
      { val: "100/month",   label: "Production Capacity" },
      { val: "1,050+",      label: "Units Deployed in India" },
      { val: "20+",         label: "Countries with Active Deployments" }
    ],
    globalCustomers: [
      "SokoFresh",
      "Odisha Consumers Co-op Federation",
      "SELCO Foundation",
      "Akshayakalpa Organic",
      "Balaji Solar Systems",
      "Environmental Management Consultants"
    ]
  }
};

// ── HERO COPY (single source of truth for the hero) ──────
export const heroCopy = {
  eyebrow:  "Four practice areas. One AI division.",
  location: "Navi Mumbai, India",
  line1:    "From industrial excellence",
  line2:    "to intelligent systems.",
  lead:     "Thirty years of industrial judgement at Bayer MaterialScience and Covestro \u2014 across sustainable technology, circular economy, innovation capability and industrial marketing, now with a dedicated division for enterprise AI.",
  primaryCta:   { label: "Explore our services", href: "#services" },
  divisionCta:  { label: "AI Solutions", badge: "Division", note: "Enterprise AI consulting & intelligent systems", to: "/aisolutions" },
  credentials: "30+ years Bayer MaterialScience & Covestro \u00b7 Founding contributor, Spray Foam Alliance of India \u00b7 IPUA \u00b7 Creatrix Certified Consultant"
};

// ── PRACTICE AREAS (hero rail; colour follows the score) ──
export const practiceAreas = [
  { id: "sustainable-tech",     focus: "c1", tone: "#3E8E8A", name: "Sustainable Technology", note: "Solar cold chain, post-harvest loss, renewables" },
  { id: "circular-economy",     focus: "c2", tone: "#2C6048", name: "Circular Economy",       note: "Chemical recycling, waste valorisation" },
  { id: "innovation-training",  focus: "c3", tone: "#B98A4B", name: "Innovation Capability",  note: "Creatrix model, behaviour-first programmes" },
  { id: "industrial-marketing", focus: "c4", tone: "#6E7F8C", name: "Industrial Marketing",   note: "Outside-in strategy, go-to-market" }
];

// ── CREDIBILITY (Act 2) ──────────────────────────────────
// Every figure carries its owner. Nothing here is Emmanuel
// Solutions' own performance data, and nothing pretends to be.
export const credibilityStats = [
  { value: "30+",        label: "Years in the polymer industry",                     owner: "Isaac Emmanuel Yenubari" },
  { value: "2016",       label: "Founding contribution to the Spray Foam Alliance",  owner: "An initiative of the IPUA" },
  { value: "IS 12432",   label: "Indian Standard governing spray-applied insulation", owner: "Bureau of Indian Standards" },
  { value: "\u20b992,000 Cr", label: "Annual post-harvest loss addressed",            owner: "India \u2014 scale of the challenge" }
];

// ── DEVRAYS & THAAL detail pages ──────────────────────────
// Written only from material already on the site. Every figure
// belongs to the partner organisation and is labelled as theirs.
caseStudyDetails["devrays"] = {
  title:       "Devrays Solar Dehydrators",
  brandName:   "devrays",
  productName: "mone solar dome",
  tagline:     "Patented solar dehydration, built for Indian farming realities",
  service:     "sustainable-tech",
  heroStats: [
    { val: "2\u00d7+",     label: "Efficiency vs conventional dryers" },
    { val: "99.98%",    label: "UV blocked by the dome" },
    { val: "Feb 2026",  label: "First installation" },
    { val: "Patented",  label: "Mone Solar Dome" }
  ],
  challenge: {
    heading: "Produce spoils before it reaches a market",
    body: [
      "India loses an estimated \u20b992,000 crore of produce every year to post-harvest spoilage \u2014 a national figure, and the scale of the problem this technology addresses. For smallholder farmers the loss is immediate: harvest arrives all at once, prices collapse, and whatever cannot be sold within days is wasted.",
      "Dehydration solves this by extending shelf life, reducing transport weight and creating a higher-value product. But conventional dryers are inefficient, fragile, and rarely designed for the conditions of an Indian farm."
    ]
  },
  segments: [
    { icon: "\ud83c\udf3e", title: "Smallholder farmers", desc: "Growers seeking to preserve harvest surplus rather than sell at distress prices" },
    { icon: "\ud83e\udd1d", title: "Farmer Producer Organisations", desc: "FPOs aggregating produce across multiple farms" },
    { icon: "\ud83c\udf36\ufe0f", title: "Spice and horticulture processors", desc: "Operations handling bananas, tomatoes, onions, ginger and spices" },
    { icon: "\ud83c\udf0d", title: "Export-oriented producers", desc: "Producers who need consistent, food-safe dried output" }
  ],
  product: {
    heading: "A dome designed around the crop, not the catalogue",
    body: [
      "The Mone Solar Dome is a portable, rugged solar dehydrator built for deployment on working farms. Its spectral-selective dome admits the wavelengths that dry produce while blocking 99.98% of UV, protecting colour, nutrition and food safety during dehydration.",
      "A modular tray design with negative-pressure airflow moves moisture out consistently rather than unevenly, which is what allows the unit to reach more than twice the efficiency of conventional solar dryers."
    ],
    pillars: [
      { icon: "\u2600\ufe0f", title: "Spectral-selective dome", sub: "99.98% UV blocked" },
      { icon: "\ud83c\udf2c\ufe0f", title: "Negative-pressure airflow", sub: "Even moisture removal" },
      { icon: "\ud83e\uddf1", title: "Modular trays", sub: "Scales with volume" },
      { icon: "\ud83d\ude9a", title: "Portable and rugged", sub: "Built for farm conditions" }
    ]
  },
  technology: {
    heading: "Validated across the crops that matter",
    pillars: [
      { title: "Spectral selectivity", desc: "The dome material admits drying wavelengths while blocking 99.98% of ultraviolet light, preserving colour and nutritional value that open-air and conventional dryers degrade." },
      { title: "Airflow design", desc: "Negative-pressure airflow through a modular tray stack removes moisture evenly across every level, avoiding the partial drying and spoilage common to simple box dryers." },
      { title: "Crop validation", desc: "Performance has been validated for bananas, tomatoes, onions, ginger and spices \u2014 the commodities where post-harvest loss and price volatility are most acute." },
      { title: "Deployment reality", desc: "Designed to be transported, assembled and maintained on a working farm rather than in an industrial facility, which is the constraint most dehydration technology ignores." }
    ]
  },
  impact: {
    headline: "2\u00d7+",
    subline: "Efficiency over conventional solar dryers, with the first unit now operating in Maharashtra's vegetable belt",
    outcomes: [
      "Reduced post-harvest waste for smallholder farmers",
      "Higher incomes through extended shelf life and better timing of sale",
      "Strengthened export readiness for agricultural produce",
      "Women-led rural employment creation"
    ]
  },
  scale: [
    { val: "Malegaon",  label: "First installation, Maharashtra" },
    { val: "Feb 2026",  label: "Commissioned" },
    { val: "Patented",  label: "Mone Solar Dome technology" },
    { val: "5+ crops",  label: "Validated commodities" }
  ],
  attribution: "Devrays Solar Dehydrators. Emmanuel Solutions contributed advisory support to the development and deployment of the Mone Solar Dome."
};

caseStudyDetails["thaal"] = {
  title:       "Thaal Innovations",
  brandName:   "thaal",
  productName: "chemical recycling",
  tagline:     "Closing the loop on industrial polyurethane foam waste",
  service:     "circular-economy",
  heroStats: [
    { val: "90%",       label: "Material recovery" },
    { val: "70%",       label: "Less CO\u2082 than virgin production" },
    { val: "4",         label: "Industrial clients in production" },
    { val: "Patented",  label: "Recycling technology" }
  ],
  challenge: {
    heading: "A material designed never to come apart",
    body: [
      "Polyurethane foam is everywhere \u2014 mattresses, footwear, automotive seating, insulation panels. It is also one of the hardest polymers to recycle, because the chemistry that makes it durable is the same chemistry that resists being reversed. Historically that meant landfill or incineration.",
      "Emmanuel Solutions treats this as a design failure rather than an inevitability. The question is not how to dispose of foam waste, but how to return it to the supply chain at a quality manufacturers will actually specify."
    ]
  },
  segments: [
    { icon: "\ud83c\udfed", title: "Foam manufacturers", desc: "Producers generating process waste at industrial volume" },
    { icon: "\ud83d\udecf\ufe0f", title: "Mattress and furniture", desc: "Brands under pressure to demonstrate circular sourcing" },
    { icon: "\ud83d\ude97", title: "Automotive seating", desc: "Tier suppliers with scope 3 emissions targets" },
    { icon: "\ud83c\udfd7\ufe0f", title: "Insulation panels", desc: "Construction materials businesses seeking recycled content" }
  ],
  product: {
    heading: "Recycled polyol at near-virgin quality",
    body: [
      "Thaal Innovations' patented chemical recycling process recovers up to 90% of the material from polyurethane foam waste, producing recycled polyol that performs at near-virgin quality \u2014 the threshold at which a manufacturer can actually use it in production rather than in a pilot.",
      "Emmanuel Solutions supports commercialisation: connecting the technology with industrial partners, navigating specification and procurement, and building the commercial case for circular material in demanding applications."
    ],
    pillars: [
      { icon: "\u267b\ufe0f", title: "90% recovery", sub: "Near-infinite recycling" },
      { icon: "\ud83c\udf31", title: "70% less CO\u2082", sub: "Versus virgin production" },
      { icon: "\ud83e\uddea", title: "Near-virgin quality", sub: "Production-grade, not pilot-grade" },
      { icon: "\ud83d\udcdc", title: "Patented process", sub: "Commercially validated" }
    ]
  },
  technology: {
    heading: "Founded on materials science, proven in production",
    pillars: [
      { title: "Leadership", desc: "Founded by Dr. Devi Ramamoorthy, CEO, who holds a doctorate from IIT Madras, with Prem Anandh S as COO." },
      { title: "Chemical recycling", desc: "A patented process that reverses polyurethane chemistry to recover polyol, rather than mechanically grinding foam into a lower-value filler." },
      { title: "Commercial validation", desc: "The recycled material is in production use with paying industrial customers \u2014 the distinction between a laboratory result and a supply chain." },
      { title: "Emissions case", desc: "Thaal reports low-carbon raw material production at 70% less CO\u2082 than virgin equivalents, which is what makes the material attractive to scope 3 reporting." }
    ]
  },
  impact: {
    headline: "90%",
    subline: "Material recovery from foam waste, with recycled polyol now used in production by four industrial clients",
    outcomes: [
      "Industrial-grade circular supply chain established for polyurethane",
      "Low-carbon raw material production at 70% less CO\u2082",
      "Patented technology with proven commercial validation",
      "A route for manufacturers to specify recycled content without compromising performance"
    ]
  },
  scale: [
    { val: "Wakefit",        label: "Mattress manufacturing" },
    { val: "Adient",         label: "Automotive seating" },
    { val: "VKC Pride",      label: "Footwear" },
    { val: "Kingspan Jindal", label: "Insulation panels" }
  ],
  globalCustomers: ["Wakefit Mattress", "Adient", "VKC Pride Footwear", "Kingspan Jindal"],
  attribution: "Thaal Innovations. All performance figures and client relationships belong to Thaal Innovations; Emmanuel Solutions supports commercialisation."
};

// ── AI SOLUTIONS capability set ───────────────────────────
export const aiCapabilities = [
  { group: "Strategy",   title: "AI strategy & roadmaps",        desc: "Where AI genuinely returns value in your operation, sequenced and costed \u2014 not a list of tools." },
  { group: "Strategy",   title: "Executive AI advisory",         desc: "Board and leadership guidance on capability, risk, vendor selection and what to ignore." },
  { group: "Strategy",   title: "AI transformation consulting",  desc: "Moving an organisation from isolated experiments to operating capability." },
  { group: "Automation", title: "Workflow automation",           desc: "Repetitive process work removed end to end, connecting the systems you already run." },
  { group: "Automation", title: "AI agents",                     desc: "Agents that carry out multi-step work under supervision, with clear boundaries and audit trails." },
  { group: "Automation", title: "Operations optimisation",       desc: "Scheduling, forecasting and exception handling improved where the cost of error is highest." },
  { group: "Systems",    title: "Custom AI systems",             desc: "Production-grade systems built for your data and your constraints, not a demo." },
  { group: "Systems",    title: "Internal knowledge assistants", desc: "Institutional knowledge made answerable \u2014 documents, specifications, standards and history." },
  { group: "Systems",    title: "AI integration",                desc: "Intelligence added to the ERP, CRM and line-of-business systems already in place." },
  { group: "Commercial", title: "Customer support automation",   desc: "Resolution rather than deflection, with escalation paths that respect the customer." },
  { group: "Commercial", title: "Sales & marketing automation",  desc: "Qualification, follow-up and content operations that free the team for actual selling." },
  { group: "Commercial", title: "Data intelligence",             desc: "Operational data turned into decisions leaders can act on, in plain language." }
];

// ── ALLIANCES & INDUSTRY LEADERSHIP ───────────────────────
// Per the source audit: these are industry bodies, not divisions
// of Emmanuel Solutions. SFAI is an initiative of the Indian
// Polyurethane Association. Isaac's role is stated exactly as
// the 2016 charter and programmes document it — nothing more.
export const alliances = {
  sfai: {
    abbr: "SFAI",
    name: "Spray Foam Alliance of India",
    parent: "An initiative of the Indian Polyurethane Association (IPUA)",
    tagline: "The voice of the polyurethane industry on spray foam in building, construction and the cold chain.",
    role: {
      label: "Isaac Emmanuel Yenubari's role",
      lines: [
        "Founding contributor, 2016 — named on the Content Proposal Team alongside Dr. Ashok Mhatre",
        "Marketing, promotion and seminars team",
        "Organiser and named contact for SFAI's first technical training programmes",
        "Executive Committee member, Indian Polyurethane Association"
      ],
      note: "Isaac contributed to SFAI in 2016 while at Covestro. SFAI is IPUA's spray foam arm and represents the major system houses collectively; it is not owned by or part of Emmanuel Solutions."
    },
    overview: [
      "SFAI was launched on 25 May 2016 in Pune as “An Initiative of the System Houses” — the moment a group of polyurethane industry stalwarts decided to act collectively rather than compete on safety and skills. It exists because the safe, correct application of spray polyurethane foam is too important to be left to a handful of enterprises.",
      "Spray polyurethane foam has one property that makes it unusually well suited to India: it achieves insulation and air sealing in a single application. In a country still proving the business case for insulation at all, that combination matters — and it is why SFAI's work sits at the intersection of energy efficiency, construction practice and the cold chain."
    ],
    mission: "To promote the safe use of Spray Polyurethane Foam in the building and construction industry and the cold chain industry, in collaboration with the stakeholders and the government energy conservation policy makers, and impart technical training thereto.",
    vision: "To ensure an energy secure India through Spray Polyurethane Foam Insulation.",
    charter: {
      objective: "To accelerate the implementation of thermal insulation in buildings and the cold chain industry through spray polyurethane foam promotion, training and product stewardship.",
      deliverables: [
        "Training for spray application — system houses equipped with curriculum and a technical training plan",
        "Building envelope — partnership with government bodies including BEE, and organisations such as TERI and IGBC",
        "Cold chain — partnership with relevant organisations including NHB and GCCA",
        "Technical workshops and promotional seminars with participation from all stakeholders"
      ]
    },
    focus: [
      { tone: "#3E8E8A", title: "Why insulation", body: "Buildings account for more than 40% of global energy use. Insulation is the cheapest intervention available, and the least specified in Indian construction." },
      { tone: "#3E8E8A", title: "Where insulation", body: "The relationship between insulation and architecture — building envelope, condensation risk, heat transfer coefficients, and the growing acknowledgement of insulation among practitioners." },
      { tone: "#2C6048", title: "How insulation", body: "Chemistry and application process, with particular attention to retrofitting spray foam into existing structures — where most of India's building stock actually is." },
      { tone: "#B98A4B", title: "Health and safety", body: "Correct handling, protective equipment and application discipline. The single strongest argument for a collective alliance rather than individual enterprise training." }
    ],
    programmes: [
      { title: "SPF Product Training Certification Programme", body: "A structured certification path for applicators, developed with the system houses and delivered in collaboration with BEE and Industrial Training Institutes." },
      { title: "Enhanced Product Stewardship Programme", body: "Responsibility for the material beyond the point of sale — correct specification, safe application and end-use performance." }
    ],
    standard: {
      code: "IS 12432 (Part 3):2002",
      title: "Application of Spray Applied Insulation — Code of Practice, Part 3: Polyurethane / Polyisocyanurate",
      body: "Adopted by the Bureau of Indian Standards after the draft was finalised by the Thermal Insulation Sectional Committee and approved by the Chemical Division Council. Rigid urethane foam is suitable for surfaces operating from −180°C to 110°C for PUR and up to 140°C for PIR; sprayed application is rated −30°C to +120°C.",
      owner: "Bureau of Indian Standards"
    },
    timeline: [
      { date: "25 May 2016",     place: "Courtyard Marriott, Pune",        title: "SFAI launch \u2014 An Initiative of the System Houses" },
      { date: "26 May 2016",     place: "NCL Innovation Park, Pune",       title: "First technical training programme" },
      { date: "22 Sept 2016",    place: "Covestro India, Noida",           title: "Technical Training Programme II" },
      { date: "16 Dec 2016",     place: "Brilliant Convention Centre, Indore", title: "Spray Foam for Cold Stores Retrofit" },
      { date: "28 Apr 2017",     place: "Graco Technical Centre, Gurugram", title: "Training programme \u2014 25 attendees, travelling from Raipur and Ladakh" },
      { date: "17\u201318 Nov 2017", place: "Chennai Trade Centre",            title: "ICE 2017" }
    ],
    partners: ["Bureau of Energy Efficiency (BEE)", "Industrial Training Institutes (ITIs)", "TERI", "IGBC", "National Horticulture Board (NHB)", "GCCA", "Indian Polyurethane Association (IPUA)"],
    resources: [
      { name: "SFAI Charter",                        file: "/docs/sfai/sfai-charter.pdf",                        note: "Objective, deliverables and metrics" },
      { name: "SFAI Technical Manual",               file: "/docs/sfai/sfai-technical-manual.pdf",               note: "A Guide to Energy Security: Working with Spray Polyurethane Foam" },
      { name: "Indian Standard IS 12432 (Part 3)",   file: "/docs/sfai/indian-standard-is-12432.pdf",             note: "Code of practice for spray applied insulation" },
      { name: "The Need for Building Insulation",    file: "/docs/sfai/the-need-for-building-insulation.pdf",     note: "Why insulation — technical article" },
      { name: "Architecture and Energy Savings",     file: "/docs/sfai/architecture-and-energy-savings.pdf",      note: "Where insulation — technical article" },
      { name: "Cold Stores Retrofit",                file: "/docs/sfai/cold-stores-retrofit.pdf",                 note: "Indore programme, December 2016" },
      { name: "Launch of SFAI",                      file: "/docs/sfai/launch-of-sfai.pdf",                       note: "Pune, 25 May 2016" },
      { name: "An Initiative of the System Houses",  file: "/docs/sfai/an-initiative-of-the-system-houses.pdf",   note: "Founding presentation" },
      { name: "ICE 2017",                            file: "/docs/sfai/ice-2017.pdf",                            note: "Chennai Trade Centre, November 2017" },
      { name: "PU Insulation and the EU Directive",  file: "/docs/sfai/pu-insulation-eu-directive.pdf",           note: "Policy context, April 2018" }
    ]
  },

  iif: {
    abbr: "IIF",
    name: "India Insulation Forum",
    parent: "Industry body — profile in preparation",
    tagline: "An industry forum advancing insulation practice in India.",
    comingSoon: true,
    role: {
      label: "Isaac Emmanuel Yenubari's role",
      lines: ["Associated with the India Insulation Forum"],
      note: "This page is a placeholder. The forum's profile and the precise nature of the association are being confirmed before publication — we would rather leave it thin than state it inaccurately."
    },
    overview: [
      "The India Insulation Forum sits alongside the Spray Foam Alliance of India in Emmanuel Solutions' industry work: insulation, energy efficiency and the standards that govern them.",
      "A full profile — the forum's objectives, activities, membership and Isaac's role within it — is being prepared and will be published here once confirmed."
    ],
    whatToExpect: [
      "The forum's objectives and areas of activity",
      "Isaac's role and contribution",
      "Relationship to insulation standards and energy efficiency policy",
      "Resources and technical material"
    ]
  }
};
