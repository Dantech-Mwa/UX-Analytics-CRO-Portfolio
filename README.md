# Mwanza Wambua - UX Analytics & CRO Portfolio

## Overview

This portfolio demonstrates advanced UX Analytics and Conversion Rate Optimization capabilities through a fully functional, browser-based analytics dashboard. It simulates real-world GA4/Shopify event data processing to showcase data-driven UX decision-making in e-commerce contexts.

## Live Demo

The portfolio runs entirely in the browser and can be hosted on GitHub Pages or any static hosting service. No backend or database required.

## Capabilities Demonstrated

### 1. **Event-Based Analytics (GA4 Model)**
   - Simulates GA4/Shopify event schema
   - User-level tracking for accurate attribution
   - Event parameter structure matching industry standards

### 2. **Funnel Analysis & Drop-off Diagnostics**
   - Unique user counting per funnel step
   - Step-to-step conversion rate calculation
   - Critical drop-off point identification
   - UX friction point analysis

### 3. **A/B Testing Evaluation**
   - Variant performance comparison
   - Statistical significance assessment
   - Revenue impact calculation
   - Clear winner determination

### 4. **Cohort Retention Analysis**
   - Repeat customer identification
   - Retention rate calculation
   - Customer lifetime value insights
   - Loyalty pattern analysis

### 5. **Device & Traffic Performance**
   - Mobile vs desktop conversion comparison
   - Traffic source attribution
   - Channel-specific optimization recommendations

### 6. **Data-Driven UX Recommendations**
   - Actionable insights based on analytics
   - Priority-based recommendations
   - Expected impact quantification

## Technical Architecture

### Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Visualization**: Chart.js for interactive charts
- **Data Source**: Simulated CSV event data (GA4/Shopify schema)
- **Architecture**: Modular, enterprise-style JavaScript classes

### Key Features
- 100% client-side execution
- No external dependencies beyond Chart.js
- Responsive design for all devices
- Professional, consulting-style dashboard UI
- Interactive data visualization
- Real-time metric updates

## How to Run

### Option 1: GitHub Pages (Recommended)
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Access at `https://[your-username].github.io/ux-analytics-portfolio`

### Option 2: Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ux-analytics-portfolio.git
Open index.html in a modern web browser

No build process or installation required

Option 3: Custom Hosting
Upload all files to any static hosting service (Netlify, Vercel, AWS S3, etc.)

File Structure
text
ux-analytics-portfolio/
├── index.html              # Main dashboard & case study
├── style.css               # Professional dashboard styling
├── script.js               # Core analytics engine (600+ lines)
├── README.md              # This documentation
└── data/                  # Data source directory (simulated)
    └── ecommerce_events.csv # GA4-style event data
Data Schema
The portfolio uses a GA4/Shopify-compatible event schema:

Column	Description	Example
user_id	Unique user identifier	user_123
event_type	Event category	view, add_to_cart, purchase
step	Funnel step	product, cart, checkout
device	User device	mobile, desktop
traffic	Traffic source	organic, paid, email
variant	A/B test variant	A, B
price	Revenue value	99.99 (0 for non-purchase events)
Analytics Methodology
1. Funnel Calculation
Uses unique users per step (prevents double-counting)

Matches enterprise analytics platform logic

Calculates step-to-step conversion rates

2. Drop-off Analysis
Identifies percentage loss between steps

Highlights critical friction points

Provides UX improvement opportunities

3. A/B Testing Logic
Conversion rate comparison

Revenue impact assessment

Confidence level estimation

Clear implementation recommendations

4. Cohort Analysis
Repeat purchase tracking

Retention rate calculation

Customer loyalty insights

Portfolio Value Proposition
This portfolio demonstrates the exact skills needed for:

UX Data Analyst roles

CRO Specialist positions

E-commerce Analyst jobs

Product Analytics careers

Specifically, it shows:

Technical implementation of analytics systems

Data storytelling and visualization

Experimentation design and evaluation

Business impact communication

Stakeholder-ready reporting

Interview Talking Points
When presenting this portfolio:

Start with Business Context

"This dashboard solves the problem of identifying UX friction points in e-commerce funnels and quantifying their revenue impact."

Explain the Analytics Architecture

"I built a GA4-style event processing system that tracks user-level behavior across the entire customer journey."

Highlight Key Insights

"The data revealed a 45% drop-off between cart and checkout, representing a $15,000 monthly revenue opportunity."

Connect to Business Outcomes

"Based on this analysis, I recommended specific UX changes expected to increase conversion by 18% and generate $27,000 in additional monthly revenue."

Discuss Methodology

"The A/B test evaluation uses statistical significance estimation, and the funnel analysis prevents double-counting through unique user tracking."

Author
Mwanza Wambua
UX Data Analyst & CRO Specialist
Portfolio designed for enterprise analytics roles

License
This portfolio is available for personal and professional use. Attribution to Mwanza Wambua is appreciated when sharing or adapting.

Future Enhancements
Planned upgrades (see detailed documentation):

React.js conversion for component-based architecture

Larger, more complex datasets

Advanced statistical significance calculations

Multi-variant testing (A/B/C)

Time-series trend analysis

Machine learning integration for prediction

This portfolio represents professional-grade analytics implementation. It mirrors the exact work performed in UX Analytics and CRO roles at companies like Anatta Design, Shopify Plus agencies, and direct-to-consumer brands.
