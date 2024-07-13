# MajorAudit

# Repository Layout
- `/frontend`: The current face of the site, built with React.
- `/backend`: The backend logic for the site, built with Flask.
- `/scrapers`: Chrome extensions for web scraping
- `/docs`: Documentation

# Local DevEnv's
We're working fullstack.
* Base Firebase
1. In root directory, run: npm install -g firebase-tools
* Backend Venv
2. Update to python3.12
3. Navigate to backend
4. Run: python3.12 -m venv venv
5. Run: source venv/bin/activate
6. Run: pip install -r requirements.txt
7. Run: deactivate
* Secrets
8. Make a secrets directory in backend
9. Go to the Firebase Console
10. Select majoraudit
11. Click on the gear icon next to Project Overview and select Project Settings
12. Select Service Accounts
13. Generate a new Node.js private key
14. Move the file to your secrets directory
15. Update the cred = credentials.Certificate(r'...') line in main.py to path to that file
* Go
16. In frontend directory, run: npm run build
16. In root or frontend directory, run: firebase emulators:start
17. Troubleshoot any errors
* Notes
- Anytime you change the frontend, you need to cut the emulators and rebuild. 
    They only host the most recent build.
- Anyime you change the webscraper, you need to remove and reconfigure the extension in chrome. 
- You can change backend code as you go. Whenever you save, the emulators 
    will automatically restart. 

# Contributing
1. Create a branch for your feature. This can usually be done with `git checkout -b <username>/<feature_name>`
2. _make changes_
3. Create some commits and push your changes to the origin.
4. Create a pull request and add a few reviewers. In the pull request, be sure to reference any relevant issue numbers.
5. Once the pull request has been approved, merge it into the master branch.

# Roadmap
We use GitHub issues to track bugs and feature requests: [https://github.com/YaleComputerSociety/MajorAudit/issues](https://github.com/YaleComputerSociety/MajorAudit/issues).

We use GitHub projects to manage everything and do planning: [https://github.com/orgs/YaleComputerSociety/projects/2/](https://github.com/orgs/YaleComputerSociety/projects/2/).
