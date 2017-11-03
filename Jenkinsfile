pipeline {
  agent 'any'

  stages {
    //Install everything
    stage ('Install') {
      steps {
        sh 'cd frontend && npm install'
        sh 'cd backend && npm install'
      }
    }
    //Build frontend. Required for testing!
    stage ('Build') {
      steps {
        sh 'cd frontend && npm run build'
      }
    }
    //Test everything
    stage ('Test') {
      steps {
        sh 'cd backend && npm run test'
        sh 'cd frontend && npm run test-ci'
      }
    }
  }
}
