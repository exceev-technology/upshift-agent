# Collaborer avec Git

Comment des personnes qui ne se connaissent pas travaillent sur le même code sans se marcher dessus : c'est tout l'art d'un projet open source. Cette page est le pas-à-pas ; les règles sont dans [CONTRIBUTING.md](https://github.com/exceev-technology/upshift-agent/blob/main/CONTRIBUTING.md).

## Les notions

| Notion | En une phrase |
| --- | --- |
| **Dépôt** (*repository*) | Le projet et tout son historique |
| **Clone** | Votre copie locale du dépôt |
| **Fork** | Votre copie du dépôt sur GitHub, pour contribuer sans droit d'écriture |
| **Branche** | Une ligne de travail isolée ; `main` est la ligne de référence, protégée |
| **Commit** | Un instantané du code, avec un message qui dit pourquoi |
| **Push** | Envoyer vos commits sur GitHub |
| **Pull request (PR)** | La demande d'intégrer une branche dans `main`, avec discussion, CI et revue |
| **Revue** (*review*) | La relecture d'une PR par une autre personne : commenter, demander des changements, approuver |
| **CI** | Les vérifications automatiques lancées sur chaque PR (lint, types, tests, build, sécurité) |
| **Squash merge** | Fusionner une PR en un seul commit sur `main` |
| **Rebase** | Rejouer vos commits au-dessus de la dernière version de `main` |
| **Conflit** | Deux modifications du même passage : Git vous demande de choisir |

## Le cycle complet, commande par commande

Exemple : l'issue **#12** demande l'outil de score d'un prospect.

**1. Partir d'un `main` à jour**

```bash
git switch main
git pull
```

**2. Créer une branche**

```bash
git switch -c feat/12-score-prospect-tool
```

Format : `<type>/<numéro-issue>-<description>` (`feat`, `fix`, `docs`, `chore`, `ci`, `test`, `refactor`…).

**3. Travailler par petits commits**

```bash
git status
git add src/logic-functions/score-prospect.ts
git commit -m "feat: add score-prospect tool"
```

Un commit = une idée. Message en anglais, à l'impératif, au format [Conventional Commits](https://www.conventionalcommits.org/fr/).

**4. Vérifier en local**

```bash
yarn lint && yarn typecheck && yarn test:unit && yarn upshift dev:build
```

**5. Pousser et ouvrir la PR en brouillon**

```bash
git push -u origin HEAD
gh pr create --draft --fill
```

Sans la GitHub CLI : ouvrez le lien affiché après le `push`. Complétez le modèle : ce qui change, `Closes #12`, comment tester, statut de la capacité. Ajoutez le jalon du sprint.

**6. Passer la PR en « prête pour revue »** quand la CI est verte, et déplacez la carte en **In Review**.

```bash
gh pr ready
```

**7. Répondre à la revue** : corrigez par de nouveaux commits sur la même branche, répondez à chaque commentaire, résolvez les conversations traitées.

```bash
git add .
git commit -m "fix: handle missing company size"
git push
```

**8. Fusionner** : une fois approuvée et verte, **Squash and merge**. La branche distante est supprimée, l'issue se ferme. En local :

```bash
git switch main
git pull
git branch -d feat/12-score-prospect-tool
```

## Garder sa branche à jour

`main` a avancé pendant que vous travailliez :

```bash
git fetch origin
git rebase origin/main
```

En cas de **conflit**, Git s'arrête et liste les fichiers concernés. Ouvrez-les, gardez la bonne version entre les marqueurs `<<<<<<<`, `=======` et `>>>>>>>`, supprimez les marqueurs, puis :

```bash
git add <fichier>
git rebase --continue
```

Vous êtes perdu·e ? `git rebase --abort` revient à l'état d'avant, sans rien perdre. Une fois le rebase terminé :

```bash
git push --force-with-lease
```

`--force-with-lease` refuse d'écraser le travail d'une autre personne. **Ne forcez jamais un push sur `main`** (c'est de toute façon bloqué).

## Réparer une erreur

| Situation | Solution |
| --- | --- |
| Faute dans le dernier message de commit, pas encore poussé | `git commit --amend` |
| Fichier oublié dans le dernier commit, pas encore poussé | `git add <fichier>` puis `git commit --amend --no-edit` |
| Annuler un commit déjà fusionné sur `main` | `git revert <sha>` dans une nouvelle PR |
| Modifications locales à mettre de côté | `git stash`, puis `git stash pop` |
| **Une clé ou un mot de passe committé** | **Révoquez la clé immédiatement**, puis prévenez l'encadrement. Voir [SECURITY.md](https://github.com/exceev-technology/upshift-agent/blob/main/SECURITY.md) |

## Les messages d'erreur courants

| Message | Cause | Que faire |
| --- | --- | --- |
| `protected branch hook declined` | Push direct sur `main` | Créez une branche et une PR |
| `push declined due to repository rule violations` / secret détecté | La protection à l'envoi a trouvé une clé | Retirez la clé de l'historique de la branche, révoquez-la |
| `Updates were rejected because the remote contains work…` | La branche distante a des commits que vous n'avez pas | `git pull --rebase`, puis `git push` |
| La PR affiche « This branch has conflicts » | `main` a modifié les mêmes lignes | Rebase sur `origin/main` (ci-dessus) |
| Vérification « PR title » en rouge | Titre hors format | Renommez la PR : `feat: add …` |
| Vérification « quality » en rouge | Lint, types, tests ou build | Ouvrez le journal de l'étape en rouge, reproduisez en local |

## Relire une PR

Relire, c'est apprendre deux fois : on découvre une autre partie du code, et on transmet ce qu'on sait.

1. Lisez l'issue liée : que doit faire la PR ?
2. Parcourez l'onglet *Files changed*. Commentez une ligne avec **+**, proposez un correctif avec le bouton *suggestion*.
3. Si besoin, testez en local : `gh pr checkout <numéro>`.
4. Préfixez vos commentaires : `bloquant:`, `question:`, `suggestion:`, `nit:`.
5. Concluez avec *Review changes* : **Comment**, **Request changes** ou **Approve**.

Ce qu'on vérifie et comment on le dit : voir la [section revue de CONTRIBUTING](https://github.com/exceev-technology/upshift-agent/blob/main/CONTRIBUTING.md#relire-une-pull-request).

## L'étiquette open source

- **Une issue avant le code.** On se met d'accord sur le quoi avant le comment.
- **Des PR petites et ciblées.** Plus faciles à relire, plus rapides à fusionner.
- **Tout s'écrit.** Une décision prise à l'oral se résume dans l'issue ou la PR.
- **On remercie.** Une revue est un cadeau de temps.
- **On ne prend pas un commentaire pour soi.** Il porte sur le code.

## Pour aller plus loin

- [Pro Git](https://git-scm.com/book/fr/v2), le livre de référence, en français
- [GitHub Skills](https://skills.github.com) : exercices interactifs (introduction à GitHub, revue de PR, résolution de conflits)
- [Learn Git Branching](https://learngitbranching.js.org/?locale=fr_FR) : comprendre les branches en jouant
- [Comment contribuer à l'open source](https://opensource.guide/fr/how-to-contribute/)
