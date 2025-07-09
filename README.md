# Reporting Platform – GA4, GSC, and Meta API Integration

##  Project Overview

This project is a **centralized reporting platform** that pulls data from the following sources using Python and FastAPI:

- **Google Analytics 4 (GA4)** – for user and session engagement metrics
- **Google Search Console (GSC)** – for search performance insights
- **Meta (Facebook Ads)** – for ad performance metrics

All data is fetched using **official APIs**, and no paid connectors or third-party services are used.  
A sample Power BI report (`.pbit`) is provided to visualize and interact with the data.

---

## Features

| Source      | Metrics Included                                                             |
|-------------|--------------------------------------------------------------------------------|
| GA4         | New Users, Active Users, Total Users, Sessions, Engaged Sessions, Engagement Rate |
| GSC         | Impressions, Clicks, CTR, Average Position                                    |
| Meta Ads    | Impressions, Reach, Ad Spend, Link Clicks, CTR                                |

---

## How to Run (Python + FastAPI)

**ONGOING DOCUMENTATION**  


## POWERBI Visual Demonstration

![Summary](https://github.com/user-attachments/assets/90ac6ef4-3750-4fa4-8cb5-5c465fd9bc36)

Displays first values for **account info**, **spend**, **reach**, **impressions**, and **user engagement**.

---

![GA4-Chart](https://github.com/user-attachments/assets/77caba81-2510-49c3-9045-1a17a0f9d9d6)

Tracks daily performance: new users, active users, engaged sessions, sessions, etc. Useful for spotting trends and drop-offs.

---

![GSC Chart](https://github.com/user-attachments/assets/9cf8836b-e8c4-48c6-b256-ca60085fd5ca)

Visualizes **search visibility**, **impressions**, **CTR**, and **average position** over time. Great for SEO insights.
