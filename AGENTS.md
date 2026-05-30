# F1 Dashboard - Codex Agent Instructions

## Project Overview
Full-stack F1 Dashboard using React + Tailwind (frontend) and Node/Express/MongoDB (backend).

## General Rules
- Do not modify any file without explicit instruction
- Do not install new packages without asking first
- Always explain what you are doing before making changes

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, React Router v6, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, dotenv, cors
- API: OpenF1 (https://openf1.org/) — no API key required

## Folder Structure
- All frontend code lives in /client
- All backend code lives in /server
- Do not mix frontend and backend code

## Backend Rules
- All routes go in /server/routes
- All business logic goes in /server/controllers
- All MongoDB schemas go in /server/models
- Always use async/await, never callbacks
- Always wrap route logic in try/catch
- Never expose API keys or .env values

## Frontend Rules
- Use functional components only, no class components
- Use React Router v6 for all routing
- Use Tailwind CSS for all styling, no plain CSS
- Use Axios for all API calls to backend
- Use custom hooks for reusable logic

## Code Style
- Use arrow functions always
- Use named exports, not default exports where possible
- Keep components small and focused
- Use meaningful variable names