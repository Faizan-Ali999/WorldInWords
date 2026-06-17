<div align="center">

# 🌍 WorldInWords

### Interactive World Explorer & Geopolitical Dashboard

WorldInWords is a fully responsive, highly interactive, cyberpunk-styled world map application built to visualize real-time global data, geopolitical history, and socioeconomic metrics. Instead of scanning spreadsheets, users interact with a glowing, dynamic globe.

[![Live Demo](https://img.shields.io/badge/Demo-Live_Vercel_Link-000000?style=for-the-badge&logo=vercel)](https://your-vercel-link.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)


</div>
<img width="1280" height="720" alt="Sample-WorldInWords" src="https://github.com/user-attachments/assets/7de24f72-c3a5-4561-a4f5-ba575dc73230" />
---

## ✨ Why WorldInWords?

This flagship data visualization tool makes exploring global metrics intuitive and visually stunning:

* **🗺️ Interactive Map UI:** Fully draggable, zoomable map with dynamic glowing hover states and custom tooltips for every nation.
* **⚡ Live Data Integrations:** A hybrid data architecture combining RESTful API fetches (World Bank, OpenWeatherMap) with a custom JSON database for high-speed delivery.
* **📊 Multi-Dimensional Dashboards:** Click any country to reveal a 5-tab breakdown of Politics, Live Climate, Socio-Economics (with 5-year trend charts), History, and Aerospace Tech.
* **⚖️ Compare Mode:** Select two nations to instantly contrast their metrics in a split-screen data table.

---

## 🛠️ Architecture & Tech Stack

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS + Framer Motion
* **Map Rendering:** React-Simple-Maps utilizing optimized GeoJSON boundaries
* **UI Components:** Shadcn/ui & Lucide React Icons
* **Data Visualization:** Recharts

<details>
<summary><strong>📡 View API Integrations</strong></summary>

* **REST Countries API (v5):** Core demographic and political data.
* **World Bank API:** Real-time socioeconomic metrics (GDP, Literacy, Poverty).
* **OpenWeatherMap API:** Live capital city climate data.
* **Custom Mock-DB:** Specialized historical conflicts, aerospace missions, and military tech data.

</details>

---

## 🚀 Quick Start (Local Development)

To run this project on your local machine and explore the map, follow these steps:

### 1. Clone & Install
```bash
git clone https://github.com/Faizan-Ali999/WorldInWords.git
cd WorldInWords
npm install
```
### 2. Configure Environment Variables
You will need API keys for the live weather and country data to render correctly. Create a .env.local file in the root directory:

```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
NEXT_PUBLIC_WORLD_BANK_KEY=open_access_no_key_required
NEXT_PUBLIC_REST_COUNTRIES_KEY=your_rest_countries_api_key
```

### 3. Launch the Server
``` Bash
npm run dev
Open http://localhost:3000 with your browser to explore the map.
# (Note: If port 3000 is already in use, your terminal will display a different port number, such as 3001).
```

---

### 🤝Technical Challenges & UX Decisions
**Performance Optimization:** Rendering high-fidelity GeoJSON data for the entire world can cause heavy DOM lag. This was mitigated by optimizing the GeoJSON file size and utilizing Next.js server components where appropriate to keep the client-side map rendering incredibly fast.

**API Rate Limiting:** Because the app pulls from three separate live APIs when a user clicks a country, a custom caching utility was built to prevent redundant network requests and avoid hitting free-tier API rate limits.

**Aesthetic Continuity:** Ensuring the dark-mode/cyberpunk aesthetic remained legible required strict adherence to a high-contrast Tailwind color palette, particularly within the Recharts data visualizations.
