# Agents et skills autonomes pour Upshift V2

Des agents au service des processus de l’entreprise. Cas d’application : le CRM.

Projet Innovation ECC 2026 · Sujet 01 · Référence étudiants · 20 octobre 2026

## Upshift, pour l’ensemble de l’entreprise

Upshift digitalise les processus commerciaux et opérationnels : prospection et CRM, devis et commandes, achats et stocks, projets et installations, SAV et maintenance, tableaux de bord et reporting.

## La mission du projet

Créer des agents et skills réutilisables dans Upshift V1 en prenant **le CRM comme cas d’application**. Améliorer ce module, puis démontrer la recherche de prospects, leur qualification et la progression des affaires jusqu’à leur conclusion.

## L’ambition produit

Préparer les fonctions agentiques natives d’Upshift V2 pour les différents processus de l’entreprise : une **super-intelligence opérationnelle** qui relie données, décisions et actions. Jev de TypeSafe et plusieurs familles de modèles d’IA pourront intervenir dans ce système.

## Les repères

| Bootcamp | Organisation | Soutenance du MVP |
| --- | --- | --- |
| 15–21 octobre 2026 | Scrum · Sprints d’une semaine | 8 décembre 2026 |

## L’espace de travail

**ECC Upshift Agents**. Les étudiants y améliorent le CRM, créent les agents et leurs skills, testent les parcours et mesurent les résultats sur l’activité retenue.

> Socle de démonstration proposé : quatre agents, huit skills réutilisables, trois scénarios progressifs et un parcours commercial complet. Les travaux validés constituent une base pour V2.

## Sommaire

