# Magnum Immobilière — Site vitrine

Site vitrine complet pour une agence immobilière de prestige. HTML / CSS / JS natifs, sans dépendance, prêt pour GitHub Pages ou tout hébergement statique.

## Structure

```
index.html   → structure complète des 18 sections
style.css    → design system (variables, typographie, layout, animations)
script.js    → navigation, carrousels, filtres, accordéon, reveal au scroll
```

## Mise en ligne sur GitHub Pages

1. Poussez ces trois fichiers à la racine d'un dépôt.
2. Repository → Settings → Pages → Source : `main` / `/ (root)`.
3. Le site est publié sur `https://<votre-utilisateur>.github.io/<votre-repo>/`.

## À personnaliser avant mise en production

- **Images** : les visuels proviennent d'Unsplash à titre de démonstration. Remplacez-les par vos propres photographies (les biens, prix, adresses et témoignages sont fictifs).
- **Formulaires** : le formulaire de contact et l'inscription newsletter affichent une confirmation côté client uniquement — connectez-les à un service d'envoi (Formspree, Netlify Forms, back-end propre, etc.) pour recevoir réellement les messages.
- **Polices** : Fraunces (display) et Manrope (texte), chargées via Google Fonts.
- **Couleurs** : variables CSS en tête de `style.css` (`--bg`, `--gold`, `--white`…) pour ajuster rapidement l'identité.

## Compatibilité

Responsive de 360px à 4K, animations désactivées automatiquement si `prefers-reduced-motion` est activé, focus clavier visible sur tous les éléments interactifs.
