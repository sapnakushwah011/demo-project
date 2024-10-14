pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                sh 'git clone https://github.com/sapnakushwah011/demo-project.git' // Clone your repository
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install' // Run npm install
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test' // Run tests
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh 'npm run deploy' // Deploy your application
            }
        }
    }
}
