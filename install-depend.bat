@echo off 
rem Just a basic dependecie installer lmao
echo Welcome and thanks for using Ice-Fivem-JS 
ping localhost -n 2 >nul
cls 
GOTO :start

:start 
SET /P UPDATE=Are you sure you want to update/install all dependecies? (Y/N)? 
IF /I %UPDATE% NEQ "Y" GOTO updater 
IF /I %UPDATE% NEQ "N" GOTO closer

:updater 
cls 
echo Please wait while everything installs....
ping localhost -n 2 >nul
cls
npm install 

:closer 
echo Thanks for using Ice-Fivem-JS 
ping localhost -n 2 >nul
cls 
echo I will now close 
ping localhost -n 2 >nul 
cls 
exit
