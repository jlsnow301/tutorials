:: Jerm

:start
@echo off
echo.
echo ***************************************************************
echo **            This will delete the node_modules              **
echo **            folder and try to reinstall npm.               **
echo ***************************************************************
echo.
set /p run= "Are you sure? Type Y or N: "
if /I "%run%" == "Y" (echo Confirmed, deleting client side...) else (goto :start)
cd client
rmdir node_modules /S /Q
echo Done. Reinstalling client.
echo.
call npm install
call npm update
call npm audit fix
call npm fund
timeout 2 >nul

cls
echo.
echo ***************************************************************
echo **            This will delete the node_modules              **
echo **            folder and try to reinstall npm.               **
echo ***************************************************************
echo.
echo Deleting server side...
cd ..
cd server
rmdir node_modules /S /Q
echo Done. Reinstalling server.
echo.
call npm install
call npm update
call npm audit fix
call npm fund
timeout 2 >nul

cls
echo.
echo ***********************************************************************
echo **            Finished without any errors. Exiting...                **
echo ***********************************************************************
timeout 3 >nul
