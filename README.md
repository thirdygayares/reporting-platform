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

<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/8e917857-3c51-4aae-841b-10c8f5cb7d04" />

### 1. add .env to the root file 
```
META_ACCESS_TOKEN= {Get from meta app}
AD_ACCOUNT_ID= {Get from meta app}
SERVICE_ACCOUNT_FILE= {ex.thirdygayares2-21175b35d9f4.json get from google console and allowed google analytics API and google search console API} 
```
### 2. add SERVICE_ACCOUNT_FILE to the root file 

---




## POWERBI Visual Demonstration

![Summary](https://github.com/user-attachments/assets/90ac6ef4-3750-4fa4-8cb5-5c465fd9bc36)

Displays first values for **account info**, **spend**, **reach**, **impressions**, and **user engagement**.

---

![GA4-Chart](https://github.com/user-attachments/assets/77caba81-2510-49c3-9045-1a17a0f9d9d6)

Tracks daily performance: new users, active users, engaged sessions, sessions, etc. Useful for spotting trends and drop-offs.

---

![GSC Chart](https://github.com/user-attachments/assets/9cf8836b-e8c4-48c6-b256-ca60085fd5ca)

Visualizes **search visibility**, **impressions**, **CTR**, and **average position** over time. Great for SEO insights.

---



## API Endpoints (Public)

The following endpoints expose analytics data in JSON format from Meta, GA4, and GSC.

These are served by a FastAPI backend hosted at:

> https://reporting-platform.thirdygayares.com

---

### Meta Ads Endpoint

**GET:**  

https://reporting-platform.thirdygayares.com/api/analytics/facebook-ads


**Returns:**  
Basic ad account info with ad spend, impressions, reach, and frequency.

![image](https://github.com/user-attachments/assets/7bb5ac18-7c13-46f5-9cce-02d1c4c6af33)

---

### Google Analytics 4 (GA4) Endpoint

**GET:**

https://reporting-platform.thirdygayares.com/api/analytics/ga4-data


**Returns:**
User engagement metrics per day.

![image](https://github.com/user-attachments/assets/bf329fe6-589e-4a56-9092-c092a2bd3faa)

---

###  Google Search Console (GSC) Endpoint

**GET:**


https://reporting-platform.thirdygayares.com/api/analytics/gsc-data


**Returns:**
Daily search performance including impressions, CTR, and ranking position.

![image](https://github.com/user-attachments/assets/e39d09b1-ca81-4265-89f0-334cefff11c0)



