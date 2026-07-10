require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const connectDB = require('./db/db');

const products = [
  {
    series: "LIGHT Series", model: "MyzoEE 1", tagline: "Portable Power for Daily Life", type: "Power Station", badge: "Entry Level",
    description: "Compact and lightweight portable power station designed for everyday home backup and outdoor use. Ideal for small appliances, phones, fans, and lights.",
    image: null, color: "#033e74", stock: 24, status: "Active",
    specs: [
      { label: "Battery Type", value: "LiFePO4" }, { label: "Battery Capacity", value: "1004.8 Wh" },
      { label: "Cell Capacity", value: "314 Ah" }, { label: "Battery Cycles", value: "11,000 cycles @ 70% SOH" },
      { label: "AC Output Power", value: "200 W" }, { label: "AC Output Voltage", value: "200–240 VAC / 230 VAC" },
      { label: "AC Input Power", value: "200 W" }, { label: "Max PV Input Power", value: "200 W" },
      { label: "PV Input Voltage", value: "12–36 VDC" }, { label: "Max PV Input Current", value: "11 A" },
      { label: "Ingress Protection", value: "IP20" }, { label: "Operating Temp", value: "Charge: 0–40°C / Discharge: -20–40°C" },
      { label: "Storage Temp", value: "-20°C – 60°C" }, { label: "Net Weight", value: "8.26 kg" },
      { label: "Dimensions", value: "L210 × W130 × H285 mm" }, { label: "Certifications", value: "CE, UN38.3, IEC62619" },
    ],
    useCases: ["Lamp 20W – 42h", "Fan 30W – 28h", "TV 100W – 8.5h", "Phone – 53 charges", "CCTV 60W – 14h"],
  },
  {
    series: "LIGHT Series", model: "MyzoEE LIGHT 1", tagline: "Plug and Play Power, Anywhere", type: "Power Station", badge: "Fast Charge",
    description: "Higher charge/discharge power with faster charging capability. Installation-free and maintenance-free — just plug and play for residential backup power needs.",
    image: null, color: "#033e74", stock: 18, status: "Active",
    specs: [
      { label: "Battery Type", value: "LiFePO4" }, { label: "Battery Capacity", value: "1004.8 Wh" },
      { label: "Cell Capacity", value: "314 Ah" }, { label: "Battery Cycles", value: "11,000 cycles @ 70% SOH" },
      { label: "AC Output Power", value: "500 W" }, { label: "AC Output Voltage", value: "90–290 VAC / 230 VAC" },
      { label: "AC Input Power", value: "500 W" }, { label: "Max PV Input Power", value: "300 W" },
      { label: "PV Input Voltage", value: "12–55 VDC" }, { label: "Max PV Input Current", value: "10 A" },
      { label: "Ingress Protection", value: "IP20" }, { label: "Operating Temp", value: "Charge: 0–40°C / Discharge: -10–40°C" },
      { label: "Storage Temp", value: "-20°C – 60°C" }, { label: "Net Weight", value: "9.3 kg" },
      { label: "Dimensions", value: "L235 × W142 × H315 mm" }, { label: "Certifications", value: "CE, UN38.3, IEC62619" },
    ],
    useCases: ["Lamp – 42h", "Fan – 28h", "TV – 14h", "Phone – 53 charges", "Laptop – 14h"],
  },
  {
    series: "LIGHT Series", model: "MyzoEE 2", tagline: "Double the Power, Double the Peace of Mind", type: "Power Station", badge: "Best Seller",
    description: "High-capacity portable power station with 2kWh capacity. Supports larger appliances like fridges, rice cookers, and desktop computers with ease.",
    image: null, color: "#033e74", stock: 12, status: "Active",
    specs: [
      { label: "Battery Type", value: "LiFePO4" }, { label: "Battery Capacity", value: "2009.6 Wh" },
      { label: "Cell Capacity", value: "314 Ah" }, { label: "Battery Cycles", value: "11,000 cycles @ 70% SOH" },
      { label: "AC Output Power", value: "1000 W" }, { label: "AC Output Voltage", value: "200–240 VAC / 230 VAC" },
      { label: "AC Input Power", value: "1000 W" }, { label: "Max PV Input Power", value: "450 W" },
      { label: "PV Input Voltage", value: "12–50 VDC" }, { label: "Max PV Input Current", value: "20 A" },
      { label: "Ingress Protection", value: "IP20" }, { label: "Operating Temp", value: "Charge: 0–40°C / Discharge: -20–40°C" },
      { label: "Storage Temp", value: "-20°C – 60°C" }, { label: "Net Weight", value: "18.3 kg" },
      { label: "Dimensions", value: "L285 × W210 × H311 mm" }, { label: "Certifications", value: "CE, CB, UN38.3, IEC62619" },
    ],
    useCases: ["Fridge 300W – 5.5h", "Lamp – 34h", "Fan – 56h", "Phone – 106 charges", "Rice Cooker – 2.5h"],
  },
  {
    series: "MaxPower Series", model: "MaxPower 8 AIO", tagline: "All-In-One Residential Energy Storage", type: "Residential ESS", badge: "All-in-One",
    description: "Complete all-in-one residential energy storage system with 5kW inverter and 8kWh capacity. 180% PV oversizing capability for maximum solar utilization.",
    image: null, color: "#033e74", stock: 6, status: "Low Stock",
    specs: [
      { label: "Battery Type", value: "LiFePO4" }, { label: "Battery Capacity", value: "8038.4 Wh" },
      { label: "Cell Capacity", value: "314 Ah" }, { label: "Battery Cycles", value: "11,000 cycles @ 70% SOH" },
      { label: "Rated Input/Output", value: "5000 W" }, { label: "Rated Voltage", value: "230 VAC, 50/60 Hz" },
      { label: "Max PV Input Power", value: "9000 W" }, { label: "MPPT Voltage Range", value: "60–450 VDC" },
      { label: "Max PV Input Current", value: "27 A" }, { label: "MPPT Efficiency", value: "99.5% Max" },
      { label: "Ingress Protection", value: "IP20" }, { label: "Cooling", value: "Intelligent Fan" },
      { label: "Display", value: "LCD Screen" }, { label: "Interface", value: "USB / RJ45 / MC4 / Phoenix Terminal" },
      { label: "Operating Temp", value: "Charge: 0–45°C / Discharge: -10–45°C" }, { label: "Net Weight", value: "75 ± 2 kg" },
      { label: "Dimensions", value: "L500 × W230 × H757 mm" }, { label: "Certifications", value: "CE, UN38.3, IEC62619" },
    ],
    useCases: ["Full Home Backup", "Solar Integration", "Grid-tied Operation", "Peak Shaving", "Self-consumption"],
  },
  {
    series: "MaxPower Series", model: "MaxPower 16", tagline: "Scalable LV Battery for Home & Business", type: "LV Battery", badge: "Expandable",
    description: "High-capacity low-voltage battery with up to 16 units in parallel for 256kWh total energy. LCD touchscreen and multi-protocol communication for smart energy management.",
    image: null, color: "#033e74", stock: 4, status: "Low Stock",
    specs: [
      { label: "Battery Type", value: "LiFePO4" }, { label: "Battery Capacity", value: "16076.8 Wh" },
      { label: "Cell Capacity", value: "314 Ah" }, { label: "Battery Cycles", value: "11,000 cycles @ 70% SOH" },
      { label: "Rated Voltage", value: "51.2 VDC" }, { label: "Charge Voltage Range", value: "43.2–58.4 VDC" },
      { label: "Recommend Current", value: "100 A" }, { label: "Maximum Current", value: "200 A" },
      { label: "DOD", value: "90%" }, { label: "Charge Mode", value: "CC-CV" },
      { label: "Scalability", value: "Up to 16 in parallel – 256 kWh" }, { label: "Communication", value: "CAN / RS485 / RS232" },
      { label: "Display", value: "LCD Touchscreen" }, { label: "Ingress Protection", value: "IP30" },
      { label: "Operating Temp", value: "Charge: 0–40°C / Discharge: -20–40°C" }, { label: "Net Weight", value: "110 kg" },
      { label: "Dimensions", value: "L520 × W240 × H781 mm" }, { label: "Certifications", value: "CE, CB, UN38.3, IEC62619" },
    ],
    useCases: ["Large Residential", "Small Commercial", "Flexible Expansion", "Smart Grid Integration", "No Blackout"],
  },
  {
    series: "MaxPower Series", model: "MaxPower 30", tagline: "First to Adopt 587Ah Grade-A Cells", type: "LV Battery", badge: "High Capacity",
    description: "Industry-first 587Ah cell capacity LV battery delivering 30kWh in a single unit. IP65 rated with up to 32 units in parallel for massive 960kWh systems.",
    image: null, color: "#033e74", stock: 0, status: "Out of Stock",
    specs: [
      { label: "Battery Type", value: "LiFePO4" }, { label: "Battery Capacity", value: "30054 Wh" },
      { label: "Cell Capacity", value: "587 Ah" }, { label: "Battery Cycles", value: ">11,000 cycles @ 70% SOH" },
      { label: "Rated Voltage", value: "51.2 VDC" }, { label: "Charge/Discharge Range", value: "43.2–58.4 VDC" },
      { label: "Recommend Current", value: "150 A" }, { label: "Maximum Current", value: "300 A" },
      { label: "DOD", value: "100%" }, { label: "Scalability", value: "Up to 32 in parallel" },
      { label: "Communication", value: "CAN / RS485" }, { label: "Display", value: "LCD Screen" },
      { label: "Ingress Protection", value: "IP65" }, { label: "Operating Temp", value: "Charge: 0–45°C / Discharge: -20–45°C" },
      { label: "Net Weight", value: "~200 kg" }, { label: "Dimensions", value: "L705.7 × W250.7 × H840.8 mm" },
      { label: "Certifications", value: "UN38.3, MSDS, IEC62619" },
    ],
    useCases: ["Commercial Storage", "Large-scale Backup", "Flexible Expansion", "Grade-A Cells", "All-Round Safety"],
  },
  {
    series: "NeoPower Series", model: "NeoPower 4", tagline: "Drop-in Lead-Acid Replacement", type: "Lead-acid Replacement", badge: "IP67",
    description: "Ultra-light, IP67-rated LiFePO4 battery designed as a direct lead-acid replacement. Up to 4 in series for 16kWh, with maintenance-free operation.",
    image: null, color: "#033e74", stock: 15, status: "Active",
    specs: [
      { label: "Battery Type", value: "LiFePO4" }, { label: "Battery Capacity", value: "4019.2 Wh" },
      { label: "Cell Capacity", value: "314 Ah" }, { label: "Battery Cycles", value: "11,000 cycles @ 70% SOH" },
      { label: "Rated Voltage", value: "12.8 VDC" }, { label: "Charge Voltage Range", value: "10.8–14.6 VDC" },
      { label: "Recommend Current", value: "60 A" }, { label: "Maximum Current", value: "150 A" },
      { label: "DOD", value: "90%" }, { label: "Scalability", value: "Up to 4 in series – 16 kWh" },
      { label: "Ingress Protection", value: "IP67" }, { label: "Operating Temp", value: "Charge: 0–55°C / Discharge: -20–55°C" },
      { label: "Net Weight", value: "29.25 kg" }, { label: "Dimensions", value: "L502 × W186 × H243 mm" },
      { label: "Certifications", value: "UN38.3" },
    ],
    useCases: ["RV / Boat", "Solar Off-grid", "UPS Backup", "Telecom Towers", "Lead-acid Replacement"],
  },
  {
    series: "LEGEND Series", model: "LEGEND 112C", tagline: "Industrial-Grade C&I Energy Storage", type: "C&I ESS", badge: "Commercial",
    description: "Container-based commercial & industrial energy storage system. Air-cooled with aerosol fire protection, 112.5kWh capacity and IP55 rating for demanding environments.",
    image: null, color: "#033e74", stock: 2, status: "Low Stock",
    specs: [
      { label: "Battery Type", value: "LiFePO4" }, { label: "Rated Energy", value: "112.5 kWh" },
      { label: "Rated Capacity", value: "314 Ah" }, { label: "Battery Cycles", value: "11,000 cycles @ 70% SOH" },
      { label: "Rated Voltage", value: "358.4 V" }, { label: "Operating Voltage", value: "302.4–408.8 V" },
      { label: "Standard I/O Current", value: "157 A / 157 A" }, { label: "DC-Side Efficiency", value: "≥ 93%" },
      { label: "Type of Cooling", value: "Air Cooling" }, { label: "Fire Protection", value: "Aerosol System" },
      { label: "Ingress Protection", value: "IP55" }, { label: "Communication", value: "485 / CAN / Ethernet" },
      { label: "Operating Temp", value: "Charge: 0–55°C / Discharge: -20–55°C" }, { label: "Storage Temp", value: "-20°C – 60°C" },
      { label: "Battery Weight", value: "1400 kg" }, { label: "Dimensions", value: "L900 × W1000 × H2280 mm" },
      { label: "Certifications", value: "UN38.3" },
    ],
    useCases: ["C&I Peak Shaving", "Grid Stabilization", "Solar Farm Storage", "Factory Backup", "Smart Grid"],
  },
  {
    series: "LEGEND Series", model: "LEGEND 112S", tagline: "Stackable Modular C&I Storage", type: "C&I ESS", badge: "Modular",
    description: "Stack-style modular commercial energy storage with natural cooling. Scalable from 64.3kWh to 112.5kWh with space-saving vertical design.",
    image: null, color: "#033e74", stock: 3, status: "Active",
    specs: [
      { label: "Battery Type", value: "LiFePO4" }, { label: "Module Voltage/Capacity", value: "51.2 V / 314 Ah" },
      { label: "Battery Cycles", value: "11,000 cycles @ 70% SOH" }, { label: "Module Stacking Qty", value: "4 – 7 modules" },
      { label: "System Energy Range", value: "64.3 – 112.53 kWh" }, { label: "System Operating Voltage", value: "172.8–408.8 VDC" },
      { label: "Standard Current", value: "157 A / 157 A (0.5C)" }, { label: "Maximum Current", value: "200 A / 200 A" },
      { label: "Type of Cooling", value: "Natural Cooling" }, { label: "Mounting", value: "Stack-style" },
      { label: "Ingress Protection", value: "IP20" }, { label: "Communication", value: "RS485" },
      { label: "Operating Temp", value: "Charge: 0–45°C / Discharge: -10–45°C" }, { label: "Single Module Weight", value: "134 kg" },
      { label: "System Max Size", value: "770 × 435 × 1986 mm (7 packs)" }, { label: "Certifications", value: "UN38.3, IEC62619, CE" },
    ],
    useCases: ["C&I Storage", "Flexible Expansion", "Easy Installation", "Space-Saving", "Ultra-Long Life"],
  },
];

async function seed() {
  await connectDB();
  const count = await Product.countDocuments();
  if (count > 0) {
    console.log(`Products already seeded (${count} found). Skipping.`);
    process.exit(0);
  }
  await Product.insertMany(products);
  console.log(`✅ ${products.length} products seeded successfully!`);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
