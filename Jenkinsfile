pipeline {
    agent any

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
