# SnapTutor

SnapTutor is a **multimodal AI tutor** that analyzes images of homework or study material and provides clear explanations using **Google's Gemini model**.

Instead of forcing students to describe visual problems in text, SnapTutor allows them to simply **upload an image and ask a question**, and the AI explains what it sees.

---

## Demo

Watch the demo video here:

[Demo Video](./demo/snap-tutor-demo.mp4)

---

## Features

- Upload images of homework, diagrams, or study material
- Ask questions about the uploaded content
- AI explanation powered by **Gemini multimodal models**
- Spoken responses using the **Speech Synthesis API**
- Responsive interface built with **Next.js**

---

## How It Works

1. The user uploads an image of homework or study material.
2. The user asks a question about the image.
3. The frontend sends the image and question to the backend API.
4. The backend calls the **Gemini multimodal model**.
5. Gemini analyzes the image and generates an explanation.
6. The explanation is displayed and optionally spoken aloud.

---

## Architecture
