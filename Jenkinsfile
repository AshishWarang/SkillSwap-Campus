
pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Source code checked out successfully.'
            }
        }

        stage('Validate Website') {
            steps {
                bat 'node --version'
                bat 'node --check script.js'

                bat 'if not exist index.html exit /b 1'
                bat 'if not exist style.css exit /b 1'
                bat 'if not exist script.js exit /b 1'
                bat 'if not exist supabase-config.js exit /b 1'

                echo 'Website files and JavaScript syntax validated.'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'netlify-auth-token',
                        variable: 'NETLIFY_AUTH_TOKEN'
                    ),
                    string(
                        credentialsId: 'netlify-site-id',
                        variable: 'NETLIFY_SITE_ID'
                    )
                ]) {
                    bat '''
                        npx --yes netlify-cli deploy --prod --dir . --message "SkillSwap Campus Jenkins build %BUILD_NUMBER%"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: SkillSwap Campus was validated and deployed.'
        }
        failure {
            echo 'FAILED: Check the Jenkins Console Output for the error.'
        }
    }
}
