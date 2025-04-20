# CareConnect – Centralized Volunteer Management Platform

**CareConnect** is a volunteer management system built to support community-focused organizations like **NAMI Yolo**. It helps nonprofits recruit, onboard, train, and schedule volunteers with ease. The platform is built for accessibility, especially for organizations currently managing data across multiple spreadsheets and forms.

This submission includes:
- A dynamic **web dashboard** for real-time visual insights into volunteer trends.
- A reproducible **Google Colab notebook** for static data visualizations. (OpenData Hack)
- A publicly accessible dataset used to simulate real-world volunteer data.

---

## Why CareConnect?

Many mental health and nonprofit organizations rely on **manual, spreadsheet-based workflows** for managing volunteers. This makes it hard to:
- Track training completions and event history
- Match volunteers with relevant tasks
- Analyze community engagement patterns

CareConnect replaces this with an **intuitive platform** accessible to **non-technical staff** and optimized for **social impact**. It centralizes data and empowers admins to make informed decisions through both real-time dashboards and AI-driven insights (planned).

---

## Hackathon Tracks Alignment

This project was submitted to multiple tracks of HackDavis 2025, including:

- **Best Hack for Social Good** – Solving volunteer management for nonprofits like NAMI Yolo
- **Open Data Hack** – Uses a public dataset for static and dynamic visualizations
- **NAMI Yolo Challenge** – Specifically built around their current spreadsheet-based limitations
- **Best Use of Auth0** – Role-based access and authentication
- **Best Use of Cerebras API** – Project is using Cerebras API
- **Hackers' Choice Award**

---

## Open Data Hack Track: Dataset & Visualizations

We did not have access to UC Davis-specific datasets, so we used a **publicly available Kaggle dataset** of NYC volunteer opportunities, which closely mirrors UC Davis volunteer activities.

UC Davis or similar institutions can easily adapt CareConnect for:
- Matching students with on-campus jobs or volunteering roles
- Visualizing department-wise participation
- Making data-driven decisions for outreach and equity

### Static Visualizations

We provide a Python-based notebook for reproducible, high-quality charts submitted as part of the Open Data Hack track.

**Includes:**
- Heatmaps
- Category trends
- Borough distributions
- Volunteer request summaries


## Static Visualizations (Google Colab)

These are quick, high-quality summary charts and heatmaps built using Python and matplotlib/seaborn. They help identify:

- Daily volunteer activity trends
- Event types distribution (ongoing vs one-time)
- Borough-wise event density
- Monthly growth across volunteer categories
- Summary statistics (events, volunteers, categories, etc.)

> These are intended for **Open Data Hack** submission as reproducible and static visuals.

---

### How to Run Static Visuals in Google Colab

1. Go to [Google Colab](https://colab.research.google.com/drive/1z8Si88MyFYqJZEVZd1DoaN_73hOLLA6H?usp=sharing).
2. Upload the dataset file:  
   [`nyc-service-volunteer-opportunities.csv`](https://www.kaggle.com/datasets/tylerx/nyc-volunteer-opportunities)  
3. Upload the Python notebook or paste the script.
4. Run each cell one by one.
5. Download the generated `.png` files.

📁 Output files:
- `summary_stats.png`
- `activity_heatmap.png`
- `category_trends.png`
- `borough_distribution.png`
- `event_types.png`

---

## Dynamic Dashboard Web App

Built with **React.js** and **Chart.js**, this live dashboard allows:
- 🔎 Interactive filtering by `Borough` and `Category`
- 📅 Heatmap of activity like GitHub contribution graph
- 📊 Live bar and line charts updating with filters
- 🧠 Insight into trends for policy-makers or civic leaders

> This version is ideal for embedding into platforms that track community engagement or helping organizations make **data-driven volunteer planning** decisions.

---

### Tech Stack

| Component        | Technology Used      |
|------------------|----------------------|
| Frontend         | React.js, Chart.js, TailwindCSS |
| Backend/API      | Node.js + Express (CSV served as API) |
| Static Charts    | Python, Pandas, Matplotlib, Seaborn |
| Dataset Source   | [NYC Open Data on Kaggle](https://www.kaggle.com/datasets/tylerx/nyc-volunteer-opportunities) |

---

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/shahchayan9/CareConnect.git
cd CareConnect
```

2. **Install Dependencies**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Environment Setup**
```bash
# Create .env file in server directory
cp server/.env.example server/.env

# Update the following variables in .env:
AUTH0_DOMAIN=your-auth0-domain
AUTH0_AUDIENCE=your-auth0-audience
```

4. **Start Development Servers**
```bash
# Terminal 1 - Start backend server
cd server
npm start

# Terminal 2 - Start frontend development server
cd client
npm start
```

5. **Access the Application**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5001`

---

## Data Schema

The visualizations process the following key fields from the dataset:

| Field           | Description                          | Usage in Visualizations           |
|-----------------|--------------------------------------|-----------------------------------|
| `category_desc` | Event category description           | Category filtering and trends     |
| `Borough`       | NYC borough location                 | Geographic distribution           |
| `created_date`  | Event creation date                  | Time-based analysis and heatmap   |
| `vol_requests`  | Number of volunteers requested       | Demand analysis and statistics    |
| `recurrence_type`| Event type (one-time/ongoing)       | Event type distribution           |

---

## Usage Scenarios

- 📍 Identify under-served boroughs or neighborhoods
- 📅 Find seasonal spikes in volunteering (e.g., holidays)
- 🧑‍🏫 Determine student departments with highest participation (if adapted to UC Davis)
- 🤝 Guide nonprofits in launching more balanced opportunities

---

## Future Work

- Add map-based visualization using `latitude/longitude`
- Enable CSV upload for other datasets like UC Davis
- Enable volunteer recommendation and skill matching
- Add export functionality for reports and insights
- Implement user authentication and role-based access
- Add real-time data updates and notifications

---

## Submission

This project is submitted for:

- **HackDavis 2025 – Open Data Hack (Social Good Track)**
- By: Team CareConnect

---


## Acknowledgments

- NYC Open Data for providing the volunteer opportunities dataset
- HackDavis organizers for the opportunity
- Open source community for the amazing tools and libraries

