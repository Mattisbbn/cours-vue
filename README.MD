# cours-vue

Ce projet contient:

- un backend Symfony/API Platform dans le dossier back
- un frontend Vue/Vite servi par Nginx dans le dossier front

Le lancement recommandé se fait avec Docker Compose.

## Prerequis

- Docker Desktop (ou Docker Engine + Compose v2)
- Ports libres: 8085 (front) et 8005 (back)

## Lancer le projet avec Docker

Depuis la racine du projet:

```bash
docker compose up -d --build
```

Ensuite, ouvrir:

- Frontend: http://localhost:8085
- API backend: http://localhost:8005

## Commandes utiles

Afficher les logs:

```bash
docker compose logs -f
```

Arrêter les conteneurs:

```bash
docker compose down
```

Arrêter et supprimer aussi le volume de donnees (reset base SQLite):

```bash
docker compose down -v
```

Relancer en reconstruisant les images:

```bash
docker compose up -d --build
```

## Notes importantes

- Le backend tourne en mode production dans Docker (APP_ENV=prod, APP_DEBUG=0).
- La base SQLite du backend est persistante grace au volume Docker back_data.
- Le frontend est build puis servi par Nginx sur le port 8085.

## Verification rapide

Si tout est OK:

1. http://localhost:8085 charge l'interface Vue
2. http://localhost:8005/api retourne la documentation API Platform
