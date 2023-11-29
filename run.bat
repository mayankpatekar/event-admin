@echo off

REM Change to the backend directory and run node server.js
cd backend
start cmd /k node server.js


REM Switch back to the main directory
cd ..

REM Change to the frontend directory and run npm start
cd frontend
start cmd /k npm start

REM Switch back to the main directory
cd ..