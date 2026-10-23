# Parcours d'arrivée

Trois jours pour être opérationnel·le : comptes, outils, lecture, première contribution. Cochez au fur et à mesure dans votre issue d'arrivée.

## Jour 1 · Comptes et accès

- [ ] **GitHub** : un compte avec l'**authentification à deux facteurs** activée (obligatoire dans l'organisation [exceev-technology](https://github.com/exceev-technology)). Envoyez votre identifiant GitHub à Hamza, puis acceptez l'invitation à l'organisation et à l'équipe.
- [ ] **Slack** : vous êtes dans `#ecc-bootcamp-upshift-agent`.
- [ ] **Espace Upshift** : vous avez accepté l'invitation à **ECC Upshift Agents** et vous voyez le CRM.
- [ ] **Tableau** : vous ouvrez le [tableau du projet](https://github.com/orgs/exceev-technology/projects/2) et vous voyez les issues du sprint.

## Jour 1 · Outils

| Outil | Pourquoi | Installation |
| --- | --- | --- |
| Git | Versionner et collaborer | [git-scm.com](https://git-scm.com/downloads) |
| Node 24 via nvm | Version exigée par le SDK | [nvm](https://github.com/nvm-sh/nvm), puis `nvm install` dans le dépôt |
| Corepack (Yarn 4) | Gestionnaire de paquets du projet | `corepack enable` |
| GitHub CLI (facultatif) | Issues et PR depuis le terminal | [cli.github.com](https://cli.github.com) |
| Docker (facultatif) | Un serveur Upshift local | [docker.com](https://www.docker.com/products/docker-desktop/) |
| Un éditeur | VS Code ou équivalent, avec l'extension EditorConfig | |

Configurez Git une fois :

```bash
git config --global user.name "Prénom Nom"
git config --global user.email "adresse-liée-à-github@example.com"
git config --global pull.rebase true
```

## Jour 1 · Installer le projet

```bash
git clone https://github.com/exceev-technology/upshift-agent.git
cd upshift-agent
nvm install && nvm use
corepack enable
yarn install
yarn lint && yarn typecheck && yarn test:unit && yarn upshift dev:build
```

Tout est vert ? Vous êtes prêt·e. Une erreur ? Posez la question dans [Q&A](https://github.com/exceev-technology/upshift-agent/discussions/categories/q-a) avec le message complet.

## Jour 2 · Lire

Dans cet ordre, environ deux heures :

1. [Le projet](Projet.md), puis le [README](https://github.com/exceev-technology/upshift-agent#readme).
2. [AGENTS.md](https://github.com/exceev-technology/upshift-agent/blob/main/AGENTS.md) : les règles du projet et du SDK.
3. [CONTRIBUTING.md](https://github.com/exceev-technology/upshift-agent/blob/main/CONTRIBUTING.md) : le parcours d'une contribution.
4. [Scrum dans GitHub](Scrum-dans-GitHub.md) et [Definition of Done](Definition-of-Done.md).
5. [Découvrir Upshift](Decouvrir-Upshift.md) : faites le tour de l'espace avec des données fictives.

## Jour 3 · Première contribution

L'exercice : **ajouter votre ligne dans [L'équipe › Qui fait quoi](Equipe.md#qui-fait-quoi)**, par une vraie pull request.

1. Assignez-vous votre issue d'arrivée sur GitHub.
2. Créez une branche : `git switch -c docs/<numéro-issue>-equipe-<prenom>`.
3. Modifiez `docs/wiki/Equipe.md`, puis `git add` et `git commit -m "docs: add <prenom> to the team page"`.
4. `git push -u origin HEAD`, puis ouvrez la pull request en suivant le modèle, avec `Closes #<numéro>`.
5. Demandez la revue d'un autre membre, répondez à ses commentaires.
6. Une fois approuvée et la CI verte : **Squash and merge**. Votre ligne apparaît dans le wiki quelques minutes plus tard.

Le détail de chaque commande est dans [Collaborer avec Git](Collaborer-avec-Git.md).

## Les réflexes de sécurité

- **Jamais de clé, de jeton ou de mot de passe** dans le code, un commit, une issue, le wiki ou Slack. Les clés passent par l'environnement ; le fichier `.env` est ignoré par Git.
- Une clé publiée par erreur, même quelques secondes : **révoquez-la d'abord**, prévenez ensuite. Voir [SECURITY.md](https://github.com/exceev-technology/upshift-agent/blob/main/SECURITY.md).
- GitHub bloque un `git push` qui contient une clé connue. Ne contournez pas ce blocage : retirez la clé.
- Données fictives uniquement, partout.
