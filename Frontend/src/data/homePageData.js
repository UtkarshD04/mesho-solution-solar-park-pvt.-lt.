export const whyChooseData = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "4X Faster Charging",
    desc: "18A fast charging current gets you from empty to full in approximately 4 hours — 4 times faster than traditional inverter batteries.",
    iconBg: "bg-amber-100 text-amber-600",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
      </svg>
    ),
    title: "12-Year Lifespan",
    desc: "Built with advanced lithium-ion chemistry that outlasts conventional lead-acid batteries by up to 3x, delivering consistent performance year after year.",
    iconBg: "bg-teal-100 text-teal-600",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Zero Maintenance",
    desc: "No water top-ups, no acid checks, no terminal cleaning. Myzo batteries are completely sealed and maintenance-free from day one.",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Eco-Friendly",
    desc: "No acid fumes, no toxic emissions, and a significantly smaller carbon footprint. Myzo batteries are designed for a cleaner, greener India.",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "LCD + LED Smart Display",
    desc: "Real-time charge status, battery health, and power metrics at a glance — engineered for complete visibility and intelligent management.",
    iconBg: "bg-violet-100 text-violet-600",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Compact & Modern Design",
    desc: "Slim, lightweight form factor that fits any home or office without the bulk of conventional inverter systems. Built to complement modern interiors.",
    iconBg: "bg-rose-100 text-rose-600",
  },
];

export const batteryProducts = [
  {
    id: "bess-container-heavy",
    name: "Myzo Megawatt Container BESS",
    type: "Utility & Grid-Scale Storage",
    description: "Pre-engineered IP65 container solutions with liquid-cooling, fire suppression, and integrated high-voltage BMS.",
    specs: { capacity: "500 kWh – 3.2 MWh", chemistry: "High-grade LFP (LiFePO4)", thermalManagement: "Liquid Cooling System", rackConfiguration: "17S Series Racks", certifications: "UL 9540A, IEC 62619" },
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc2dbe4d?w=800&q=80",
    tag: "Grid-Scale",
    color: "from-blue-600 to-blue-900",
  },
  {
    id: "rack-telecom",
    name: "Myzo LFP Smart Rack Module",
    type: "C&I & Telecom Backup",
    description: "Standardized rack-mountable modules ideal for UPS, microgrids, telecom towers, and data centers.",
    specs: { nominalVoltage: "51.2 V", nominalCapacity: "100 Ah (5.12 kWh)", maxParallelUnits: "Up to 32 modules", interface: "CAN, RS485, Modbus TCP", cycleLife: "6000+ Cycles @ 80% DoD" },
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    tag: "Best Seller",
    color: "from-teal-500 to-teal-800",
  },
  {
    id: "lowtemp-pack",
    name: "Myzo Extreme Temp Arctic Pack",
    type: "Sub-Zero Temperature Storage",
    description: "Engineered with integrated heating film to allow charging and discharging in extreme sub-zero conditions.",
    specs: { operatingTemp: "-35°C to +55°C", integratedHeater: "Smart BMS Controlled (120W)", voltages: "12V / 24V / 48V packs", cycleLife: "4000+ Cycles in cold climates", enclosureClass: "IP66 Sealed Aluminum" },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    tag: "Low-Temp Tech",
    color: "from-sky-500 to-sky-900",
  },
  {
    id: "wall-ess",
    name: "Myzo Slimline Wall ESS",
    type: "Residential & Small Commercial",
    description: "Ultra-slim wall-mounted lithium energy storage units designed to provide reliable backup for offices and homes.",
    specs: { capacity: "10.24 kWh / 15.36 kWh", batteryVoltage: "51.2 V", widthDepth: "Slim profile (175mm thickness)", coolingType: "Natural Convection", scalability: "Parallel connection up to 8" },
    image: "https://images.unsplash.com/photo-1591129844517-4c84e9acac8f?w=800&q=80",
    tag: "Sleek ESS",
    color: "from-violet-600 to-violet-900",
  },
];

export const engineeringDivisions = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "Utility BESS Containers",
    desc: "Walk-in ISO containers featuring automated liquid thermal management, clean fire containment grids, and internal climate sensors for multi-MW power station storage.",
    bg: "bg-blue-50", icon_bg: "bg-blue-100 text-blue-600",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    title: "Commercial Server Racks",
    desc: "High-density 48V LFP rack cabinets with integrated CAN/RS485 communication protocols, configured for seamless telecom station backup and commercial UPS rigs.",
    bg: "bg-emerald-50", icon_bg: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Custom EV Pack Assembly",
    desc: "Precision cell testing, sorting, matching, and resistance grading. Spot-welding of high-capacity cells tailored for utility vehicles, electric machinery, and custom industrial loads.",
    bg: "bg-orange-50", icon_bg: "bg-orange-100 text-orange-600",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: "BMS Development",
    desc: "Custom firmware deployment for cell balancing, voltage checking, smart thermal loops, and real-time remote telemetry mapping via Cloud IoT connection.",
    bg: "bg-purple-50", icon_bg: "bg-purple-100 text-purple-600",
  },
];
