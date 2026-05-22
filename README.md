# solarityy

[![Framework: React](https://img.shields.io/badge/framework-React_18-18181f?style=flat-square)](https://react.dev/)
[![Build: Vite](https://img.shields.io/badge/build-Vite_5-18181f?style=flat-square)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/license-MIT-18181f?style=flat-square)](LICENSE)

A modern solar energy analytics, system sizing, and financial ROI telemetry dashboard built with React 18 and Vite.

## Overview

solarityy provides homeowners and engineers with precise solar photovoltaic system estimations. By processing location-specific solar irradiance data, roof dimensions, and household energy consumption metrics, the application computes optimal panel configurations, seasonal energy yields, net grid export earnings, and long-term financial payback schedules.

## Key Capabilities

- Geographic solar irradiance modeling and estimated kilowatt-hour (kWh) annual generation.
- Dynamic financial amortization schedules covering panel degradation, tariff inflation, and net ROI across a 25-year lifecycle.
- Interactive time-series energy generation charts and cost breakdown visualizations.
- Fully responsive, high-performance client-side application bundled with Vite and styled with Tailwind CSS.

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Data Visualization:** Recharts
- **Icons & UI:** Lucide React, clsx, tailwind-merge
- **HTTP Client:** Axios

## Usage

```bash
# Clone and install dependencies
git clone https://github.com/innocous06/solarityy.git
cd solarityy
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Photovoltaic Calculation Engine

- **Solar Insolation:** Annual peak sun hours estimation based on latitude coordinates.
- **System Efficiency:** Factored 15% system loss (soiling, inverter loss, wire resistance).
- **Financial Amortization:** 25-year compounding grid tariff inflation vs capital expense payback period.

## License

Released under the [MIT License](LICENSE).

Copyright (c) 2026 innocous06. All rights reserved.
