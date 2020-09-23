#!groovy​

pipeline {
  agent any

  environment {
    uniqueId = UUID.randomUUID().toString()
  }

  tools {
    nodejs "lts"
  }

  stages {
    stage("Build") {
      steps {
        sh "node -v"
        sh "npm -v"
        sh "npm install"
        sh "npm run build"
      }
    }

    stage("Deploy to docker") {
      when {
        branch 'master'
      }
      steps {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'bb39cf8e-1186-4c79-b8ea-96ff576be904',
        usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
          sh "docker login -u '${USERNAME}' -p '${PASSWORD}'"
          withDockerRegistry([credentialsId: 'bb39cf8e-1186-4c79-b8ea-96ff576be904', url: "https://index.docker.io/v1/" ]) {
            sh "docker build -t ascripture/wilsonbe:${env.uniqueId} ."
            sh "docker push ascripture/wilsonbe:${env.uniqueId}"
          }
        }
      }
    }

    // stage("Migrate Database") {
    //   when {
    //     branch 'master'
    //   }
    //   steps {
    //     withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: '3e1eb5bb-2623-4710-bc80-9c81b8e90a86',
    //     usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
    //       sh """\
    //         TYPEORM_CONNECTION=postgres \
    //         TYPEORM_HOST=ascripture-do-user-6179370-0.db.ondigitalocean.com \
    //         TYPEORM_USERNAME=${USERNAME} \
    //         TYPEORM_PASSWORD=${PASSWORD} \
    //         TYPEORM_DATABASE=wilson \
    //         TYPEORM_PORT=25060 \
    //         TYPEORM_SYNCHRONIZE=false \
    //         TYPEORM_LOGGING=error \
    //         TYPEORM_MIGRATIONS=src/migrations/**.ts \
    //         TYPEORM_MIGRATIONS_DIR=src/migrations \
    //         TYPEORM_ENTITIES=src/**/**.entity.ts \
    //         TYPEORM_ENTITIES_DIR=src/db/entities \
    //         TYPEORM_DRIVER_EXTRA='{"ssl":true}' \
    //         TYPEORM_CACHE=true \
    //         npm run typeorm migration:run
    //       """
    //     }
    //   }
    // }

    stage("Deploy to k8s")  {
      when {
        branch 'master'
      }
      steps {
        // kubeconfig not needed
        // the user already has kubectl installed, also the doctl kubeconfig is updated each week
        sh "kubectl --record deployment.apps/wilsonbe-deployment set image deployment.v1.apps/wilsonbe-deployment wilsonbe=ascripture/wilsonbe:${env.uniqueId}"

        // cleanup docker
        sh "docker rmi -f \$(docker images -q)"
      }
    }
  }

  post {
    always {
      echo "cleanup workspace"
      deleteDir()
    }

    success {
      echo "SUCCESS"
    }

    failure {
      echo "FAILURE"
    }
  }
}