# 😊 Emotion Detection for Classrooms

This project detects students' emotions in real-time using face recognition and shows the results to teachers. It’s built to help improve engagement and make learning more responsive.

## 🛠 What's Inside

- `mainserver/` – Handles data from students and sends it to the teacher view.
- `student/` – Captures student emotion via webcam and sends it to the server.
- `teacher/` – Displays a dashboard of students’ emotions in real time.

## 🚀 How to Run

1. Clone this repo:
   ```bash
   git clone https://github.com/Abhisheksullia/Emotion-detection.git
   cd Emotion-detection


2.	Install dependencies in each folder:

    cd mainserver && npm install
    cd ../student && npm install
    cd ../teacher && npm install

3.	Run each part with:
    npm start

