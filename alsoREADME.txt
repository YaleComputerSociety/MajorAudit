
Get Going Fullstack
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
16. Run: firebase emulators:start
17. Check for errors 
