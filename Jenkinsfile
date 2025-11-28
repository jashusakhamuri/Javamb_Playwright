pipeline{
    agent any
    environment {
        // 🔧 Replace with your actual remote WebSocket endpoint
        REMOTE_WS = "ws://192.168.2.149:9000"
    }
    stages {
        stage('Checkout') {
            steps {
                // 🔧 Replace with your actual GitHub repo URL
                // Example: 'https://github.com/RK805/AMB_PlaywrightAutomation'
                git branch: 'main', url: 'https://github.com/RK805/AMB_PlaywrightAutomation'

                // 🔧 If your repo is private, add credentials:
                // git branch: 'main', url: 'https://github.com/jashu5446/AMB_labs.git', credentialsId: 'your-jenkins-cred-id'
            }
        }

        stage('Install Dependencies') {
            steps {
                // ✅ Windows agent → use PowerShell
                powershell 'npm install'
            }
        }

        stage('Run Tests on Remote Chromium') {
            steps {
                // ✅ Your custom Playwright remote command in one line
                powershell '''
                    $env:REMOTE_WS="ws://192.168.2.149:9000"; npx playwright test  --project=remote-chromium --headed --reporter=junit
                '''
            }
        }

        stage('Build') {
            steps {
                // 🔧 Replace with your actual build command
                // Example: 'npm run build' or 'npx tsc'
                powershell 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // 🔧 Replace with your deployment script or commands
                powershell 'Write-Output "Deploying application..."'
            }
        }
    }

    post {
        always {
            // ✅ Jenkins will parse JUnit XML results
            junit 'test-results/*.xml'
            archiveArtifacts artifacts: 'test-results/*.xml', allowEmptyArchive: true
        }
        success {
            echo 'Pipeline completed successfully ✅'
        }
        failure {
            echo 'Pipeline failed ❌'
        }
    }
}

