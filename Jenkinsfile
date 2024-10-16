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
                sh 'npm install'

                // Install Playwright browsers
                sh 'npx playwright install'
            }
        }


        stage('Node Build') {
            steps {
                script {
                    withEnv(['CI=false']) {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                sh 'jenkins/scripts/test.bat '
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
                        sh 'git config --global user.email sapnakushwah072@gmail.com'
                        bat 'git config --global user.name sapnakushwah011'
                        // Revert the last commit
                        sh 'git revert --no-edit HEAD'
                        sh 'git push origin HEAD'
                        error("Test failed, commit has been reverted.")
                    }
                }
            }
        }

        stage('deploy') {
            steps {
               sh 'npm run deploy'
            }
        }
    }
}
