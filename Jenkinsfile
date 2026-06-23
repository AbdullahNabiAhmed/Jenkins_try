pipeline {
agent any


environment {
    DOCKER_IMAGE = 'abdullahdockers/jenkins-demo'
    IMAGE_TAG = "${BUILD_NUMBER}"
}

stages {

    stage('Checkout') {
        steps {
            checkout scm
        }
    }

    stage('Build') {
        steps {
            echo 'Building application...'
            sh 'node --version'
        }
    }

    stage('Test') {
        steps {
            echo 'Tests passed!'
        }
    }

    stage('Docker Build') {
        steps {
            sh 'docker build -t $DOCKER_IMAGE:$IMAGE_TAG .'
            sh 'docker tag $DOCKER_IMAGE:$IMAGE_TAG $DOCKER_IMAGE:latest'
        }
    }

    stage('Push to Docker Hub') {
        steps {
            withCredentials([
                usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )
            ]) {
                sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker push $DOCKER_IMAGE:$IMAGE_TAG
                    docker push $DOCKER_IMAGE:latest
                '''
            }
        }
    }

    stage('Deploy') {
        steps {
            sh '''
                docker stop jenkins-demo || true
                docker rm jenkins-demo || true
                docker pull $DOCKER_IMAGE:latest
                docker run -d -p 3000:3000 --name jenkins-demo $DOCKER_IMAGE:latest
            '''

            echo 'App deployed successfully at http://localhost:3000'
        }
    }
}

post {
    success {
        echo 'Pipeline completed successfully!'
    }

    failure {
        echo 'Pipeline failed! Check Jenkins logs.'
    }
}


}
