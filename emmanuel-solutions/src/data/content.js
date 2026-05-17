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
