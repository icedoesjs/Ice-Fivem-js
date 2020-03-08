@echo off
title Ice-Fivem-JS 
echo Starting the bot, Made by IceyyM8
ping localhost 3 >nul
node bot.js
cls
IF ERRORLEVEL 0 ECHO It seems the bot failed to start, please contact IceyyM8#0816 or join https://discord.gg/cqjT5xA
ping localhost -n 20 >nul
exit
