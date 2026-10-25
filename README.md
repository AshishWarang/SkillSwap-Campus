# SkillSwap Campus

> **A campus skill-sharing platform built with HTML, CSS, JavaScript,
> Supabase, Git/GitHub, Jenkins, and Netlify.**

[![Live
Website](https://img.shields.io/badge/Live%20Website-Netlify-00C7B7?logo=netlify&logoColor=white)](https://skillswapsite.netlify.app)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-Jenkins-D24939?logo=jenkins&logoColor=white)](https://www.jenkins.io/)

## Project Links

-   **Live website:** https://skillswapsite.netlify.app
-   **GitHub repository:**
    https://github.com/AshishWarang/SkillSwap-Campus
-   **Jenkins job:** `SkillSwap-Campus-Pipeline`
-   **Hosting platform:** Netlify
-   **Database:** Supabase

> Replace these links if your project URLs change. Add your own
> screenshots to the `screenshots/` folder using the filenames listed in
> the Screenshot Evidence section.

------------------------------------------------------------------------

## 1. Introduction

SkillSwap Campus is a student-focused web application designed to help
students share skills with one another. A student can list a skill they
can teach or a skill they want to learn. Visitors can explore the
available skills, search by name or student, and filter listings by
category.

The project also demonstrates a basic DevOps workflow. The code is
stored in GitHub, Jenkins checks out and validates the code, and Jenkins
deploys the static website to Netlify. Supabase stores submitted skill
listings in a hosted PostgreSQL database.

## 2. Problem Statement

Students often have useful skills but may not have a simple campus
platform to find peers who can teach or learn those skills. SkillSwap
Campus provides a small, accessible place to list skills and discover
other students with shared learning interests.

## 3. Objectives

-   Build a responsive and easy-to-use skill-sharing website.
-   Allow users to browse, search, and filter skill listings.
-   Store submitted skill information in a Supabase database.
-   Use Git and GitHub for source control and version history.
-   Use Jenkins to automate source checkout, validation, and deployment.
-   Host the website on Netlify and collect evidence of the working
    pipeline.
-   Practise a simple Continuous Integration / Continuous Deployment
    (CI/CD) workflow.

## 4. Features

-   Landing page introducing SkillSwap Campus.
-   Skill cards showing the skill name, category, student name, and
    Teach/Learn type.
-   Search across skill name, student name, and category.
-   Category filter for Technology, Design, Communication, Business, and
    Other.
-   Form validation before submission.
-   Supabase database integration for persistent skill listings.
-   Responsive styling for different screen sizes.
-   Jenkins pipeline that checks required website files and JavaScript
    syntax before deploying.
-   Public Netlify deployment.

## 5. Technologies Used

  -----------------------------------------------------------------------
  Technology                          Purpose
  ----------------------------------- -----------------------------------
  HTML5                               Page structure and form elements

  CSS3                                Layout, styling, and responsive
                                      design

  JavaScript                          Rendering cards, searching,
                                      filtering, validation, and database
                                      requests

  Supabase                            Hosted PostgreSQL database and REST
                                      API

  Git                                 Local version control

  GitHub                              Remote repository and commit
                                      history

  Jenkins                             CI/CD pipeline automation

  Netlify CLI                         Uploading the site from Jenkins

  Netlify                             Hosting the live static website

  Node.js / npm                       JavaScript syntax check and running
                                      the Netlify CLI
  -----------------------------------------------------------------------

## 6. System Workflow

1.  A developer edits the website files locally.
2.  The changes are saved in Git commits.
3.  The commits are pushed to the GitHub repository.
4.  Jenkins checks out the repository.
5.  Jenkins checks the Node.js version, runs `node --check script.js`,
    and verifies required files.
6.  Jenkins uses credentials stored in Jenkins to deploy the website to
    Netlify.
7.  Users open the live website and submit skill listings.
8.  The website uses the Supabase client library to read and insert
    records in the `skills` table.

## 7. Project Structure

The repository contains the following main files. Your local folder may
also contain additional files.

``` text
SkillSwap-Campus/
├── index.html
├── style.css
├── script.js
├── supabase-config.js
├── Jenkinsfile
├── README.md
└── screenshots/
    ├── website.png
    ├── github-commits.png
    ├── supabase-table.png
    ├── jenkins-success.png
    └── netlify-deploy.png
```

**Important:** The screenshot files are evidence you need to add.
Capture your own screenshots and save them with the exact filenames
above, or update the image paths in this README to match your filenames.

## 8. Setup and Run Locally

### Prerequisites

-   Git
-   A modern browser
-   Visual Studio Code (recommended)
-   A Supabase project
-   VS Code Live Server extension, or another local static web server

Node.js and npm are needed for the Jenkins pipeline and Netlify CLI
deployment.

### Step 1 --- Clone the repository

Open a terminal and run:

``` bash
git clone https://github.com/AshishWarang/SkillSwap-Campus.git
cd SkillSwap-Campus
```

### Step 2 --- Configure Supabase

1.  Open the Supabase dashboard and select the project.
2.  Find the project URL and the publishable key (or the legacy `anon`
    key).
3.  Open `supabase-config.js`.
4.  Set the values in the existing configuration:

``` javascript
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
```

Do not use a Supabase `service_role` key or any secret key in
browser-side code. The publishable/anon key is designed for client-side
use only when database permissions and Row Level Security (RLS) policies
are correctly configured. Never commit a service-role or secret key to
GitHub.

### Step 3 --- Check script loading order

At the bottom of `index.html`, the Supabase library, configuration file,
and application script should load in this order:

``` html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-config.js"></script>
<script src="script.js"></script>
```

### Step 4 --- Create/check the database table

The Supabase table is named `public.skills`. It contains the following
fields:

  Column           Purpose
  ---------------- -------------------------------
  `id`             Generated row identifier
  `student_name`   Student's name
  `skill_name`     Skill being taught or learned
  `category`       Skill category
  `skill_type`     `Teach` or `Learn`
  `created_at`     Timestamp for the record

The table should have Row Level Security enabled and policies that allow
the intended read and insert operations. For a public student demo,
public insert access can be abused; production applications should
consider authentication, rate limits, and tighter policies.

### Step 5 --- Run the website

Open the project folder in VS Code, right-click `index.html`, and select
**Open with Live Server**. Alternatively, use any local static web
server.

### Step 6 --- Test the application

-   Confirm that the skill cards appear.
-   Try the search box and category filter.
-   Submit a new skill using the form.
-   Check Supabase **Table Editor → `skills`** for the new row.
-   Refresh the website and confirm the stored skill is still available.

If the database connection fails, inspect the browser developer console
and confirm the project URL, publishable key, table name, and RLS
policies. Do not share secret keys in screenshots or support messages.

## 9. Meaningful Changes and Commit History

The project has been developed in stages. The following table documents
the meaningful feature areas. **Use `git log --oneline` to verify the
actual commits and add their real commit IDs before submission. Do not
invent commit hashes or claim that one feature had a separate commit
unless the history confirms it.**

  -----------------------------------------------------------------------------------------------------
  Change                  Description             Suggested commit message
  ----------------------- ----------------------- -----------------------------------------------------
  1\. Initial website     Added the SkillSwap     `Build initial SkillSwap Campus website`
                          Campus page structure,  
                          navigation, skill       
                          cards, form, and core   
                          content.                

  2\. Styling and         Added the visual        `Improve responsive website styling`
  responsive layout       design, cards, form     
                          styling, and responsive 
                          layout. If these        
                          changes are already     
                          part of the initial     
                          commit, record them as  
                          part of that commit     
                          rather than claiming a  
                          separate commit.        

  3\. Search and category Added search and        `Add skill search and category filters`
  filtering               category filtering so   
                          users can find relevant 
                          skill listings. If      
                          already in the initial  
                          commit, record it       
                          accurately in the       
                          commit history.         

  4\. Supabase            Connected the form and  `Connect SkillSwap to Supabase database`
  integration             skill list to Supabase  
                          so submissions can      
                          persist in the          
                          database.               

  5\. Jenkins CI/CD       Added a `Jenkinsfile`   `Add Jenkins CI CD pipeline for Netlify deployment`
                          that checks out the     
                          repository, validates   
                          files and JavaScript    
                          syntax, and deploys to  
                          Netlify.                
  -----------------------------------------------------------------------------------------------------

### Verify the real Git history

Run these commands in the project folder:

``` bash
git status
git log --oneline
git remote -v
```

Use the actual output to update the history below:

``` text
[Paste your actual `git log --oneline` output here before submission.]
```

If your assignment requires at least five **separate commits**, check
the actual history. If it has fewer than five, make additional genuine
improvements, test them, and commit each change separately. Do not
create empty commits just to increase the count.

### Git workflow used

Typical commands used during development:

``` bash
git status
git add index.html style.css script.js
git commit -m "Build initial SkillSwap Campus website"

git add index.html script.js supabase-config.js
git commit -m "Connect SkillSwap to Supabase database"

git add Jenkinsfile
git commit -m "Add Jenkins CI CD pipeline for Netlify deployment"

git push
```

Only run a commit command when the corresponding files have real
changes. If the changes are already committed, do not repeat the same
commit just for the report.

## 10. Jenkins CI/CD Integration

Jenkins runs locally on a Windows laptop. The Jenkins job is named:

`SkillSwap-Campus-Pipeline`

It is configured as **Pipeline script from SCM**, using the Git
repository and the `Jenkinsfile` stored at the repository root.

### Pipeline stages

1.  **Checkout** --- pulls the project source from GitHub.
2.  **Validate Website** --- checks the Node.js version, runs
    `node --check script.js`, and confirms that `index.html`,
    `style.css`, `script.js`, and `supabase-config.js` exist.
3.  **Deploy to Netlify** --- runs the Netlify CLI production deployment
    using credentials stored in Jenkins.
4.  **Post actions** --- prints a success or failure message in the
    build log.

### Jenkins credentials

The pipeline expects two Jenkins **Secret text** credentials:

  Credential ID          Value stored
  ---------------------- -------------------------------
  `netlify-auth-token`   Netlify personal access token
  `netlify-site-id`      Netlify site/project ID

Credentials are stored in Jenkins rather than hard-coded into the
repository. Never add the real token or other secrets to this README,
source files, screenshots, or Git commits.

### Build evidence

The first reported pipeline build completed successfully with:

-   GitHub checkout: successful
-   JavaScript syntax check: successful
-   Required website files: found
-   Netlify production deploy: live
-   Jenkins result: `SUCCESS`

The console output reported deployment ID `6ade5a548df50fc31cbd2ac6` and
the live URL below:

-   Production: https://skillswapsite.netlify.app
-   Deployment details:
    https://app.netlify.com/projects/skillswapsite/deploys/6ade5a548df50fc31cbd2ac6

The successful deployment confirms that Jenkins uploaded the files. It
does not, by itself, prove that every live Supabase operation works;
test a new submission on the deployed site and confirm that it appears
in the Supabase table.

## 11. Deployment

The website is hosted on Netlify. Jenkins runs the following type of
command during the deployment stage:

``` bash
npx --yes netlify-cli deploy --prod --dir .
```

The configured Jenkins credentials provide the Netlify authentication
token and site ID through the environment. The `--prod` option deploys
to the production site, while `--dir .` publishes the current project
directory.

**Live website:** https://skillswapsite.netlify.app

After making a website change, commit and push it to GitHub, then run
the Jenkins pipeline to validate and deploy the updated version.

## 12. Screenshot Evidence

Replace each placeholder image below by saving your own screenshot into
the `screenshots/` folder with the same filename. Do not submit the
placeholder text as proof; use screenshots from your actual application
and tools.

### 12.1 Live Website

![Replace with a screenshot of the live SkillSwap Campus
website](screenshots/website.png)

*Figure 1: SkillSwap Campus website showing the main page and skill
listings.*

### 12.2 GitHub Repository and Commit History

![Replace with a screenshot of the GitHub repository and commit
history](screenshots/github-commits.png)

*Figure 2: GitHub repository showing project files and meaningful
commits.*

### 12.3 Supabase Database

![Replace with a screenshot of the Supabase skills
table](screenshots/supabase-table.png)

*Figure 3: Supabase `skills` table containing saved skill records.*

### 12.4 Jenkins Pipeline Success

![Replace with a screenshot of the successful Jenkins
pipeline](screenshots/jenkins-success.png)

*Figure 4: Jenkins pipeline stages and successful build result.*

### 12.5 Netlify Production Deployment

![Replace with a screenshot of the Netlify production
deployment](screenshots/netlify-deploy.png)

*Figure 5: Netlify showing the successful production deployment.*

## 13. Results

SkillSwap Campus demonstrates a small full-stack web project and a basic
CI/CD workflow. The front end provides skill discovery and submission
features, Supabase stores the records, GitHub maintains source history,
Jenkins automates validation and deployment, and Netlify hosts the
public website.

The reported Jenkins build finished with `SUCCESS`, and Netlify reported
that the production deployment was live. Database functionality should
be confirmed by submitting a skill on the live website and verifying the
resulting row in Supabase.

## 14. Limitations and Future Improvements

-   Add user authentication so students can manage their own listings.
-   Add edit and delete functionality with appropriate access controls.
-   Improve input moderation and protect the public form against spam.
-   Add automated browser tests and stronger HTML/CSS validation.
-   Configure a GitHub webhook or Jenkins SCM polling for automatic
    builds after pushes.
-   Improve accessibility, keyboard navigation, and form feedback.
-   Add pagination if the number of skills becomes large.

## 15. Learning Outcomes

Through this project, the developer practised:

-   Building a responsive website using HTML, CSS, and JavaScript.
-   Connecting a front end to a hosted database.
-   Using Git commits and GitHub for version control.
-   Writing a Jenkins declarative pipeline in a `Jenkinsfile`.
-   Validating code and required files in a CI pipeline.
-   Deploying a website to Netlify through the CLI.
-   Documenting a software project with screenshots and reproducible
    setup steps.

## 16. References

-   [Jenkins Pipeline
    documentation](https://www.jenkins.io/doc/book/pipeline/)
-   [Jenkins Pipeline
    syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
-   [Netlify CLI documentation](https://developers.netlify.com/cli/)
-   [Netlify deploy command
    reference](https://cli.netlify.com/commands/deploy/)
-   [Supabase documentation](https://supabase.com/docs)

------------------------------------------------------------------------

**Project:** SkillSwap Campus\
**Developer:** Ashish Warang\
**Purpose:** DevOps and Kubernetes ISE-2 project\
**Repository:** https://github.com/AshishWarang/SkillSwap-Campus\
**Live Website:** https://skillswapsite.netlify.app
