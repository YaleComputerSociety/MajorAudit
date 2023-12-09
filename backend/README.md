#### How to use / test the back-end code

1. Go to chrome, type chrome://extensions in search bar, and enable developer mode on the top-right corner. Hit "Load Unpacked"  on the top-left, choose the folder \MajorAudit\scrapers\degreeAuditScraper. The chrome extension should now be loaded.
2. Run flask (command: "flask --app main run" in cmd, in folder backend)
3. Type http://127.0.0.1:5000/user_login in chrome. You should now be able to login.
