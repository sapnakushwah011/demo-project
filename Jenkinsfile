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
                bat 'start /B npm install'
            }
        }

        stage('Node Build') {
            steps {
                bat 'start /B npm run build'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    try {
                        bat 'start /B npx playwright test'
                    } catch (Exception e) {
                        echo 'Tests failed, reverting the last commit'
                        bat 'git revert --no-edit HEAD'
                        error("Test failed, commit has been reverted.")
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                bat 'start /B npm run deploy'
            }
        }
    }
}
