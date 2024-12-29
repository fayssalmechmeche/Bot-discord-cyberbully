# Bot Discord Anti-Cyberharcèlement

Ce bot Discord détecte le cyberharcèlement dans les messages des utilisateurs et envoie des avertissements ainsi que des messages constructifs. Il utilise l'API Gemini de Google pour détecter le cyberharcèlement et générer des messages de prévention.

## Fonctionnalités

- **Détection du Cyberharcèlement** : Le bot utilise un modèle d'IA pour détecter si un message contient du cyberharcèlement.
- **Avertissements et Bannissements** : Après plusieurs avertissements, le bot peut bannir un utilisateur temporairement (1 jour) ou définitivement.
- **Messages Constructifs** : Lorsqu'un message est détecté comme étant du cyberharcèlement, le bot envoie un message privé à l'utilisateur avec un message constructif pour encourager un comportement respectueux.

## Prérequis

Avant de pouvoir utiliser ce bot, assurez-vous de remplir les conditions suivantes :

- **Node.js** (version 16 ou plus récente) : Vous pouvez télécharger et installer Node.js depuis [nodejs.org](https://nodejs.org/).
- **Un serveur Discord avec les permissions appropriées** : Vous devez avoir des droits sur le serveur Discord où vous souhaitez déployer le bot.
- **Un compte Google API pour l'API Gemini** : Vous aurez besoin d'une clé d'API pour utiliser le modèle d'IA générative de Google.
- **Un token Discord** : Vous devez disposer d'un token d'application pour authentifier votre bot.

## Installation

1. Clonez ce dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/fayssalmechmeche/discord-cyberbullying-bot.git
   ```

2. Installez les dépendances nécessaires :

   ```bash
   cd discord-cyberbullying-bot
   npm install
   ```

3. Créez un fichier `.env` à la racine du projet et ajoutez vos informations d'API :

   ```
   TOKEN=YOUR_DISCORD_BOT_TOKEN
   GEMINI_API_KEY=YOUR_GOOGLE_API_KEY
   APPID=YOUR_SERVER_APPID
   ```

## Utilisation

1. Démarrez le bot en exécutant la commande suivante :

   ```bash
   npm start
   ```

2. Le bot se connectera à votre serveur Discord et commencera à surveiller les messages. Lorsqu'il détecte du cyberharcèlement, il enverra des avertissements et des messages constructifs.
3. Vous pouvez configurer et rafraîchir les commandes d'application à l'aide de la fonction `refreshCommands`.

## Fonctionnement du Code

### Détection du Cyberharcèlement

- Lorsqu'un utilisateur envoie un message dans le serveur, le bot analyse le contenu du message pour vérifier s'il contient du cyberharcèlement en utilisant le modèle d'IA de Google.
- Si le message est jugé comme étant du cyberharcèlement, le bot réagit en fonction du nombre d'avertissements précédemment reçus par l'utilisateur.

### Avertissements et Bannissements

- **5 avertissements** : Un bannissement temporaire de 1 jour est appliqué.
- **7 avertissements** : Un bannissement définitif est appliqué et les avertissements sont réinitialisés.
- Si l'utilisateur a moins de 5 avertissements, un message constructif est envoyé par DM.

### Exemple de message constructif

Lorsque le bot détecte du cyberharcèlement, il génère un message positif à l'aide du modèle d'IA, par exemple :

```
Attention, ton message pourrait être considéré comme du cyberharcèlement. Voici un message constructif que tu pourrais envoyer à la place :
"Tu es une personne formidable, et il est important de respecter les autres. L'humour peut être amusant tant qu'il ne nuit à personne. Merci de rester respectueux !"
```

## Dépannage

Si vous rencontrez des problèmes avec le bot, voici quelques étapes à suivre :

- **Vérifiez que le token Discord et l'API Key Google sont correctement configurés dans le fichier `.env`.**
- **Vérifiez que votre bot a les permissions nécessaires pour lire les messages et bannir des utilisateurs.**
- **Assurez-vous que Node.js est installé et que toutes les dépendances sont correctement installées.**
- **Assurez-vous que le fichier serversWarningMembers.json existe bien à la racine du projet.**
