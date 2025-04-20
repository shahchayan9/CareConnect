# 🗽 CommunityCare NYC – Volunteer Opportunity Insights

This project presents both **static and dynamic visualizations** of New York City volunteer opportunities to support **social good initiatives**. Built for the **HackDavis Open Data Hack**, it helps explore when, where, and how communities engage in volunteer work.

---

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
git clone https://github.com/yourusername/CommunityCare.git
cd CommunityCare
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
- By: Rutuja Nemane and team

---

## Questions?

Feel free to reach out for collaborations or demo access!

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- NYC Open Data for providing the volunteer opportunities dataset
- HackDavis organizers for the opportunity
- Open source community for the amazing tools and libraries

