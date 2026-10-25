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

```text
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