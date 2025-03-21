# MajorAudit

## Repository Layout
- `/frontend`: The current face of the site, built with React.
- `/backend`: The backend logic for the site, built with Flask.
- `/scrapers`: Chrome extensions for web scraping.
- `/docs`: Documentation.

## Local Development Environment

We're working fullstack.

### Requirements
- Access to MajorAudit GitHub repository.
- npm (Node Package Manager).

### Setup Instructions

0. Clone the MajorAudit Repository:
    ```bash
    git clone <repository_url>
    ```

### Base Firebase Setup
1. In the root directory, run:
    ```bash
    npm install -g firebase-tools
    ```
   _Note: If it throws permission errors, prepend the command with `sudo`:_
    ```bash
    sudo npm install -g firebase-tools
    ```

### Backend Setup (Python Virtual Environment)
2. Update Python to version 3.12.
    - You can use [Homebrew](https://brew.sh/) to install the latest version of Python:
    ```bash
    brew install python@3.12
    ```

3. Navigate to the `/backend` directory.
4. Create a virtual environment:
    ```bash
    python3.12 -m venv venv
    ```
5. Activate the virtual environment:
    ```bash
    source venv/bin/activate
    ```
6. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```
7. Deactivate the virtual environment:
    ```bash
    deactivate
    ```

### Secrets Setup
8. Create a `secrets` directory in the `/backend` folder:
    ```bash
    mkdir secrets
    ```
9. Go to the [Firebase Console](https://console.firebase.google.com/).
10. Select the `majoraudit` project.
11. Click the gear icon next to "Project Overview" and select "Project Settings".
12. Navigate to the "Service Accounts" tab.
13. Generate a new Node.js private key.
14. Move the generated key file to your `secrets` directory.
15. Update the path to the key file in `main.py`:
    ```python
    cred = credentials.Certificate(r'path_to_secrets_file')
    ```

### Running the Project
1. Install the required frontend dependencies:
    ```bash
    cd frontend
    npm i
    ```

2. Ensure you have Java version >= 20 installed.

3. Log in to Firebase:
    ```bash
    firebase login
    ```

4. In the `/frontend` directory, build the frontend:
    ```bash
    npm run build
    ```

5. In the root or `/frontend` directory, start the Firebase emulators:
    ```bash
    firebase emulators:start
    ```

6. Troubleshoot any errors as needed.

### Notes
- **Frontend Changes**: Anytime you change the frontend code, stop the emulators, rebuild the frontend, and restart the emulators. The emulators only host the most recent build.
- **Web Scraper Changes**: If you modify the web scraper, remove and reconfigure the extension in Chrome.
- **Backend Changes**: You can modify the backend code on the fly. The emulators will automatically restart when you save changes.

### Strategies for Development
- **Frontend-Only Development**:
    1. Change the `useState(auth)` value in `App.tsx` to `true`.
    2. Modify the `initLocalStorage()` method in `Graduation.tsx` to use `MockStudent` instead of calling the `getData()` API.
    3. Run the frontend in development mode:
        ```bash
        npm start
        ```
    4. The frontend will now automatically update as you make changes.

## Contributing
1. Create a branch for your feature:
    ```bash
    git checkout -b <username>/<feature_name>
    ```
2. Make your changes.
3. Commit and push your changes to the origin:
    ```bash
    git commit -m "Your commit message"
    git push origin <branch_name>
    ```
4. Create a pull request and add reviewers. In the pull request, reference any relevant issue numbers.
5. Once the pull request is approved, merge it into the master branch.

## Roadmap
- We use GitHub issues to track bugs and feature requests: [GitHub Issues](https://github.com/YaleComputerSociety/MajorAudit/issues).
- We use GitHub projects to manage everything and do planning: [GitHub Projects](https://github.com/orgs/YaleComputerSociety/projects/2/).