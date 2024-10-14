pipeline {
    agent any

    tools {
        nodejs "Node 14.x" 
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sapnakushwah011/demo-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test -- --watchAll=false'
            }
        }
    }

    post {
        always {
            echo 'Test complete'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
