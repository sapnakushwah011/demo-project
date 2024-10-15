pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {
        CI = 'true'
    }

    stages {

        stage('Checkout Git') {
            steps {
                git url: 'https://github.com/sapnakushwah011/demo-project.git', branch: 'master'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'

                // Install Playwright browsers
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'jenkins/scripts/test.bat '
            }

            post {
                always {
                    junit 'test-results/results.xml' // Archive the JUnit results
                    archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true // Archive the results as artifacts
                }
                failure {
                    echo "Build failed because tests failed"
                    script {
                        // Revert the last commit if tests failed
                        bat 'git config --global user.email sapnakushwah072@gmail.com'
                        bat 'git config --global user.name sapnakushwah011'
                        // Revert the last commit
                        bat 'git revert --no-edit HEAD'
                        bat 'git push origin master'
                        error("Test failed, commit has been reverted.")
                    }
                }
            }
        }
    }
}
