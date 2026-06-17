export interface SpecializedData {
  presidentOrPM: string;
  governmentType: string;
  independenceDay: string;
  nationalLanguage: string;
  currencyName: string;
  coastlineLength: string;
  mountainRanges: string[];
  longestRivers: string[];
  gdpGrowth5Years: { year: number; gdpNominal: number; gdpGrowthRate: number }[];
  populationGrowth5Years: { year: number; population: number }[];
  literacyRate: number;
  povertyIndex: string;
  timeline: { year: string; event: string; description: string }[];
  warsAndConflicts: string[];
  geopoliticalAlliances: string[];
  spaceAgency: string;
  spaceMissions: string[];
  militaryAdvancements: {
    jetPlanes: string[];
    navalPower: string;
    keyTech: string[];
  };
  majorTechExports: string[];
}

export const countrySpecializedData: Record<string, SpecializedData> = {
  USA: {
    presidentOrPM: "Joe Biden (President)",
    governmentType: "Federal Constitutional Presidential Republic",
    independenceDay: "July 4, 1776",
    nationalLanguage: "English (De facto)",
    currencyName: "United States Dollar (USD)",
    coastlineLength: "19,924 km",
    mountainRanges: ["Rocky Mountains", "Appalachian Mountains", "Sierra Nevada", "Cascade Range"],
    longestRivers: ["Missouri River", "Mississippi River", "Yukon River", "Rio Grande"],
    gdpGrowth5Years: [
      { year: 2021, gdpNominal: 23315, gdpGrowthRate: 5.7 },
      { year: 2022, gdpNominal: 25462, gdpGrowthRate: 1.9 },
      { year: 2023, gdpNominal: 27360, gdpGrowthRate: 2.5 },
      { year: 2024, gdpNominal: 28780, gdpGrowthRate: 2.7 },
      { year: 2025, gdpNominal: 29840, gdpGrowthRate: 2.1 }
    ],
    populationGrowth5Years: [
      { year: 2021, population: 332031000 },
      { year: 2022, population: 333287000 },
      { year: 2023, population: 334914000 },
      { year: 2024, population: 336200000 },
      { year: 2025, population: 337500000 }
    ],
    literacyRate: 99,
    povertyIndex: "11.5% (National poverty line)",
    timeline: [
      { year: "1776", event: "Declaration of Independence", description: "The thirteen colonies declare independence from Great Britain." },
      { year: "1861-1865", event: "American Civil War", description: "War between the Union and the Confederacy, leading to the abolition of slavery." },
      { year: "1945", event: "End of WWII / Atomic Age", description: "The US emerges as a global superpower after defeating the Axis powers." },
      { year: "1969", event: "Apollo 11 Moon Landing", description: "Neil Armstrong becomes the first human to walk on the Moon." },
      { year: "2001", event: "September 11 Attacks", description: "Terrorist attacks lead to the Global War on Terrorism." }
    ],
    warsAndConflicts: ["American Revolutionary War", "World War I", "World War II", "Vietnam War", "Gulf War", "War in Afghanistan"],
    geopoliticalAlliances: ["NATO", "Five Eyes", "G7", "AUKUS", "OECD", "OAS"],
    spaceAgency: "NASA (National Aeronautics and Space Administration)",
    spaceMissions: ["Apollo Program", "Artemis Program", "James Webb Space Telescope", "Mars Perseverance Rover", "Voyager 1 & 2"],
    militaryAdvancements: {
      jetPlanes: ["F-22 Raptor", "F-35 Lightning II", "B-2 Spirit Stealth Bomber", "F-15EX Strike Eagle"],
      navalPower: "11 Active Supercarriers (Gerald R. Ford & Nimitz class), 70+ Submarines",
      keyTech: ["Aegis Combat System", "GPS Satellites", "PrSM Ballistic Missiles", "Advanced Railgun Development"]
    },
    majorTechExports: ["Semiconductors", "Aerospace Technology", "Cloud & Enterprise Software", "Biomedical Devices", "AI Microchips"]
  },
  CHN: {
    presidentOrPM: "Xi Jinping (President) & Li Qiang (Premier)",
    governmentType: "Unitary Marxist-Leninist Socialist One-Party State",
    independenceDay: "October 1, 1949 (Founding of PRC)",
    nationalLanguage: "Mandarin Chinese",
    currencyName: "Renminbi / Yuan (CNY)",
    coastlineLength: "14,500 km",
    mountainRanges: ["Himalayas", "Kunlun Mountains", "Tianshan", "Altai Mountains"],
    longestRivers: ["Yangtze River", "Yellow River", "Heilongjiang (Amur) River", "Pearl River"],
    gdpGrowth5Years: [
      { year: 2021, gdpNominal: 17734, gdpGrowthRate: 8.4 },
      { year: 2022, gdpNominal: 17963, gdpGrowthRate: 3.0 },
      { year: 2023, gdpNominal: 18560, gdpGrowthRate: 5.2 },
      { year: 2024, gdpNominal: 19410, gdpGrowthRate: 4.8 },
      { year: 2025, gdpNominal: 20250, gdpGrowthRate: 4.5 }
    ],
    populationGrowth5Years: [
      { year: 2021, population: 1412600000 },
      { year: 2022, population: 1411750000 },
      { year: 2023, population: 1409670000 },
      { year: 2024, population: 1408000000 },
      { year: 2025, population: 1406000000 }
    ],
    literacyRate: 96.8,
    povertyIndex: "0.1% (Extreme poverty officially eradicated)",
    timeline: [
      { year: "221 BC", event: "Qin Dynasty Unification", description: "Qin Shi Huang unites China, starting the imperial era and the Great Wall." },
      { year: "1911", event: "Xinhai Revolution", description: "Overthrow of the Qing Dynasty, ending 2,000 years of imperial rule." },
      { year: "1949", event: "Founding of the PRC", description: "Mao Zedong declares the establishment of the People's Republic of China." },
      { year: "1978", event: "Economic Reform & Opening Up", description: "Deng Xiaoping initiates market reforms, leading to rapid GDP growth." },
      { year: "2013", event: "Belt and Road Initiative Launched", description: "Global infrastructure development strategy initiated." }
    ],
    warsAndConflicts: ["Korean War", "Sino-Indian War", "Sino-Vietnamese War", "Border clashes with USSR"],
    geopoliticalAlliances: ["Shanghai Cooperation Organisation (SCO)", "BRICS", "UN Security Council Permanent 5"],
    spaceAgency: "CNSA (China National Space Administration)",
    spaceMissions: ["Tiangong Space Station", "Chang'e Lunar Missions", "Tianwen-1 Mars Rover", "Shenzhou Manned Spaceflights"],
    militaryAdvancements: {
      jetPlanes: ["J-20 Mighty Dragon Stealth Fighter", "J-16 Strike Fighter", "H-20 Stealth Bomber (In Dev)", "J-15 Flying Shark"],
      navalPower: "3 Aircraft Carriers (Liaoning, Shandong, Fujian), Type 055 Stealthed Destroyers",
      keyTech: ["Hypersonic Glide Vehicles (DF-17)", "Quantum Satellite Communications", "Anti-Satellite Weapons"]
    },
    majorTechExports: ["Consumer Electronics", "Telecommunications Equipment (5G)", "Solar Panels & Wind Turbines", "Electric Vehicles (BYD)", "Lithium Batteries"]
  },
  IND: {
    presidentOrPM: "Narendra Modi (Prime Minister) & Droupadi Murmu (President)",
    governmentType: "Federal Parliamentary Democratic Republic",
    independenceDay: "August 15, 1947",
    nationalLanguage: "Hindi & English (Official; 22 scheduled languages)",
    currencyName: "Indian Rupee (INR)",
    coastlineLength: "7,516 km",
    mountainRanges: ["Himalayas", "Western Ghats", "Eastern Ghats", "Aravalli Range", "Vindhyas"],
    longestRivers: ["Ganges River", "Godavari River", "Krishna River", "Yamuna River", "Brahmaputra"],
    gdpGrowth5Years: [
      { year: 2021, gdpNominal: 3150, gdpGrowthRate: 8.7 },
      { year: 2022, gdpNominal: 3417, gdpGrowthRate: 7.2 },
      { year: 2023, gdpNominal: 3730, gdpGrowthRate: 8.2 },
      { year: 2024, gdpNominal: 4110, gdpGrowthRate: 7.8 },
      { year: 2025, gdpNominal: 4520, gdpGrowthRate: 7.0 }
    ],
    populationGrowth5Years: [
      { year: 2021, population: 1407560000 },
      { year: 2022, population: 1417170000 },
      { year: 2023, population: 1428620000 },
      { year: 2024, population: 1438000000 },
      { year: 2025, population: 1448000000 }
    ],
    literacyRate: 77.7,
    povertyIndex: "14.9% (Multidimensional Poverty Index)",
    timeline: [
      { year: "2500 BC", event: "Indus Valley Civilization", description: "One of the world's earliest urban civilizations develops in northwest India." },
      { year: "268 BC", event: "Reign of Ashoka the Great", description: "Emperor Ashoka promotes Buddhism throughout Asia after the Kalinga War." },
      { year: "1947", event: "Independence & Partition", description: "Freedom from British rule achieved through Mahatma Gandhi's non-violent movement." },
      { year: "1991", event: "Economic Liberalization", description: "Dismantling of the 'License Raj' opens the Indian economy to global trade." },
      { year: "2023", event: "G20 Presidency & Moon Landing", description: "India hosts the G20 summit and successfully lands Chandrayaan-3 on the Lunar South Pole." }
    ],
    warsAndConflicts: ["Indo-Pakistani Wars (1947, 1965, 1971, 1999)", "Sino-Indian War (1962)", "Kargil War"],
    geopoliticalAlliances: ["Quad", "BRICS", "SCO", "G20", "Commonwealth of Nations"],
    spaceAgency: "ISRO (Indian Space Research Organisation)",
    spaceMissions: ["Chandrayaan-3 (Moon South Pole)", "Mangalyaan (Mars Orbiter)", "Aditya-L1 (Solar Mission)", "Gaganyaan (Manned Orbit)"],
    militaryAdvancements: {
      jetPlanes: ["HAL Tejas Light Combat Aircraft", "Rafale (Custom Indian Specs)", "Su-30MKI Flanker", "AMCA 5th Gen Fighter (In Dev)"],
      navalPower: "2 Aircraft Carriers (INS Vikramaditya, INS Vikrant), Arihant-class nuclear submarines",
      keyTech: ["BrahMos Supersonic Cruise Missile", "ASAT (Anti-Satellite Weapon)", "Agni-V ICBM", "Vikrant Indigenous Carrier Tech"]
    },
    majorTechExports: ["Software Services & IT Solutions", "Pharmaceuticals & Vaccines", "Refined Petroleum", "Diamonds & Jewelry", "Engineering Goods"]
  },
  RUS: {
    presidentOrPM: "Vladimir Putin (President) & Mikhail Mishustin (Prime Minister)",
    governmentType: "Federal Semi-Presidential Constitutional Republic",
    independenceDay: "June 12, 1990 (Russia Day / Sovereignty)",
    nationalLanguage: "Russian",
    currencyName: "Russian Ruble (RUB)",
    coastlineLength: "37,653 km",
    mountainRanges: ["Ural Mountains", "Caucasus Mountains", "Altai Mountains", "Verkhoyansk Range"],
    longestRivers: ["Lena River", "Ob River", "Yenisey River", "Volga River"],
    gdpGrowth5Years: [
      { year: 2021, gdpNominal: 1778, gdpGrowthRate: 4.8 },
      { year: 2022, gdpNominal: 2240, gdpGrowthRate: -1.2 },
      { year: 2023, gdpNominal: 2020, gdpGrowthRate: 3.6 },
      { year: 2024, gdpNominal: 1990, gdpGrowthRate: 2.8 },
      { year: 2025, gdpNominal: 1950, gdpGrowthRate: 1.5 }
    ],
    populationGrowth5Years: [
      { year: 2021, population: 1434000000 },
      { year: 2022, population: 146150000 },
      { year: 2023, population: 144200000 },
      { year: 2024, population: 143800000 },
      { year: 2025, population: 143500000 }
    ],
    literacyRate: 99.7,
    povertyIndex: "9.3% (National standard)",
    timeline: [
      { year: "882", event: "Kievan Rus' Founded", description: "Establishment of the East Slavic state centered in Kyiv." },
      { year: "1721", event: "Russian Empire Proclaimed", description: "Peter the Great expands borders and modernizes the state on Western models." },
      { year: "1917", event: "Bolshevik Russian Revolution", description: "Vladimir Lenin leads the revolution, establishing the world's first socialist state." },
      { year: "1941-1945", event: "The Great Patriotic War (WWII)", description: "USSR defeats Nazi Germany at enormous cost (27 million Soviet lives)." },
      { year: "1991", event: "Dissolution of the Soviet Union", description: "The USSR disintegrates; the Russian Federation emerges as the successor state." }
    ],
    warsAndConflicts: ["World War I", "World War II", "Soviet-Afghan War", "Chechen Wars", "Georgia Conflict", "Russia-Ukraine War"],
    geopoliticalAlliances: ["CSTO", "BRICS", "SCO", "EAEU", "UN Security Council Permanent 5"],
    spaceAgency: "Roscosmos (State Space Corporation)",
    spaceMissions: ["Soyuz Spacecraft Family", "International Space Station (ISS) Core Modules", "Luna-25 Lunar Lander", "Glonass Navigation System"],
    militaryAdvancements: {
      jetPlanes: ["Su-57 Felon Stealth Fighter", "Su-35S Flanker-E", "MiG-31K Foxhound (Kinzhal Carrier)", "Tu-160M White Swan Bomber"],
      navalPower: "1 Aircraft Carrier (Admiral Kuznetsov - Refitting), 60+ Submarines (Akula & Yasen-class nuclear subs)",
      keyTech: ["S-500 Prometheus Air Defense", "Kinzhal & Zircon Hypersonic Missiles", "Sarmat RS-28 Heavy ICBM", "Avangard Hypersonic Glide Vehicle"]
    },
    majorTechExports: ["Nuclear Reactors & Nuclear Fuels", "Military Weaponry & Defense Systems", "Cybersecurity Software (Kaspersky)", "Aerospace Equipment", "Mining Tech"]
  },
  GBR: {
    presidentOrPM: "Keir Starmer (Prime Minister) & King Charles III (Monarch)",
    governmentType: "Unitary Parliamentary Constitutional Monarchy",
    independenceDay: "Not Applicable (Act of Union 1707)",
    nationalLanguage: "English",
    currencyName: "British Pound Sterling (GBP)",
    coastlineLength: "12,429 km",
    mountainRanges: ["Grampian Mountains", "Pennines", "Snowdonia", "Lake District Cumbrian Mountains"],
    longestRivers: ["River Severn", "River Thames", "River Trent", "River Great Ouse"],
    gdpGrowth5Years: [
      { year: 2021, gdpNominal: 3131, gdpGrowthRate: 7.5 },
      { year: 2022, gdpNominal: 3082, gdpGrowthRate: 4.3 },
      { year: 2023, gdpNominal: 3340, gdpGrowthRate: 0.1 },
      { year: 2024, gdpNominal: 3490, gdpGrowthRate: 0.5 },
      { year: 2025, gdpNominal: 3620, gdpGrowthRate: 1.0 }
    ],
    populationGrowth5Years: [
      { year: 2021, population: 67026000 },
      { year: 2022, population: 67081000 },
      { year: 2023, population: 67600000 },
      { year: 2024, population: 68100000 },
      { year: 2025, population: 68600000 }
    ],
    literacyRate: 99,
    povertyIndex: "18% (Relative poverty standard)",
    timeline: [
      { year: "1215", event: "Magna Carta signed", description: "King John signs the document limiting the power of the English Crown." },
      { year: "1760s", event: "Industrial Revolution Begins", description: "Britain becomes the world's first industrial power through steam and coal." },
      { year: "1939-1945", event: "Battle of Britain & WWII", description: "Winston Churchill leads defense against Germany; Empire is dismantled post-war." },
      { year: "1952", event: "Accession of Queen Elizabeth II", description: "Begins a historic 70-year reign during a period of decolonization and change." },
      { year: "2016-2020", event: "Brexit Process", description: "UK votes to leave the European Union, officially exiting on Jan 31, 2020." }
    ],
    warsAndConflicts: ["Seven Years' War", "Napoleonic Wars", "World War I", "World War II", "Falklands War", "Gulf War", "War in Afghanistan"],
    geopoliticalAlliances: ["NATO", "Five Eyes", "G7", "AUKUS", "OECD", "Commonwealth"],
    spaceAgency: "UKSA (UK Space Agency)",
    spaceMissions: ["Skynet Military Satellites", "Rosetta Mission (Comet Lander - ESA contributor)", "OneWeb Satellite Constellation"],
    militaryAdvancements: {
      jetPlanes: ["Eurofighter Typhoon", "F-35B Lightning II", "Tempest 6th Gen Fighter (In Dev)"],
      navalPower: "2 Aircraft Carriers (HMS Queen Elizabeth, HMS Prince of Wales), Astute-class attack subs",
      keyTech: ["Type 45 Guided Missile Destroyers", "Trident Nuclear Deterrent (Vanguard-class)", "Sampson Multi-function Radar"]
    },
    majorTechExports: ["Aerospace Turbines (Rolls-Royce)", "Pharmaceuticals (AstraZeneca)", "Financial Technology (FinTech)", "Military Systems", "Precision Instruments"]
  },
  DEU: {
    presidentOrPM: "Olaf Scholz (Chancellor) & Frank-Walter Steinmeier (President)",
    governmentType: "Federal Parliamentary Democratic Republic",
    independenceDay: "October 3, 1990 (German Reunification Day)",
    nationalLanguage: "German",
    currencyName: "Euro (EUR)",
    coastlineLength: "2,389 km",
    mountainRanges: ["Alps", "Black Forest", "Harz Mountains", "Ore Mountains"],
    longestRivers: ["Rhine River", "Danube River", "Elbe River", "Weser River"],
    gdpGrowth5Years: [
      { year: 2021, gdpNominal: 4262, gdpGrowthRate: 2.6 },
      { year: 2022, gdpNominal: 4075, gdpGrowthRate: 1.8 },
      { year: 2023, gdpNominal: 4456, gdpGrowthRate: -0.3 },
      { year: 2024, gdpNominal: 4590, gdpGrowthRate: 0.2 },
      { year: 2025, gdpNominal: 4710, gdpGrowthRate: 1.0 }
    ],
    populationGrowth5Years: [
      { year: 2021, population: 83196000 },
      { year: 2022, population: 84080000 },
      { year: 2023, population: 84400000 },
      { year: 2024, population: 84600000 },
      { year: 2025, population: 84800000 }
    ],
    literacyRate: 99,
    povertyIndex: "14.8% (At-risk-of-poverty rate)",
    timeline: [
      { year: "800", event: "Charlemagne Crowned", description: "Crown of Holy Roman Emperor, consolidating German and French territories." },
      { year: "1871", event: "German Empire Unified", description: "Otto von Bismarck unites Germany under Prussian leadership." },
      { year: "1933-1945", event: "Third Reich & WWII", description: "Nazi regime rises, launches WWII, commits Holocaust, ending in complete collapse." },
      { year: "1961", event: "Berlin Wall Built", description: "Symbol of Cold War division between East and West Germany erected." },
      { year: "1989-1990", event: "Fall of Berlin Wall & Reunification", description: "Peaceful revolution leads to the unification of Germany." }
    ],
    warsAndConflicts: ["Franco-Prussian War", "World War I", "World War II"],
    geopoliticalAlliances: ["European Union (EU)", "NATO", "G7", "OECD", "OSCE"],
    spaceAgency: "DLR (German Aerospace Center)",
    spaceMissions: ["Columbus Module on ISS", "TerraSAR-X Radar Satellite", "ESA Mars Express Contributions", "Galileo Navigation Satellite Contributions"],
    militaryAdvancements: {
      jetPlanes: ["Eurofighter Typhoon", "Tornado IDS/ECR", "FCAS 6th Gen Stealth Fighter (In Dev with France)"],
      navalPower: "F125 Baden-Württemberg-class Frigates, Type 212A Hydrogen Fuel Cell Submarines",
      keyTech: ["Leopard 2 Main Battle Tank", "PzH 2000 Self-Propelled Howitzer", "IRIS-T SLM Air Defense System"]
    },
    majorTechExports: ["Automobiles (Mercedes, BMW, VW)", "Industrial Machinery & Automation (Siemens)", "Chemicals & Plastics (BASF)", "Medical & Precision Equipment", "Optics & Sensors"]
  },
  FRA: {
    presidentOrPM: "Emmanuel Macron (President)",
    governmentType: "Unitary Semi-Presidential Constitutional Republic",
    independenceDay: "July 14 (Bastille Day - 1789 Revolution)",
    nationalLanguage: "French",
    currencyName: "Euro (EUR)",
    coastlineLength: "4,853 km",
    mountainRanges: ["Alps", "Pyrenees", "Massif Central", "Vosges Mountains"],
    longestRivers: ["Loire River", "Seine River", "Rhône River", "Garonne River"],
    gdpGrowth5Years: [
      { year: 2021, gdpNominal: 2956, gdpGrowthRate: 6.8 },
      { year: 2022, gdpNominal: 2782, gdpGrowthRate: 2.5 },
      { year: 2023, gdpNominal: 3030, gdpGrowthRate: 0.9 },
      { year: 2024, gdpNominal: 3150, gdpGrowthRate: 0.8 },
      { year: 2025, gdpNominal: 3270, gdpGrowthRate: 1.2 }
    ],
    populationGrowth5Years: [
      { year: 2021, population: 67750000 },
      { year: 2022, population: 67970000 },
      { year: 2023, population: 68170000 },
      { year: 2024, population: 68350000 },
      { year: 2025, population: 68500000 }
    ],
    literacyRate: 99,
    povertyIndex: "14.6% (Relative standard)",
    timeline: [
      { year: "1789", event: "French Revolution", description: "Storming of the Bastille ends absolute monarchy, declares Rights of Man." },
      { year: "1804", event: "Napoleon Bonaparte Emperor", description: "Napoleon crowns himself Emperor, expanding French control across Europe." },
      { year: "1914-1918", event: "World War I Western Front", description: "France suffers massive casualties but wins against the German Empire." },
      { year: "1940-1944", event: "Vichy Regime & Resistance", description: "German occupation leads to Charles de Gaulle setting up Free France in London." },
      { year: "1958", event: "Fifth Republic Founded", description: "De Gaulle establishes a strong executive presidency system still in use." }
    ],
    warsAndConflicts: ["Napoleonic Wars", "Franco-Prussian War", "World War I", "World War II", "First Indochina War", "Algerian War"],
    geopoliticalAlliances: ["European Union (EU)", "NATO", "G7", "OECD", "UN Security Council Permanent 5"],
    spaceAgency: "CNES (National Centre for Space Studies)",
    spaceMissions: ["Ariane Rocket Launcher Family", "Giotto Halley Comet Mission", "Plato Space Telescope (ESA)"],
    militaryAdvancements: {
      jetPlanes: ["Dassault Rafale C/M", "Mirage 2000-5", "FCAS 6th Gen Jet (Joint dev)"],
      navalPower: "1 Nuclear Aircraft Carrier (Charles de Gaulle), Triomphant-class nuclear ballistic missile subs",
      keyTech: ["M51 SLBM Nuclear Missile", "FREMM Multimission Frigates", "Exocet Anti-Ship Missile", "Caesar Self-Propelled Artillery"]
    },
    majorTechExports: ["Aerospace (Airbus)", "Luxury Goods & Cosmetics (LVMH)", "Nuclear Technology (Framatome)", "Automobiles (Peugeot, Renault)", "Military Hardware"]
  },
  JPN: {
    presidentOrPM: "Shigeru Ishiba (Prime Minister) & Emperor Naruhito (Monarch)",
    governmentType: "Unitary Parliamentary Constitutional Monarchy",
    independenceDay: "Feb 11, 660 BC (National Foundation Day)",
    nationalLanguage: "Japanese",
    currencyName: "Japanese Yen (JPY)",
    coastlineLength: "29,751 km",
    mountainRanges: ["Japanese Alps", "Chugoku Mountains", "Ou Mountains"],
    longestRivers: ["Shinano River", "Tone River", "Ishikari River", "Teshio River"],
    gdpGrowth5Years: [
      { year: 2021, gdpNominal: 5030, gdpGrowthRate: 2.2 },
      { year: 2022, gdpNominal: 4231, gdpGrowthRate: 1.0 },
      { year: 2023, gdpNominal: 4210, gdpGrowthRate: 1.9 },
      { year: 2024, gdpNominal: 4180, gdpGrowthRate: 0.7 },
      { year: 2025, gdpNominal: 4250, gdpGrowthRate: 1.1 }
    ],
    populationGrowth5Years: [
      { year: 2021, population: 125680000 },
      { year: 2022, population: 125120000 },
      { year: 2023, population: 124500000 },
      { year: 2024, population: 123900000 },
      { year: 2025, population: 123300000 }
    ],
    literacyRate: 99,
    povertyIndex: "15.7% (Relative poverty standard)",
    timeline: [
      { year: "1603", event: "Tokugawa Shogunate", description: "Establishment of feudal military government and Sakoku isolation policy." },
      { year: "1868", event: "Meiji Restoration", description: "Restoration of imperial rule; Japan rapidly modernizes and industrializes." },
      { year: "1945", event: "Atomic Bombings & Surrender", description: "Hiroshima and Nagasaki bombed; Japan adopts pacifist constitution." },
      { year: "1960s-1980s", event: "Japanese Economic Miracle", description: "Rapid export-led growth establishes Japan as the 2nd largest global economy." },
      { year: "2011", event: "Great East Japan Earthquake", description: "Magnitude 9.0 earthquake, tsunami, and Fukushima nuclear disaster." }
    ],
    warsAndConflicts: ["First Sino-Japanese War", "Russo-Japanese War", "World War I", "World War II (Pacific War)"],
    geopoliticalAlliances: ["Quad", "G7", "OECD", "Apec", "US-Japan Security Treaty Alliance"],
    spaceAgency: "JAXA (Japan Aerospace Exploration Agency)",
    spaceMissions: ["Hayabusa 1 & 2 Asteroid Missions", "Kounotori ISS Cargo Shuttle", "SLIM (Smart Lander for Investigating Moon)"],
    militaryAdvancements: {
      jetPlanes: ["F-35A/B Lightning II (Assembly)", "Mitsubishi F-2", "F-X 6th Gen Fighter (GCAP with UK/Italy)"],
      navalPower: "Izumo-class Helicopter Destroyers (converted to carrier F-35Bs), Soryu-class Air-Independent Subs",
      keyTech: ["Aegis-equipped Destroyers", "Type 10 Main Battle Tank", "Type 03 Medium-Range Surface-to-Air Missile"]
    },
    majorTechExports: ["Automobiles (Toyota, Honda)", "Semiconductor Manufacturing Materials", "Industrial Robotics (Fanuc)", "Precision Optical Equipment", "Electronic Components (Sony)"]
  },
  BRA: {
    presidentOrPM: "Luiz Inácio Lula da Silva (President)",
    governmentType: "Federal Constitutional Presidential Republic",
    independenceDay: "September 7, 1822",
    nationalLanguage: "Portuguese",
    currencyName: "Brazilian Real (BRL)",
    coastlineLength: "7,491 km",
    mountainRanges: ["Serra do Espinhaço", "Serra do Mar", "Serra da Mantiqueira"],
    longestRivers: ["Amazon River", "Paraná River", "São Francisco River", "Tocantins River"],
    gdpGrowth5Years: [
      { year: 2021, gdpNominal: 1649, gdpGrowthRate: 4.8 },
      { year: 2022, gdpNominal: 1920, gdpGrowthRate: 3.0 },
      { year: 2023, gdpNominal: 2170, gdpGrowthRate: 2.9 },
      { year: 2024, gdpNominal: 2280, gdpGrowthRate: 2.2 },
      { year: 2025, gdpNominal: 2390, gdpGrowthRate: 2.0 }
    ],
    populationGrowth5Years: [
      { year: 2021, population: 214300000 },
      { year: 2022, population: 215300000 },
      { year: 2023, population: 216400000 },
      { year: 2024, population: 217300000 },
      { year: 2025, population: 218200000 }
    ],
    literacyRate: 93.5,
    povertyIndex: "24.1% (Under international poverty line of $6.85/day)",
    timeline: [
      { year: "1500", event: "Portuguese Arrival", description: "Pedro Álvares Cabral claims the territory of Brazil for Portugal." },
      { year: "1822", event: "Declaration of Independence", description: "Prince Dom Pedro declares independence, forming the Empire of Brazil." },
      { year: "1888", event: "Slavery Abolished", description: "Princess Isabel signs the Golden Law, freeing all remaining enslaved people." },
      { year: "1964-1985", event: "Military Dictatorship", description: "Coup installs authoritarian military regime; ended by democratic election." },
      { year: "2016", event: "Rio Olympics & Political Crisis", description: "Impeachment of President Dilma Rousseff during economic recession." }
    ],
    warsAndConflicts: ["Cisplatine War", "Platine War", "Paraguayan War", "World War II (Expeditionary Force in Italy)"],
    geopoliticalAlliances: ["BRICS", "Mercosur", "G20", "OAS"],
    spaceAgency: "AEB (Brazilian Space Agency)",
    spaceMissions: ["CBERS (China-Brazil Earth Resources Satellites)", "SCD-1 (Data Collecting Satellite)", "VLS-1 Launcher Dev"],
    militaryAdvancements: {
      jetPlanes: ["Saab JAS 39 Gripen NG (Assembly & Tech Transfer)", "Embraer KC-390 Millennium Cargo Jet", "AMX International ground-attack jet"],
      navalPower: "NAM Atlântico Multi-Purpose Aircraft Carrier, Riachuelo-class (Scorpène-based) Attack Subs",
      keyTech: ["PROSUB Nuclear Submarine Program (In Dev)", "ASTROS II Multiple Rocket Launcher", "IA2 Assault Rifle"]
    },
    majorTechExports: ["Commercial Aircraft (Embraer)", "Agricultural Machinery", "Automotive Parts", "Biofuels & Bioethanol Refining Tech", "Iron Ore & Soy Processing Machinery"]
  },
  CAN: {
    presidentOrPM: "Justin Trudeau (Prime Minister) & Mary Simon (Governor General)",
    governmentType: "Federal Parliamentary Constitutional Monarchy",
    independenceDay: "July 1, 1867 (Canada Day)",
    nationalLanguage: "English & French",
    currencyName: "Canadian Dollar (CAD)",
    coastlineLength: "202,080 km (Longest in the world)",
    mountainRanges: ["Rocky Mountains", "Laurentian Mountains", "Appalachians", "St. Elias Mountains"],
    longestRivers: ["Mackenzie River", "Yukon River", "St. Lawrence River", "Saskatchewan River"],
    gdpGrowth5Years: [
      { year: 2021, gdpNominal: 2001, gdpGrowthRate: 5.0 },
      { year: 2022, gdpNominal: 2161, gdpGrowthRate: 3.4 },
      { year: 2023, gdpNominal: 2140, gdpGrowthRate: 1.1 },
      { year: 2024, gdpNominal: 2240, gdpGrowthRate: 1.2 },
      { year: 2025, gdpNominal: 2340, gdpGrowthRate: 1.8 }
    ],
    populationGrowth5Years: [
      { year: 2021, population: 38220000 },
      { year: 2022, population: 38920000 },
      { year: 2023, population: 40090000 },
      { year: 2024, population: 40800000 },
      { year: 2025, population: 41500000 }
    ],
    literacyRate: 99,
    povertyIndex: "7.4% (Official Poverty Line)",
    timeline: [
      { year: "1867", event: "Confederation", description: "British North America Act creates the Dominion of Canada." },
      { year: "1917", event: "Battle of Vimy Ridge", description: "Canadian troops win a key victory in WWI, fostering a sense of nationhood." },
      { year: "1931", event: "Statute of Westminster", description: "British Parliament grants Canada legislative independence." },
      { year: "1982", event: "Patriation of Constitution", description: "Constitution Act signed by Queen Elizabeth II, adding the Charter of Rights." },
      { year: "2015", event: "Truth and Reconciliation Commission", description: "Releases final report on residential schools, addressing Indigenous history." }
    ],
    warsAndConflicts: ["War of 1812", "Boer War", "World War I", "World War II", "Korean War", "Gulf War", "Afghanistan War"],
    geopoliticalAlliances: ["NATO", "Five Eyes", "G7", "NORAD", "OECD", "Commonwealth"],
    spaceAgency: "CSA (Canadian Space Agency)",
    spaceMissions: ["Canadarm & Canadarm2 (ISS Space Shuttle robotics)", "RADARSAT Constellation", "James Webb Space Telescope Fine Guidance Sensor"],
    militaryAdvancements: {
      jetPlanes: ["CF-188 Hornet", "F-35A Lightning II (Procuring)"],
      navalPower: "Halifax-class Multi-Role Patrol Frigates, Victoria-class diesel-electric submarines",
      keyTech: ["TAPV (Tactical Armored Patrol Vehicle)", "LAV III Infantry Fighting Vehicle", "Active Phased Array radar tech"]
    },
    majorTechExports: ["Aerospace components (Bombardier)", "Telecommunication systems", "Environmental technologies", "Automobiles & Parts", "Nuclear reactors (CANDU)"]
  },
  AUS: {
    presidentOrPM: "Anthony Albanese (Prime Minister)",
    governmentType: "Federal Parliamentary Constitutional Monarchy",
    independenceDay: "January 1, 1901 (Federation)",
    nationalLanguage: "English (De facto)",
    currencyName: "Australian Dollar (AUD)",
    coastlineLength: "25,760 km",
    mountainRanges: ["Great Dividing Range", "Blue Mountains", "MacDonnell Ranges", "Snowy Mountains"],
    longestRivers: ["Murray River", "Darling River", "Murrumbidgee River", "Lachlan River"],
    gdpGrowth5Years: [
      { year: 2021, gdpNominal: 1552, gdpGrowthRate: 4.9 },
      { year: 2022, gdpNominal: 1693, gdpGrowthRate: 3.7 },
      { year: 2023, gdpNominal: 1720, gdpGrowthRate: 2.1 },
      { year: 2024, gdpNominal: 1780, gdpGrowthRate: 1.5 },
      { year: 2025, gdpNominal: 1840, gdpGrowthRate: 1.8 }
    ],
    populationGrowth5Years: [
      { year: 2021, population: 25680000 },
      { year: 2022, population: 26000000 },
      { year: 2023, population: 26630000 },
      { year: 2024, population: 27100000 },
      { year: 2025, population: 27500000 }
    ],
    literacyRate: 99,
    povertyIndex: "13.4% (Relative poverty line)",
    timeline: [
      { year: "1788", event: "First Fleet Arrival", description: "Captain Arthur Phillip establishes British penal colony in Sydney." },
      { year: "1901", event: "Federation of Australia", description: "Six British colonies unite to form the Commonwealth of Australia." },
      { year: "1915", event: "Gallipoli Campaign", description: "ANZAC forces land in Turkey during WWI, creating the ANZAC legend." },
      { year: "1986", event: "Australia Act", description: "Formally severs legal ties and appeals from Australian courts to UK Privy Council." },
      { year: "2008", event: "National Apology to Stolen Generations", description: "PM Kevin Rudd apologizes to Indigenous Australians for past forced child removals." }
    ],
    warsAndConflicts: ["World War I", "World War II (Pacific theatre)", "Korean War", "Vietnam War", "Gulf War", "War in Afghanistan"],
    geopoliticalAlliances: ["AUKUS", "Quad", "Five Eyes", "ANZUS", "G20", "Commonwealth of Nations"],
    spaceAgency: "ASA (Australian Space Agency)",
    spaceMissions: ["Canberra Deep Space Communication Complex", "Spire Global Satellite Collaborations", "Binar Space Program"],
    militaryAdvancements: {
      jetPlanes: ["F/A-18F Super Hornet", "F-35A Lightning II", "EA-18G Growler electronic warfare jet"],
      navalPower: "Hobart-class Air Warfare Destroyers, Collins-class submarines (AUKUS Nuclear sub program in dev)",
      keyTech: ["AUKUS Nuclear Submarine Technology", "Jindalee Operational Radar Network (JORN)", "Bushmaster Protected Mobility Vehicle"]
    },
    majorTechExports: ["Mining & Resource Exploration Tech", "Medical devices (Cochlear Implants)", "Agricultural biotech", "Scientific instrumentation", "Defense systems (Nulka decoy)"]
  }
};

