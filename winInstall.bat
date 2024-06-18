@echo off

echo Running npm install on root...
call npm install
echo Completed npm install on root.

echo Running npm install on /backend...
cd backend
call npm install
echo Completed npm install on /backend.
cd ..

echo Running npm install on /frontend...
cd frontend
call npm install
echo Completed npm install on /frontend.
cd ..

echo Starting application with concurrently...
call npm start

echo Script completed successfully.
pause



