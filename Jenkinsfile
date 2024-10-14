pipeline {
    agent any

    tools {
        nodejs "Node 14.x"
    }

    stages {

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
