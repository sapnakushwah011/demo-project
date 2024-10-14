pipeline {
    agent any

    tools {
        nodejs "Node 14.x"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'start /B npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'start /B npm test'
            }
        }
        
        stage('Deploy') {
            steps {
                bat 'start /B npm run deploy'
            }
        }
    }
}
