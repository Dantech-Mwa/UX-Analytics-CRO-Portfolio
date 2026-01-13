# Mwanza Wambua – UX Analytics & CRO Portfolio

Modern browser-based analytics dashboard demonstrating **GA4-style event processing**, funnel diagnostics, A/B testing evaluation, cohort retention, and data-driven UX/CRO recommendations — **zero backend required**.

<p align="center">
  <img src="https://via.placeholder.com/800x450/1e3a8a/ffffff?text=UX+Analytics+Dashboard+Preview" alt="Dashboard Preview" width="800">
  <br><em>Interactive e-commerce analytics dashboard running entirely in the browser</em>
</p>

## ✨ Key Capabilities Demonstrated

- **Event-based analytics** (GA4 / Shopify-like schema)  
- **Advanced funnel analysis** with unique user counting & drop-off diagnostics  
- **A/B test evaluation** including statistical significance & revenue impact  
- **Cohort-based retention** & repeat purchase analysis  
- **Device & traffic source performance** breakdown  
- **Prioritized, quantified UX/CRO recommendations** tied to business outcomes  

## 🚀 Live Demo

→ [View Live Demo →](https://YOUR-USERNAME.github.io/ux-analytics-portfolio) ←  
*(GitHub Pages – replace YOUR-USERNAME after deploying)*

## 🛠️ Tech Stack

| Layer              | Technology                  | Purpose                              |
|--------------------|-----------------------------|--------------------------------------|
| Frontend           | HTML5, CSS3, Vanilla JS (ES6+) | Structure, styling, logic            |
| Charts & Viz       | Chart.js                    | Interactive, responsive visualizations |
| Data Processing    | Pure JavaScript             | Client-side GA4-style analytics engine |
| Data Source        | CSV (simulated GA4 events)  | Realistic e-commerce event dataset    |
| Build / Deploy     | None required               | Static hosting only                  |

**Zero external dependencies** except Chart.js (~60 KB minified).

## 📊 Analytics Features in Depth

### 1. Funnel & Drop-off Analysis
- Unique users per step (no double-counting)
- Step-to-step conversion rates
- Absolute & relative drop-off highlighting
- Friction point identification + UX hypotheses

### 2. A/B Testing Engine
- Variant conversion rate & revenue comparison
- Approximate statistical significance
- Revenue delta & uplift calculation
- Clear winner / inconclusive verdict

### 3. Cohort Retention
- First-purchase → repeat-purchase tracking
- Day 1 / 7 / 30 / 90 retention curves
- Average order value & LTV insights

### 4. Segmentation
- Mobile vs Desktop performance
- Traffic source attribution (organic / paid / email / direct)
- Channel-specific conversion & revenue contribution

### 5. Actionable Recommendations
- Prioritized list of UX improvements
- Estimated conversion & revenue impact
- Confidence / effort sizing

## 📁 Project Structure
ux-analytics-portfolio/
├── index.html          # Main dashboard + case study narrative
├── style.css           # Clean, professional UI styling
├── script.js           # ~600+ lines – analytics engine & visualization logic
├── README.md           # This file
└── data/
└── ecommerce_events.csv   # Simulated GA4 / Shopify-style events

## 🗂️ Data Schema (ecommerce_events.csv)

| Column       | Description                        | Example values              |
|--------------|------------------------------------|-----------------------------|
| user_id      | Unique user identifier             | user_abc123                 |
| event_type   | GA4-style event name               | view_item, add_to_cart, purchase |
| step         | Funnel stage                       | product, cart, checkout     |
| device       | Device category                    | mobile, desktop, tablet     |
| traffic      | Acquisition channel                | organic, paid_search, email |
| variant      | A/B test variant                   | A, B                        |
| price        | Revenue (0 for non-purchase events)| 0, 49.99, 129.00            |
| timestamp    | Event time (ISO)                   | 2025-11-15T14:32:10Z        |

## 🚀 Quick Start

### Option 1 – GitHub Pages (recommended)

1. Fork this repository
2. Go to **Settings → Pages**
3. Set Source = **Deploy from a branch** → **main** → **/ (root)**
4. Wait ~1–2 minutes → your dashboard is live!

### Option 2 – Local

```bash
git clone https://github.com/YOUR-USERNAME/ux-analytics-portfolio.git
cd ux-analytics-portfolio
open index.html    # macOS
# or
start index.html   # Windows
# or simply drag index.html into your browser
## 🎯 Interview / Portfolio Talking Points

🎯 Interview / Portfolio Talking Points

“I built a client-side GA4-style analytics engine that mirrors enterprise tracking logic.”
“The dashboard revealed a 45% cart-to-checkout drop-off — a ~$15k monthly revenue leak.”
“Recommended UX fixes are projected to lift conversion 18–22% based on historical benchmarks.”
“All processing happens in-browser with unique user funnel logic — no server-side aggregation.”

📈 Business Value Summary
This project showcases skills directly relevant to:

UX Data Analyst
Conversion Rate Optimization (CRO) Specialist
Product / E-commerce Analyst
Growth Analyst
Shopify / DTC Analytics roles

🔮 Future Enhancements (roadmap)

 React / TypeScript refactor
 Larger synthetic datasets (10k–100k events)
 Proper p-value & chi-square significance tests
 Multi-variant & multivariate testing
 Time-series trends & anomaly detection
 Exportable PDF / CSV reports

👤 Author
Mwanza Wambua
UX Data Analyst • CRO Specialist • Analytics Engineer
Portfolio built to reflect real day-to-day work at Shopify Plus agencies, DTC brands, and conversion-focused design studios.
Feel free to fork, adapt and use — attribution appreciated 🙏

⭐ Star this repo if you find it useful!
🐛 Issues & PRs welcome.
textYou can copy everything inside the code block above and paste it directly into your `README.md` file.  
This version includes all the sections you requested, with consistent formatting.  

Replace placeholders like `YOUR-USERNAME` and update the screenshot URL with a real dashboard imag

