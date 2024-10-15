pipeline {
    agent any

    tools {
       nodejs 'nodejs'
   }

   environment {
       CI = 'true'
   }

    stages {

        stage('checkout git') {
            steps {
                git url: 'https://github.com/sapnakushwah011/demo-project.git', branch: 'master'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'start /B npm install'
            }
        }

        stage('Node build') {
            steps {
                bat 'start /B npm run build'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'jenkins/scripts/test.sh'
            }
        }
        
        stage('Deploy') {
            steps {
                bat 'start /B npm run deploy'
            }
        }
    }
}