- [01 · Mission et question de recherche](#01--mission-et-question-de-recherche)
- [02 · Upshift et les processus de l’entreprise](#02--upshift-et-les-processus-de-lentreprise)
- [03 · La dimension innovation](#03--la-dimension-innovation)
- [04 · Construire une base pour Upshift V2](#04--construire-une-base-pour-upshift-v2)
- [05 · Périmètre proposé pour le MVP](#05--périmètre-proposé-pour-le-mvp)
- [06 · Des recherches aux cas d’usage](#06--des-recherches-aux-cas-dusage)
- [07 · Configurer agents et skills](#07--configurer-agents-et-skills)
- [08 · Quatre agents pour le cycle commercial](#08--quatre-agents-pour-le-cycle-commercial)
- [09 · Huit skills réutilisables](#09--huit-skills-réutilisables)
- [10 · Du prospect à l’affaire conclue](#10--du-prospect-à-laffaire-conclue)
- [11 · Jev : décisions et scoring](#11--jev--décisions-et-scoring)
- [12 · Plusieurs modèles, des actions communes](#12--plusieurs-modèles-des-actions-communes)
- [13 · Une autonomie progressive et déléguée](#13--une-autonomie-progressive-et-déléguée)
- [14 · Intégration, fiabilité et maîtrise des données](#14--intégration-fiabilité-et-maîtrise-des-données)
- [15 · Évaluer l’utilité et la fiabilité](#15--évaluer-lutilité-et-la-fiabilité)
- [16 · Organisation Scrum et sprints](#16--organisation-scrum-et-sprints)
- [17 · Livrables et critères de recette](#17--livrables-et-critères-de-recette)
- [18 · Soutenance et démarrage](#18--soutenance-et-démarrage)
- [19 · Références et statut des informations](#19--références-et-statut-des-informations)

## 01 · Mission et question de recherche

### Question centrale

Comment composer, dans Upshift, des agents et skills réutilisables capables de prendre en charge les processus de l’entreprise, en combinant plusieurs modèles d’IA et en maîtrisant les décisions, les permissions et les actions ? Le projet étudie cette question sur le cas du CRM, de la recherche de prospects à la conclusion d’une affaire.

### Hypothèses à tester

- **Utilité métier :** une chaîne intégrée peut réduire les tâches manuelles, les ressaisies et les ruptures de suivi commercial.
- **Réutilisation :** un catalogue de skills partagé peut faciliter la création de plusieurs agents sans dupliquer les règles métier.
- **Complémentarité des modèles :** des décisions structurées avec Jev et des capacités d’analyse ou de rédaction avec d’autres modèles peuvent améliorer le compromis qualité, délai et coût.

Ces hypothèses seront confrontées à des parcours comparables. Un résultat défavorable reste recevable si les mesures, les causes et les limites sont expliquées.

### Quatre notions à distinguer

| Notion | Rôle dans le projet |
| --- | --- |
| Agent | Porte une mission, un contexte, des déclencheurs, un périmètre et un état d’exécution. |
| Skill | Savoir-faire réutilisable : consignes, connaissances, étapes et critères de résultat. |
| Outil ou action | Opération concrète exécutée par le système : rechercher, créer une fiche, préparer un message. |
| Coordination | Organise les dépendances, les passages entre agents, les attentes et les reprises. |

### Un processus opérationnel dans Upshift

L’utilisateur configure une mission et suit les résultats, exceptions et validations dans Upshift. Les agents exécutent les actions préautorisées sans redemander une confirmation à chaque étape. Ils attendent lorsqu’une information ou une décision humaine manque.

Le CRM et le cycle commercial constituent le cas d’application étudiant au sein de cette plateforme. Les recherches déjà réalisées déterminent le secteur, les critères de qualification, les étapes d’une affaire et les conditions de sa conclusion.

> Le résultat attendu est un système qui agit et vérifie ses effets. La qualité des données, la pertinence du processus et les contrôles font partie de l’innovation.

## 02 · Upshift et les processus de l’entreprise

### Du premier contact au reporting

Upshift relie les étapes de l’activité dans une plateforme simple, adaptée aux processus de l’entreprise. Une fiche commune rassemble les informations, les échanges et l’historique, réutilisés du premier contact au reporting.

Référence produit : **Upshift presentation v1.pdf**, document fourni, pages 3, 5, 7 et 8.

### Le parcours présenté dans le produit

| Étape | Processus et informations reliés |
| --- | --- |
| Prospection et CRM | Prospects, premiers échanges, opportunités et suivi de la relation client. |
| Devis et commandes | Préparation et validation des devis, puis transformation du devis signé en commande. |
| Achats et stocks | Suivi des achats et des stocks dans la continuité du parcours commercial. |
| Projets et installations | Transformation d’une commande en projet et suivi des installations. |
| SAV et maintenance | Tickets SAV et suivi de la maintenance des installations. |
| Tableaux de bord et reporting | Pipeline commercial, indicateurs et tableaux de bord de direction. |

Le parcours s’adapte au métier de chaque entreprise. Le CRM constitue une étape de cette plateforme ; il sert ici de terrain d’expérimentation.

### Les briques communes à réutiliser

Inventorier les objets, champs, relations, vues, workflows, tableaux de bord, permissions et interfaces disponibles. Vérifier les capacités d’IA, les agents, les skills, les extensions et les connecteurs nécessaires au projet.

### Un audit concret avant de construire

Identifier la version déployée, les fonctions activées et les droits disponibles. Pour chaque brique : **présente et testée / présente mais non configurée / absente / à vérifier**.

Privilégier la configuration et les extensions de l’existant. Ajouter un service spécifique uniquement si une capacité nécessaire manque. La documentation générale ne prouve pas que chaque fonction est activée dans l’espace étudiant.

> Le projet expérimente les agents sur le CRM et prépare un socle réutilisable pour les autres processus d’Upshift.

## 03 · La dimension innovation

### Une chaîne métier portée par plusieurs agents

La contribution visée est une expérience unique dans Upshift : les agents relient données, décisions et actions au sein d’un processus métier. Le cas CRM permet d’en éprouver la continuité, de la recherche de prospects au suivi des affaires.

### Quatre apports à démontrer

| Axe | Contribution | Preuve attendue |
| --- | --- | --- |
| Skills composables | Partager un savoir-faire entre plusieurs agents. | Un skill est utilisé dans deux missions, sans copie de sa logique. |
| Autonomie de bout en bout | Relier acquisition, qualification, engagement et suivi des affaires. | Un dossier passe plusieurs étapes avec contrôles, attentes et reprise. |
| IA à plusieurs modèles | Combiner Jev et les modèles choisis selon la tâche. | Changer de modèle via la configuration ; comparer les résultats. |
| Délégation vérifiable | Lier toute action à des droits, des faits et un résultat. | Action tracée, exception visible, interdiction respectée. |

### Des inspirations, pas des dépendances imposées

**GojiBerry** inspire la détection de prospects, la priorisation par signaux et l’engagement commercial. **Hark** inspire la délégation d’un objectif, les actions proposées et leur exécution dans une expérience unifiée. Les étudiants retiennent les principes utiles à leur activité.

Sources : [GojiBerry](https://gojiberry.ai/) · [Hark](https://hark.com/).

Le parcours métier doit être piloté depuis Upshift. Des API de données, de messagerie ou de modèles peuvent rester nécessaires ; leur utilisation est documentée. Le projet ne suppose ni la copie de ces produits ni la reproduction de toutes leurs fonctions.

### Une super-intelligence opérationnelle

L’ambition est d’associer contexte de l’entreprise, mémoire utile, modèles, règles et outils pour anticiper les besoins et agir avec précision. Dans le cas CRM du MVP, cela se mesure par des prospects pertinents, des actions correctes, une continuité du suivi et une réduction éventuelle du temps humain.

> L’innovation est une contribution d’usage, de produit et d’intégration. L’équipe doit établir ce qui apporte une valeur supplémentaire par rapport au CRM manuel ou à une règle fixe.

## 04 · Construire une base pour Upshift V2

### La destination produit

Upshift V2 a vocation à proposer nativement des agents et skills sur l’ensemble du parcours métier, de la prospection au reporting. Leur configuration, leur coordination et leur supervision feront partie du produit ; chaque entreprise définira leur activation et leurs délégations.

Le projet étudiant fournit des composants et des résultats qui seront sélectionnés puis industrialisés pour cette évolution.

### Les éléments à transmettre

| Acquis du MVP | Base réutilisable pour V2 | Étape suivante |
| --- | --- | --- |
| Cas CRM amélioré | Modèle métier, états et parcours validés. | Éprouver la réutilisation sur d’autres processus. |
| Agents et skills | Catalogue versionné, paramètres et tests. | Distribution, migration et suivi des versions. |
| Coordination | Déclencheurs, attentes, passages entre agents et reprises. | Exploitation durable et montée en charge. |
| Jev et autres modèles | Adaptateurs, critères de choix et résultats comparatifs. | Étendre les connecteurs testés et contrôler les coûts. |
| Actions et permissions | Contrats, contrôles, validations et journal. | Renforcer l’isolation et la gouvernance. |

### Toutes les tailles d’entreprise, progressivement

**TPE :** des agents prêts à configurer pour les tâches récurrentes. **PME :** des responsabilités et validations adaptées aux équipes. **Grandes entreprises :** des périmètres, intégrations et contrôles plus fins.

Le MVP porte sur une activité choisie. Sa démonstration ne suffit pas à valider tous les secteurs, toutes les intégrations ou toutes les tailles d’organisation.

### Le dossier de transfert

Séparer le savoir-faire métier, les configurations, les adaptateurs de modèles et les outils d’action. Identifier ce qui est réutilisable, ce qui dépend de la version d’Upshift et ce qui reste expérimental. Expliquer comment le socle pourrait s’appliquer aux achats et stocks, aux projets et installations ou au SAV et à la maintenance, sans présenter ces extensions comme déjà validées.

> Trajectoire : **expérimenter sur V1 → mesurer et sélectionner → industrialiser → intégrer nativement dans V2**. La soutenance du 8 décembre valide le prototype et ses enseignements. L’industrialisation de V2 vient ensuite.

## 05 · Périmètre proposé pour le MVP

### Un démonstrateur commercial complet et borné

Le CRM est le cas d’application retenu pour ce projet. Choisir une activité à partir des recherches, puis couvrir une chaîne du prospect identifié à l’affaire conclue dans le jeu d’essai. Les enseignements alimentent le socle agentique des différents processus d’Upshift.

| Élément | Résultat proposé au 8 décembre |
| --- | --- |
| CRM amélioré | Données, relations, étapes, vues et prochaines actions adaptés au métier. |
| Quatre agents | Acquisition ; qualification ; engagement ; progression et conclusion des affaires. |
| Huit skills | Un catalogue réutilisable, documenté et versionné ; au moins un skill partagé. |
| Trois scénarios | Analyse ; action simple autonome ; parcours coordonné de bout en bout. |
| Déclenchement | Au moins un événement ou une planification lance le système sans nouvelle demande. |
| Jev | Un appel réel de décision ou de score, avec traitement de l’incertitude et des erreurs. |
| Plusieurs modèles | Deux fournisseurs de modèles génératifs réellement testés sur un même contrat. |
| Supervision | Simulation, pause, reprise, journal et validations ciblées dans Upshift. |
| Transfert vers V2 | Configurations, skills, outils, tests et conclusions réutilisables. |

### Conditions techniques à lever dès le départ

L’encadrement confirme les accès à l’espace, aux sources autorisées, à Jev et aux modèles retenus, ainsi que le budget d’essai. Gemini, GPT, DeepSeek, Qwen et Claude constituent la cible de connecteurs ; le dossier distingue ceux réellement testés de ceux restant à intégrer.

Un simulateur peut débloquer le développement si un accès manque. Il est signalé comme tel et ne valide pas l’intégration réelle correspondante. Toute réduction du socle est explicitée avec l’encadrement.

### Extensions après le parcours principal

Ajouter d’autres sources, canaux, skills, modèles ou activités. Les agents vocaux, le navigateur autonome généraliste, la création d’un nouveau modèle et la reconstruction complète d’un ERP restent hors du socle proposé.

> L’objectif est de démontrer une chaîne cohérente. Multiplier les agents sans mission distincte ni résultat vérifiable n’apporte pas de preuve d’innovation.

## 06 · Des recherches aux cas d’usage

### Capitaliser sur le travail déjà réalisé

Rassembler les entretiens, observations, analyses de processus, comparatifs et comptes rendus disponibles. En extraire les problèmes récurrents et les tâches concernées. Les cas présentés dans ce document sont des pistes ; ils ne remplacent pas les conclusions de l’équipe.

### Démarche de sélection

1. Décrire l’activité, les utilisateurs et le parcours actuel.
2. Identifier une tâche répétitive ou une rupture de suivi observable.
3. Vérifier que les données nécessaires existent dans le CRM ou peuvent y être ajoutées.
4. Définir ce que l’agent peut décider et ce qui reste une décision humaine.
5. Choisir une progression simple, puis un parcours commercial complet avec résultat vérifiable.
6. Justifier la sélection et écarter les scénarios trop risqués ou trop dépendants d’intégrations.

### Fiche de cas d’usage à compléter

| Champ | Questions à renseigner |
| --- | --- |
| Besoin et preuve | Quel problème ? Quelle observation, source ou recherche l’étaye ? Quel résultat commercial est attendu ? |
| Utilisateur | Qui réalise la tâche aujourd’hui et qui délègue à l’agent ? |
| Déclencheur | Nouveau signal, réponse d’un prospect, changement de statut, échéance ou lancement manuel ? |
| Entrées | Quelles données, quelle qualité, quels droits et quelles données manquantes ? |
| Actions et sortie | Quels enregistrements changent ? Quel résultat métier est attendu ? |
| Limites | Quelles conditions d’arrêt, validations et actions interdites ? |
| Mesure | Quel critère de réussite et quelle comparaison avec le parcours manuel ? |

### Prioriser sans supposer la valeur

Comparer la fréquence du besoin, sa valeur pour l’utilisateur, la disponibilité des données, la faisabilité dans Upshift V1, le risque et la facilité de mesure. Une tâche fréquente et bien définie est souvent une meilleure première démonstration qu’un scénario spectaculaire impossible à évaluer.

> Livrable de recherche : une synthèse des travaux existants, la fiche du processus retenu et trois scénarios mesurables. Si une hypothèse n’a pas été confirmée par le terrain, l’indiquer comme telle.

## 07 · Configurer agents et skills

### Parcours dans Upshift

**Choisir une mission → sélectionner les skills → configurer → simuler → activer → superviser.** Réutiliser les écrans disponibles et ajouter les éléments manquants dans l’expérience Upshift.

### La fiche d’un agent

| Paramètre | Contenu attendu |
| --- | --- |
| Mission et propriétaire | Objectif métier, responsable et résultat attendu. |
| Skills | Skills activés et versions utilisées. |
| Données et sources | Objets, champs, dossiers et connecteurs accessibles. |
| Déclencheurs | Événement, planification ou demande manuelle. |
| Modèles | Modèle d’analyse ou de rédaction ; décisions déléguées à Jev. |
| Actions et limites | Outils permis, volume, durée, coût et conditions d’arrêt. |
| Validations | Actions sensibles et personne habilitée à décider. |
| État | Brouillon, prêt à tester, actif ou en pause. |

### La fiche d’un skill

Décrire son identifiant, sa version, son objectif, ses entrées, ses sorties et ses étapes. Associer les connaissances utiles, les outils nécessaires, les conditions de réussite et les cas d’erreur. Exemple : « qualifier un prospect » peut être utilisé lors de l’acquisition et lors d’une réponse entrante.

Un skill contient un savoir-faire ; il n’accorde pas de droits supplémentaires. Les paramètres métier, comme le profil client idéal ou la grille de score, doivent pouvoir évoluer sans copier tout le skill.

### Écrans à démontrer

- **Catalogue :** agents, skills, missions et versions.
- **Configuration :** droits, sources, modèles et limites lisibles.
- **Simulation :** données consultées, décisions et actions prévues.
- **Supervision :** exécutions, résultats, exceptions, pause et reprise.
- **Validations :** action précise, contenu, éléments affectés et décision.

> Modifier un skill ou un modèle crée une configuration identifiable. Les exécutions déjà lancées conservent leur version ; la nouvelle version est testée avant activation.

## 08 · Quatre agents pour le cycle commercial

### Une équipe spécialisée, coordonnée dans Upshift

Les missions ci-dessous forment le socle proposé. Les noms, critères et étapes sont à adapter aux recherches métier. Le responsable de chaque dossier reste identifiable à tout moment.

| Agent | Mission et déclencheur | Résultat dans le CRM |
| --- | --- | --- |
| A · Acquisition | Rechercher des entreprises ou contacts à partir d’un profil cible et de sources autorisées, sur demande ou planification. | Prospect sourcé et daté, fiche créée ou rapprochée d’une fiche existante. |
| B · Qualification | Analyser un prospect ou un nouveau signal, vérifier les informations et appliquer la grille métier. | Score expliqué, priorité, informations manquantes et prochaine action. |
| C · Engagement | Préparer une prise de contact pertinente, traiter une réponse et organiser le suivi autorisé. | Brouillon ou message de test, réponse classée, tâche ou rendez-vous proposé. |
| D · Affaires | Faire progresser l’opportunité, préparer la proposition, suivre les étapes et constater la conclusion. | Opportunité à jour, proposition préparée, prochaine action et issue documentée. |

### Passages entre agents

L’acquisition transmet une fiche et ses sources. La qualification transmet les critères, les réserves et la priorité. L’engagement transmet le contexte des échanges et les prochaines étapes. Le suivi d’affaire poursuit le dossier jusqu’à son issue ou son arrêt justifié.

La coordination peut s’appuyer sur les workflows disponibles. Chaque passage enregistre un état et un identifiant de dossier ; elle ne dépend pas uniquement d’un échange de messages entre modèles.

### Deux règles de fonctionnement

- Une seule responsabilité active par étape : éviter que deux agents contactent simultanément le même prospect ou modifient des statuts incompatibles.
- Une information nouvelle peut relancer une qualification, sans effacer l’historique ni recommencer toute la chaîne.

### Ce que signifie « concrétiser une affaire »

Préparer les éléments utiles, traiter les objections, organiser les prochaines actions et suivre une proposition jusqu’à une acceptation, un refus ou une autre issue documentée. Une étape « gagnée » exige la preuve définie par le processus métier.

> Le modèle peut recommander une progression. Il ne constitue pas lui-même une preuve de commande, de signature ou d’acceptation du client.

## 09 · Huit skills réutilisables

### Un catalogue de savoir-faire métier

Chaque skill possède des exemples, des tests et une sortie vérifiable. Les appels aux outils restent limités à la délégation de l’agent qui utilise le skill.

| Skill | Entrées principales | Sortie vérifiable |
| --- | --- | --- |
| S1 · Rechercher | Profil client idéal, critères et sources autorisées. | Liste de candidats avec provenance et date. |
| S2 · Enrichir et dédupliquer | Candidat, preuves disponibles et fiches existantes. | Fiche rapprochée ou créée ; incertitudes conservées. |
| S3 · Qualifier et scorer | Profil, signaux, grille métier et fraîcheur des données. | Dimensions évaluées, score, réserves et version. |
| S4 · Choisir la prochaine action | État du dossier, objectif, actions permises et limites. | Action proposée, attente ou passage à un humain. |
| S5 · Préparer un contact | Contexte vérifié, offre et canal autorisé. | Brouillon pertinent sans fait inventé. |
| S6 · Analyser une réponse | Message entrant, contexte et étape courante. | Intention, objection, demande ou refus identifié. |
| S7 · Organiser le suivi | Réponse, responsable, échéances et tâches existantes. | Tâche ou proposition de rendez-vous sans doublon. |
| S8 · Préparer et suivre l’offre | Besoin qualifié, catalogue ou grille validée, conditions et preuves. | Proposition, suivi de l’acceptation et mise à jour contrôlée de l’affaire. |

### Réutilisation à prouver

S3 peut servir à qualifier un nouveau prospect puis à le réévaluer après une réponse. S4 peut être utilisé par les agents d’engagement et de suivi d’affaires. La même version et le même contrat de skill doivent être visibles dans les deux usages.

### Contrat minimum d’un skill

**Identifiant et version ; objectif ; entrées requises ; sorties attendues ; connaissances ; outils ; conditions d’arrêt ; effets possibles ; tests.** Distinguer une information absente d’une information négative. Ne pas inventer une adresse, un budget ou une intention pour compléter une fiche.

Les consignes guident l’agent. Les schémas de données, règles métier et permissions sont vérifiés par le code qui exécute les actions.

> Ces huit skills constituent un point de départ. Une équipe peut proposer un découpage différent si elle couvre le parcours, démontre la réutilisation et justifie ses choix.

## 10 · Du prospect à l’affaire conclue

### Le parcours de référence

**Trouver → enrichir → qualifier → engager → suivre → proposer → conclure.** Une progression peut attendre une réponse, revenir en qualification ou se terminer par un refus.

| Étape | Action observable | Condition de passage |
| --- | --- | --- |
| Trouver et enregistrer | Chercher dans une source autorisée, conserver la provenance et rapprocher la fiche. | Identité suffisamment établie ; pas de doublon certain. |
| Qualifier et prioriser | Évaluer le profil et les signaux selon la grille. | Informations suffisantes ou besoin de vérification explicite. |
| Engager | Préparer le message et exécuter l’envoi autorisé dans le canal d’essai. | Destinataire, contenu, fréquence et délégation valides. |
| Suivre l’échange | Identifier la réponse, créer la prochaine tâche ou proposer un rendez-vous. | Intérêt, objection ou refus effectivement observé. |
| Préparer l’offre | Composer une proposition depuis les données et conditions validées. | Besoin connu et validation des engagements selon la politique. |
| Constater l’issue | Enregistrer gagné, perdu ou différé et la pièce associée. | Preuve attendue présente ; droit et transition autorisés. |

### Un exemple à adapter aux recherches

Une entreprise de services recherche des clients correspondant à son offre. Un prospect est identifié, qualifié puis contacté dans le canal d’essai. Sa réponse déclenche une tâche de rendez-vous ; le besoin est précisé, une proposition préparée puis une acceptation fictive vérifiable permet de conclure le dossier.

Ce scénario est une trame de démonstration. Il ne décrit pas une vente réelle ni un résultat déjà obtenu par les étudiants.

### Branches et attentes obligatoires

Inclure un doublon, des données insuffisantes, un refus de contact et une proposition non acceptée. Le système doit pouvoir attendre un événement, reprendre au bon endroit et arrêter les relances lorsqu’une condition d’exclusion apparaît.

### Une conclusion fondée sur des faits

Une réponse positive vague n’équivaut pas à une commande. Définir la preuve requise : par exemple une acceptation explicite de la proposition identifiée ou une commande correspondante. Les engagements de prix, remises ou conditions suivent les limites et validations de l’entreprise.

## 11 · Jev : décisions et scoring

### Le rôle de TypeSafe AI

La documentation présente Jev comme un modèle qui évalue un état au moyen de questions typées. **Choice** choisit parmi des options ; **Score** évalue sur des niveaux décrits ; **Noul** estime une proposition binaire. Jev intervient ici comme composant de décision, appelé par l’orchestration Upshift.

Source : [Introduction TypeSafe](https://docs.typesafe.ai/introduction).

### Trois usages proposés

| Décision bornée | Exemple dans le CRM | Exploitation par Upshift |
| --- | --- | --- |
| Classer | Réponse : intéressé, objection, refus ou information insuffisante. | Orienter vers le skill adapté. |
| Évaluer | Adéquation au profil client ou force d’un signal documenté. | Prioriser les dossiers selon une grille explicite. |
| Vérifier | La réponse contient-elle une demande de rendez-vous ? | Proposer la prochaine étape, après les contrôles métier. |

### Construire un score interprétable

Séparer les dimensions : adéquation à la cible, pertinence du besoin, signal d’intention et temporalité. Décrire les niveaux de chaque dimension, puis combiner les résultats avec des poids métier versionnés. Les conditions d’exclusion sont vérifiées avant l’action.

Un Score Jev porte sur la position parmi les niveaux décrits. Une conversion vers 0–100 doit être définie par l’équipe. Le score de priorité obtenu n’est pas une probabilité de signature ; la disponibilité et la fraîcheur des preuves sont affichées séparément.

Source : [Primitives Score](https://docs.typesafe.ai/primitives/score).

### Utiliser l’incertitude correctement

Choice et Score renvoient des probabilités et une confiance calculée à partir de leur distribution. Noul n’a pas le même champ de confiance. Une confiance élevée ne garantit ni la vérité des données ni la réussite de la vente.

Définir les seuils sur les cas d’essai : agir dans la délégation, demander une vérification ou recueillir une information complémentaire. Un seuil élevé ne remplace jamais les permissions ni une validation obligatoire.

Source : [Confiance et probabilités](https://docs.typesafe.ai/confidence).

> L’équipe teste Jev sur des décisions courtes et explicites. L’analyse étendue, la rédaction et la planification peuvent relever d’autres modèles ; les actions restent exécutées et contrôlées par Upshift.

## 12 · Plusieurs modèles, des actions communes

### Une architecture proposée pour le projet

**Événement métier → coordination des agents → skills → modèles → action proposée → contrôles → outil métier → résultat.** Le MVP applique cette chaîne au CRM. Jev fournit des décisions bornées ; les autres modèles analysent, planifient ou rédigent selon le besoin.

### Des adaptateurs indépendants

La cible couvre **Gemini, GPT, DeepSeek, Qwen et Claude**, avec un adaptateur distinct pour TypeSafe/Jev. Pour chaque connecteur, vérifier le modèle exact, ses capacités, ses formats de sortie, ses limites et les données qui lui sont transmises.

Le SDK de Jev est un moyen d’appeler Jev ; il ne constitue pas à lui seul une passerelle universelle vers les autres modèles. La couche d’adaptation et de routage appartient à Upshift.

Source : [Accès à Jev par SDK ou API](https://docs.typesafe.ai/introduction/quickstart).

### Un contrat d’action typé et validé

| Élément | Règle du contrat proposé |
| --- | --- |
| Identité | Organisation, délégant, agent, skill et versions fixés par le système. |
| Action | Identifiant issu du registre autorisé et version du schéma. |
| Paramètres | Champs, types et valeurs admises validés à l’exécution. |
| Préconditions | État attendu du dossier et références des preuves nécessaires. |
| Répétition | Identifiant d’intention pour éviter de reproduire un effet. |
| Validation | Approbation liée au contenu exact, si la politique l’exige. |
| Résultat | Réussite, refus, attente ou erreur ; références des éléments modifiés. |

La sortie d’un modèle est une proposition. Le serveur refuse une action inconnue, un paramètre invalide, un accès interdit ou une preuve absente. Le typage à la compilation ne suffit pas : la validation s’applique aussi aux réponses reçues en cours d’exécution.

### Compatibilité à démontrer

Exécuter le même skill avec deux fournisseurs et conserver le même contrat métier. Mesurer qualité, délai et coût. Tracer le modèle réellement utilisé ; une relève en cas de panne conserve les restrictions de données et les droits. Un connecteur simulé ou non testé est clairement identifié.

> La coopération entre modèles passe par des états et résultats explicites. Le projet ne suppose ni fusion des modèles ni égalité de leurs capacités.

## 13 · Une autonomie progressive et déléguée

### Trois scénarios obligatoires dans la démonstration

| Niveau | Comportement | Preuve attendue |
| --- | --- | --- |
| 1 · Analyser | Rechercher dans un corpus autorisé, qualifier et proposer une priorité. | Sources, critères, réserves et résultat vérifiables. |
| 2 · Agir | Créer ou mettre à jour une fiche et organiser une prochaine action préautorisée. | Écriture réelle, déclenchement automatique, trace et absence de doublon. |
| 3 · Coordonner | Faire passer un dossier entre plusieurs agents jusqu’à une issue documentée. | Branches, attente, reprise, contrôles et conclusion justifiée. |

### La politique d’action prime sur le modèle

| Catégorie | Comportement attendu |
| --- | --- |
| Consultation autorisée | Accès dans le périmètre du délégant et de la mission. |
| Modification bornée | Exécution autonome si elle est préautorisée et respecte les préconditions. |
| Contact externe | Canal, destinataire, contenu, fréquence et conditions d’arrêt contrôlés. |
| Engagement commercial | Limites de prix et conditions explicites ; approbation ciblée lorsque requise. |
| Action interdite | Refus, même si un modèle ou un texte du CRM la recommande. |

### Une expérimentation maîtrisée

Les étudiants utilisent des données fictives ou anonymisées, un corpus de prospects autorisé et des destinataires de test. Une démonstration d’envoi doit passer par le canal prévu. Le dossier indique clairement les actions réellement exécutées, simulées ou laissées en brouillon.

Pour une décision sensible, présenter la fiche concernée, le contenu exact et l’effet attendu. Après approbation, revérifier les droits et l’état du dossier avant d’exécuter.

### Pause et arrêt

La pause empêche les nouvelles actions ; les actions déjà réalisées restent visibles. Un refus de contact arrête les relances correspondantes. Un budget épuisé, une source indisponible ou une donnée indispensable absente produit un état explicite, sans succès fictif.

## 14 · Intégration, fiabilité et maîtrise des données

### Partir des capacités vérifiées d’Upshift V1

L’équipe choisit son intégration après l’audit : interfaces existantes, extensions disponibles et composants à ajouter. Le sujet n’impose pas une reconstruction technique. Réutiliser les agents, skills, workflows et extensions disponibles. MCP est une interface possible pour exposer des outils.

### Chaîne d’exécution de référence

**Événement ou échéance → exécution persistée → contexte autorisé → décision → contrôle → action métier → résultat enregistré.**

La configuration et la supervision sont accessibles depuis Upshift. Un éventuel service d’exécution séparé reste un composant interne du prototype, relié à l’identité et aux règles d’accès.

### Composants minimums

- Un registre des agents, skills, configurations et versions.
- Un ensemble limité d’outils métier, avec entrées validées et droits vérifiés.
- Une coordination persistée avec déclencheurs, attentes, limites, état et reprise.
- Un journal des actions et, si nécessaire, une file d’approbation.

### Règles à appliquer

| Risque | Comportement à démontrer |
| --- | --- |
| Données hors périmètre | Filtrage avant accès et avant action, y compris après changement de droits. |
| Événement reçu deux fois | Une même intention ne crée pas deux fiches, tâches ou messages. |
| Données modifiées entre-temps | Vérification de l’état courant avant écriture ; conflit visible si nécessaire. |
| Erreur au milieu du parcours | Étapes déjà réalisées conservées ; reprise sans duplication ni succès fictif. |
| Instructions malveillantes dans le CRM | Contenu traité comme une donnée, sans modification des droits ni des règles. |
| Budget ou service indisponible | Arrêt contrôlé, statut explicite et possibilité de diagnostic. |

### Préserver la possibilité de comprendre et corriger

Journaliser le délégant, l’agent, le déclencheur, les données consultées, les actions tentées et leurs résultats. Conserver un résumé utile, sans secrets ni restitution de la pensée interne du modèle.

Restaurer une configuration ne défait pas les actions déjà réalisées. Définir et tracer une correction métier pour chaque action réversible. Tester sur des données fictives ou anonymisées dans l’espace dédié.

## 15 · Évaluer l’utilité et la fiabilité

### Comparer sur un même CRM

La comparaison principale oppose **le CRM amélioré utilisé manuellement** au **même CRM avec agents et skills**. Sur un cas adapté, ajouter une règle fixe comme référence. Comparer aussi deux modèles sur un même skill, puis Jev et l’alternative choisie sur une décision bornée.

### Protocole proposé

1. Définir les résultats attendus avant les essais.
2. Préparer au moins dix dossiers représentatifs et cinq cas d’erreur ou d’ambiguïté.
3. Séparer les cas de réglage des scores et seuils des cas utilisés pour l’évaluation finale.
4. Réinitialiser les données et utiliser les mêmes informations au même instant.
5. Mesurer les interventions, résultats, coûts et traces ; rejouer certains cas.
6. Présenter la taille de l’échantillon, les échecs et les limites.

### Indicateurs à relever

| Indicateur | Ce qui est mesuré |
| --- | --- |
| Prospects pertinents | Proportion de candidats retenus conformément au profil cible et aux preuves. |
| Qualité du scoring | Accord avec la grille métier ; erreur de priorité ; gestion des inconnues. |
| Actions correctes | Résultat métier, absence de doublon, destinataire et statut corrects. |
| Progression de l’affaire | Étapes franchies avec les preuves requises ; prochaine action disponible. |
| Autonomie effective | Dossiers éligibles terminés sans intervention ni correction imprévue. |
| Temps et consommation | Temps humain actif, délai total, appels et coût avec hypothèses. |
| Réutilisation | Skill partagé ; effort pour changer un paramètre ou un modèle. |
| Maîtrise | Accès interdits bloqués, approbations respectées, pauses et reprises. |

### Ne pas confondre démonstration et vente réelle

Une affaire gagnée dans le jeu d’essai prouve la bonne exécution du scénario. Elle ne démontre pas une hausse du chiffre d’affaires réel. Une mesure de conversion commerciale demande des observations réelles, une période suffisante et des conditions comparables.

> Un score élevé, une sortie bien typée ou un message bien rédigé ne suffisent pas. La réussite exige des actions correctes et un résultat métier justifié.

## 16 · Organisation Scrum et sprints

### Cadence conservée

Bootcamp du 15 au 21 octobre 2026, puis sprints d’une semaine. Chaque sprint comporte un objectif, une démonstration et une rétrospective. Le planning ci-dessous est une proposition ; le MVP doit être figé avant la soutenance du 8 décembre.

| Période | Objectif | Preuve en revue |
| --- | --- | --- |
| Bootcamp · 15–21 oct. | Recherches, prise en main et cadrage. | Besoins, parcours choisi et questions ouvertes. |
| Sprint 1 · 22–28 oct. | Auditer Upshift et définir le catalogue. | Capacités vérifiées, quatre missions, huit skills et accès aux modèles. |
| Sprint 2 · 29 oct.–4 nov. | Améliorer le CRM et préparer les preuves. | Parcours manuel, corpus d’essai, grille métier et premiers outils. |
| Sprint 3 · 5–11 nov. | Acquisition et qualification. | Recherche sourcée, déduplication, appel Jev et score vérifiable. |
| Sprint 4 · 12–18 nov. | Engagement et autonomie simple. | Message de test, réponse traitée, déclencheur et actions sans doublon. |
| Sprint 5 · 19–25 nov. | Parcours d’affaire et coordination. | Quatre agents, skills partagés, proposition et conclusion documentée. |
| Sprint 6 · 26 nov.–2 déc. | Comparer et fiabiliser. | Deux fournisseurs testés, évaluation, erreurs et composants candidats pour V2. |
| Sprint 7 · 3–9 déc. | Stabiliser, documenter et soutenir. | Version figée avant le 8, soutenance le 8 et dossier de transfert. |

### Définition d’une tâche terminée

Besoin et résultat clairs ; intégration dans l’espace ; droits et erreurs traités ; scénario reproductible ; versions identifiables ; résultat observable dans le CRM. La documentation distingue toujours « disponible », « testé », « simulé » et « prévu ».

### Arbitrer en cas de retard

Réduire d’abord le nombre de canaux, de sources et de modèles supplémentaires. Préserver le parcours principal, les skills réutilisables et les contrôles. Toute modification des objectifs proposés est discutée avec l’encadrement et reportée dans le dossier.

> Les étudiants n’ont pas à recréer tout le moteur d’Upshift. Le temps doit porter sur le besoin métier, les skills, les intégrations nécessaires et les preuves d’utilité.

## 17 · Livrables et critères de recette

### Livrables à remettre

- **Recherche et CRM :** sources métier, besoin, parcours initial et améliorations.
- **Catalogue :** quatre agents, huit skills, versions et exemples.
- **Prototype :** configuration, coordination, supervision et parcours commercial.
- **Intégrations :** Jev, deux fournisseurs testés, contrats d’actions et limites.
- **Évaluation :** protocole, résultats, erreurs, coûts et traces reproductibles.
- **Transfert V2 :** code ou exports, tests, procédure de reprise et priorités.
- **Soutenance :** démonstration reproductible et solution de secours enregistrée.

### Recette du socle proposé

| Vérification | Critère observable |
| --- | --- |
| Configuration | Paramètres usuels modifiables dans Upshift ; versions conservées. |
| Réutilisation | Un même skill utilisé par au moins deux agents. |
| Acquisition | Prospect sourcé et daté ; doublon rapproché ou signalé. |
| Qualification | Score expliqué, informations manquantes et incertitude traitées. |
| Engagement | Action autorisée correcte ; refus de contact respecté. |
| Affaire | Proposition suivie ; conclusion fondée sur la preuve prévue. |
| Jev et modèles | Appel réel à Jev et deux fournisseurs génératifs testés. |
| Coordination | Attente, reprise, branche conditionnelle et exception démontrées. |
| Contrôles | Paramètre invalide ou accès interdit bloqué ; validation requise respectée. |
| Fiabilité | Déclencheur rejoué sans doublon ; panne sans succès fictif ; pause effective. |
| Traçabilité | Dossier relié aux agents, skills, modèles, actions et résultats. |

> Les scénarios prévoient réussites, refus et informations manquantes. Une démonstration qui passe uniquement par les cas favorables ne valide pas la maîtrise de l’autonomie.

## 18 · Soutenance et démarrage

### Trame proposée pour quinze minutes

La durée officielle sera confirmée par l’encadrement.

1. **Besoin métier — 2 min :** recherches, problème et chaîne commerciale retenue.
2. **CRM et catalogue — 2 min :** améliorations, quatre missions et skills.
3. **Parcours autonome — 5 min :** acquisition, score, contact de test, réponse, proposition et conclusion documentée.
4. **Maîtrise — 2 min :** cas incertain, refus, validation, pause ou événement rejoué.
5. **Mesures et modèles — 3 min :** résultats, rôle de Jev, comparaison et limites.
6. **Contribution à V2 — 1 min :** socle réutilisable et ouverture vers les autres processus de l’entreprise.

### Ce que l’équipe doit savoir expliquer

Pourquoi un agent apporte une valeur ; ce qu’un skill réutilise ; quels outils exécutent réellement les actions ; pourquoi Jev ou un autre modèle est choisi ; comment les droits sont appliqués ; et quelle preuve autorise à déclarer une affaire conclue.

### Premières actions dans l’espace étudiant

- Confirmer les accès à **ECC Upshift Agents**, les rôles et le budget.
- Auditer la version et les fonctions d’Upshift réellement disponibles.
- Mobiliser les recherches déjà effectuées et choisir une activité.
- Décrire les quatre missions et les huit skills ; identifier les réutilisations.
- Préparer le corpus de prospects, les réponses et les preuves fictives de conclusion.
- Confirmer les accès à Jev et aux modèles ; réaliser rapidement un parcours manuel.

### Petit lexique

**Prospect ou lead :** contact ou entreprise susceptible de devenir client. **Profil client idéal :** critères de la cible commerciale. **Score :** évaluation selon une grille, distincte d’une probabilité de vente. **Skill :** savoir-faire métier réutilisable. **Orchestration :** coordination des exécutions et de leurs états. **Action typée :** opération dont la structure et les paramètres sont définis et validés.

> Le projet prépare une capacité native de V2 : des agents et skills que l’entreprise peut configurer pour comprendre son activité, agir dans ses limites et améliorer sa continuité opérationnelle.

## 19 · Références et statut des informations

### Sources primaires consultées le 20 octobre 2026

| Référence | Usage dans le cadrage |
| --- | --- |
| Upshift presentation v1.pdf · Document fourni | Parcours métier (p. 3–4), fonctions communes et configuration (p. 5, 7–8). |
| [Upshift · Site officiel](https://upshiftcloud.com/) | Digitalisation des processus commerciaux et opérationnels. |
| [Upshift · Présentation](https://docs.upshiftcloud.com/en/getting-started/introduction) | Vision de l’entreprise dans une plateforme, personnalisation et IA. |
| [GojiBerry](https://gojiberry.ai/) | Inspiration pour la prospection, les signaux et la priorisation. |
| [Hark](https://hark.com/) | Inspiration pour la délégation et l’exécution dans une expérience unifiée. |
| [TypeSafe · Introduction](https://docs.typesafe.ai/introduction) | Jev et les questions typées Choice, Score et Noul. |
| [TypeSafe · Score](https://docs.typesafe.ai/primitives/score) | Niveaux descriptifs, score et distribution des résultats. |
| [TypeSafe · Confiance](https://docs.typesafe.ai/confidence) | Interprétation de l’incertitude et usage des seuils. |
| [TypeSafe · Démarrage](https://docs.typesafe.ai/introduction/quickstart) | Accès par SDK ou API ; base du prototype d’intégration. |

### Distinguer trois niveaux de preuve

**Présentation produit et documentation :** indiquent le périmètre décrit. **Instance étudiante :** indique ce qui est effectivement disponible et configuré. **Expérimentation :** indique ce que l’équipe a réellement testé et mesuré.

Les agents, skills, contrats et critères proposés dans ce document constituent le cadrage du projet ; ils ne sont pas présentés comme des capacités déjà intégralement déployées dans Upshift.

### Références à joindre par les étudiants

Recherches existantes, entretiens ou observations mobilisés, version d’Upshift, documentation des modèles effectivement choisis, versions d’API et journal des essais. Les exemples métier du document restent à confronter à ces travaux.

### Identité visuelle

Document adapté de [upshiftcloud.com](https://upshiftcloud.com/) : logo, palette claire et indigo, polices Bricolage Grotesque, Inter et JetBrains Mono.
