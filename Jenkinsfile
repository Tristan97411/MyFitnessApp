pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'NodeJS' // Configure Node.js dans Jenkins
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Tristan97411/MyFitnessApp.git' // Remplace par ton repo Git
            }
        }

        stage('Setup Node.js & Expo') {
            steps {
                bat 'npm install -g expo-cli' // Installe Expo CLI
                bat 'expo --version' // Vérifie qu'Expo fonctionne
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install' // Installe les dépendances du projet
            }
        }

        stage('Configure Firebase') {
            steps {
                bat 'echo "Configuration Firebase..."'
                bat 'mkdir firebase'
                bat 'echo {\"project_id\": \"projet-habitude\"} > firebase/service-account.json' 
                bat 'dir firebase' // Vérifie si le fichier est bien créé
            }
        }

        stage('Run Jest Tests') {
            steps {
                bat 'npm test' // Exécute les tests Jest
            }
        }

        stage('Build Web App') {
            steps {
                bat 'expo export --output-dir dist' // Génère un build statique
            }
        }

        stage('Deploy to Firebase Hosting') {
            steps {
                bat 'npm install -g firebase-tools' // Installe Firebase CLI
                bat 'firebase deploy --only hosting' // Déploie sur Firebase Hosting
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé !'
        }
        success {
            echo 'Build et tests réussis ✅'
        }
        failure {
            echo 'Échec du build ou des tests ❌'
        }
    }
}