export function getFallbackSpecializedData(isoA3: string, countryName: string): SpecializedData {
  // Simple seed generator based on ISO string code
  const seed = isoA3.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const isDeveloping = seed % 3 === 0;
  
  const mountainOptions = [
    ["Central Mountain Range", "Highland Ridges"],
    ["Northern Hills", "Eastern Escarpment"],
    ["Southern Andes Slopes", "Coastal Cordillera"],
    ["Alpine Highlands", "Plateau Ranges"]
  ];
  
  const riverOptions = [
    ["Great River", "Silver Stream"],
    ["Green River", "Blue Danube Branch"],
    ["Highland Stream", "Delta Tributary"],
    ["Northern Rapids", "Valley Flow"]
  ];
  
  const warOptions = [
    ["Border Conflicts", "Historical Independence Battles"],
    ["Regional Stability Campaigns", "World War Support Missions"],
    ["Decolonization Struggles", "Allied Coalition Deployments"]
  ];

  const techOptions = [
    ["Agricultural Automation", "Food Tech"],
    ["Industrial Materials", "Textile Manufacturing Tech"],
    ["Software Outsourcing", "Local App Frameworks"],
    ["Renewable Grid Tech", "Biomass Processing"]
  ];

  return {
    presidentOrPM: `Dr. Julian Vance (President / Prime Minister)`,
    governmentType: isDeveloping ? "Unitary Parliamentary Democratic Republic" : "Constitutional Representative Democracy",
    independenceDay: `October ${12 + (seed % 15)}, ${1850 + (seed % 100)}`,
    nationalLanguage: `Local Official Language (${isoA3})`,
    currencyName: `Local Currency (${isoA3}D)`,
    coastlineLength: `${(seed * 7) % 5000} km`,
    mountainRanges: mountainOptions[seed % mountainOptions.length],
    longestRivers: riverOptions[seed % riverOptions.length],
    gdpGrowth5Years: [
      { year: 2021, gdpNominal: 50 + (seed % 300), gdpGrowthRate: 3.5 + (seed % 4) },
      { year: 2022, gdpNominal: 52 + (seed % 300), gdpGrowthRate: 1.2 + (seed % 3) },
      { year: 2023, gdpNominal: 55 + (seed % 300), gdpGrowthRate: 4.1 + (seed % 2) },
      { year: 2024, gdpNominal: 58 + (seed % 300), gdpGrowthRate: 2.8 + (seed % 3) },
      { year: 2025, gdpNominal: 61 + (seed % 300), gdpGrowthRate: 3.0 + (seed % 2) }
    ],
    populationGrowth5Years: [
      { year: 2021, population: 10000000 + (seed * 150000) },
      { year: 2022, population: 10100000 + (seed * 150000) },
      { year: 2023, population: 10210000 + (seed * 150000) },
      { year: 2024, population: 10300000 + (seed * 150000) },
      { year: 2025, population: 10400000 + (seed * 150000) }
    ],
    literacyRate: 85 + (seed % 15),
    povertyIndex: isDeveloping ? "15.4% (Multidimensional Index)" : "4.8% (Under national index)",
    timeline: [
      { year: `${1800 + (seed % 100)}`, event: "Founding Era", description: "Establishment of the primary sovereign borders and constitutional framework." },
      { year: "1914-1918", event: "WWI Support", description: "Provided vital resources, materials, and support to allied forces." },
      { year: `${1940 + (seed % 40)}`, event: "Modern Development Era", description: "Significant infrastructure projects launch a new wave of urban development." },
      { year: "2015", event: "National Technological Expansion", description: "Implementation of country-wide fiber networks and high-speed internet access." }
    ],
    warsAndConflicts: warOptions[seed % warOptions.length],
    geopoliticalAlliances: ["United Nations (UN)", "World Trade Organization (WTO)", "Regional Economic Union"],
    spaceAgency: `National Space Directorate of ${countryName}`,
    spaceMissions: ["Telecommunication Satellites", "Joint Scientific CubeSats"],
    militaryAdvancements: {
      jetPlanes: ["Light Patrol Aircraft", "Multi-Role Tactical Jets"],
      navalPower: "Coastal Guard Patrol Fleet, Offshore Patrol Cutters",
      keyTech: ["Tactical Communications", "Advanced Radar Systems", "Unmanned Surveillance Drones"]
    },
    majorTechExports: techOptions[seed % techOptions.length]
  };
}
