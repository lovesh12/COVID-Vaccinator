# COVID Vaccinator

This project is being made under the Hackathon challenge by Elite Coders Compete September 2021.

## Theme of the project
### Health Care
Complete All-in-one solution consolidated in a single mobile app/ web app through which
people can track, manage, and get reminders for their vaccine slots

## Features
### General Information and awareness about vaccination
- Convincing words
- Steps for getting vaccinated
- Immunization proccess explained
- Frequently asked questions

### Search Vaccination Center
- By District and State
- By Pincode
- Quick Find Near me
- Google Map
- With available filters like
    - Age
    - Cost
    - Vaccine type
    - Timings
- Center List with following features
    - 1 week session list from today with available doses count
    - Shortcut button to set a reminder for a particular session
    - Notify me for notification when a particular session will be available

### Various statistics related to vaccination
- Vaccinations done by today
    - Total
    - Partial
    - Fully
- Vaccination doses
    - Total
    - Dose 1
    - Dose 2
- Charts with categories to toggle
    - Gender
    - Vaccine Type
    - Age
- State wise list of vaccinations done
    - Total
    - Today
- State and District wise available filters

### User Account
- View and Set your vaccination status
- Download vaccination certificate

- Reminders for vaccination slots
    - Manage Reminders
    - Telegram and SMS Reminders

## Implementation

The implementation was carried out in following steps and sequence

Type  | Step | Description | Status
------------- | ------------- | ------------- | -------------
Setup  | 1 | Front End : React<br>Backend: Nodejs<br>DBMS: MongoDB | Completed
UI/UX | 2 | Initial UI components | Completed
Backend | 3 | Account Login | Completed
Backend | 4 | Manage Doses | Completed
Feature | 5 | Statistics | Completed
Feature | 6 | Search Vaccine with District | Completed
Feature | 7 | Search Vaccine By Pincode | Completed
Feature | 8 | Search Vaccine By Map | Pending
Feature | 9 | Filters on Search Vaccine | Completed
Feature | 10 | Manage Reminders | Completed
Feature | 11 | Certificate generation | Completed
Feature | 12 | Quick Find Near Me | Completed
Feature | 13 | Activate footer | Completed
Data | 14 | Add FAQs and Home page data | Completed

## Pre Requisites
- Google API - Login using google
- Cowin API - Get center/statistics data
- Telegram API - To send telegram reminders
- Vonage API - To send SMS reminders

## Build and run the project
```
npm run build
npm start
```

## API Endpoint for scanning reminders instantly
- (normally it scans every 5 hours)

```
POST /triggerScanReminders
body (JSON): {"trigger": true}
```


## Technologies
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white) ![WebStorm](https://img.shields.io/badge/webstorm-143?style=for-the-badge&logo=webstorm&logoColor=white&color=black) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

# Contributors
### [Lovesh Verma](https://github.com/lovesh12)
### [Luckshya Verma](https://github.com/Luckshya)

## Screenshots
### Home Page
![Home Page](https://i.imgur.com/8VtHDbb.png "Home Page")

### Search Vaccine
#### By District
![](https://imgur.com/OhDXfJv.png)
![](https://imgur.com/5cWgr6V.png)

#### On Map
![](https://imgur.com/eIMFcNH.png)

### Statistics
![](https://imgur.com/OhDXfJv.png)

#### Charts
![](https://imgur.com/YJNuwUQ.png)

### Account Login
![](https://imgur.com/dr6nODy.png)

### Manage Doses
![image](https://user-images.githubusercontent.com/24871407/136822254-b0ebae66-33bb-4087-a8fe-94937748bc04.png)

### Manage Certificates
![image](https://user-images.githubusercontent.com/24871407/136822301-f92e6257-90d5-4b4d-b18b-066800038cad.png)

### Manage Reminders
![](https://imgur.com/wEh2sqx.png)

### Reminder Settings
![](https://imgur.com/MYFikCr.png)

#### SMS Reminder
![image](https://user-images.githubusercontent.com/24871407/136822926-21a27814-69b8-4a4c-bf29-2a292ca0dfab.png)

#### Telegram Reminder
![image](https://user-images.githubusercontent.com/24871407/136823452-365bec00-96ff-489f-a6ac-81ee616106d2.png)

### Vaccine Certificate
![image](https://user-images.githubusercontent.com/24871407/136823636-b54d46e7-587b-48e8-b6f0-0658dc0ea03a.png)


