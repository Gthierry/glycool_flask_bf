Parfait ! Voici la séquence complète sous Windows (PowerShell ou cmd) pour activer ton environnement virtuel, installer les dépendances et initialiser la base de données pour ton projet Flask + SQLAlchemy + PostgreSQL.

1️⃣ Créer et activer l’environnement virtuel

Depuis le dossier racine de ton projet (glycool_project_flask_version) :

PowerShell
# Créer l'environnement virtuel
python -m venv venv

# Autoriser l'exécution des scripts (une seule fois, si nécessaire)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Activer l'environnement
.\venv\Scripts\Activate.ps1

cmd.exe
python -m venv venv
venv\Scripts\activate


Après activation, tu dois voir (venv) au début du prompt.

2️⃣ Installer les dépendances
pip install -r requirements.txt


Si tu n’as pas encore requirements.txt :

pip install Flask Flask-SQLAlchemy Flask-Migrate python-dotenv flask-cors wtforms-json psycopg2-binary


Puis, pour générer le fichier requirements.txt :

pip freeze > requirements.txt

3️⃣ Définir la variable FLASK_APP

PowerShell :

$env:FLASK_APP = "run.py"


cmd.exe :

set FLASK_APP=run.py

4️⃣ Initialiser la base de données avec Flask-Migrate

Créer le dossier migrations :

python -m flask db init


Générer la première migration :

python -m flask db migrate -m "Initial migration"


Appliquer la migration :

python -m flask db upgrade


Les tables de ta base PostgreSQL sont maintenant créées selon tes modèles.

5️⃣ Lancer l’application Flask
python run.py


L’application est maintenant accessible sur http://127.0.0.1:5000/ par défaut.

✅ Résumé rapide

Créer + activer venv

Installer les dépendances

Définir FLASK_APP

python -m flask db init/migrate/upgrade

python run.py

