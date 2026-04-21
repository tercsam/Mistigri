# 🎬 DVD Shelf

Une application web de gestion de watchlist films/séries, présentée comme une bibliothèque physique avec des boîtiers DVD 3D sur des étagères en bois.

## 🖼️ Aperçu

- **Étagères en bois** avec des boîtiers DVD 3D animés
- **Objets décoratifs** interactifs sur les étagères : chat peluche, plante géante, boule de cristal, oscar, popcorn, toupie Inception...
- **Hover/touch** : les boîtiers s'ouvrent pour révéler le poster du film
- **Dark mode** avec transition fluide
- **Responsive** : fonctionne sur desktop, tablette et mobile

## 🛠️ Stack technique

| Technologie | Rôle |
|---|---|
| React 18 + TypeScript | Frontend |
| Vite 5 | Build tool |
| Framer Motion | Animations |
| Zustand | State management |
| dnd-kit | Drag & drop |
| Supabase | Auth (Google OAuth) + Base de données + Storage |
| TMDB API | Données films/séries (recherche, détails, trending, streaming) |

## 📦 Installation

```bash
# Cloner le repo
git clone https://github.com/ton-user/dvd-shelf.git
cd dvd-shelf

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Remplir avec ta clé TMDB

# Lancer en développement
npm run dev
```

L'app sera disponible sur `http://localhost:5173`

## 🔑 Variables d'environnement

Créer un fichier `.env` à la racine :

```env
VITE_TMDB_API_KEY=ta_clé_tmdb_ici
```

La clé TMDB s'obtient gratuitement sur [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

Les credentials Supabase (URL + anon key) sont configurés directement dans `src/services/supabase.ts`.

## 🗄️ Base de données Supabase

### Tables

- **profiles** — id, username (unique), display_name, avatar_url, created_at
- **collections** — id, owner_id, name, is_public, created_at
- **dvds** — id, collection_id, tmdb_id, media_type, title, poster_url, spine_color, year, watched, rating, comment, position, added_at, watched_at
- **collaborators** — collection_id, user_id, role (viewer/editor)

### Triggers

- `on_auth_user_created` → crée automatiquement un profil + une collection "Ma Collection" pour chaque nouvel utilisateur

### Storage

- Bucket `avatars` (public) pour les photos de profil

## 📁 Architecture

```
src/
├── App.tsx                          # Point d'entrée, routing, layout
├── main.tsx                         # Entry point Vite
├── types/index.ts                   # Types TypeScript
├── utils/
│   ├── constants.ts                 # Config TMDB, couleurs, dimensions
│   └── colors.ts                    # Génération couleurs tranches
├── services/
│   ├── supabase.ts                  # Client Supabase
│   └── tmdb.ts                      # API TMDB (search, details, trending, providers)
├── hooks/
│   ├── useAuth.ts                   # Auth Google + profil
│   ├── useTheme.ts                  # Dark/light mode
│   └── useExtractColor.ts           # Extraction couleur dominante poster
├── store/
│   └── libraryStore.ts              # Zustand store (collections, DVDs, cache)
├── styles/
│   └── globals.css                  # Variables CSS, brush shapes, responsive
└── components/
    ├── ui/                          # Composants réutilisables
    │   ├── PaintSplash.tsx          # BlobField, BrushStroke, PaintBlob
    │   ├── StarRating.tsx           # Notation étoiles (interactif + readOnly)
    │   ├── Input.tsx                # Input stylisé
    │   └── Button.tsx               # Bouton stylisé
    ├── auth/
    │   └── LoginPage.tsx            # Page de connexion (clap SVG + Google OAuth)
    ├── home/
    │   ├── CollectionCard.tsx        # Carte collection (posters, compteur)
    │   ├── UserSearch.tsx            # Recherche d'utilisateurs
    │   └── NewsBanner.tsx            # Bandeau actualités cinéma (ticker TMDB)
    ├── profile/
    │   ├── ProfilePage.tsx           # Mon profil (stats, avatar, settings)
    │   ├── PublicProfilePage.tsx     # Profil public d'un autre utilisateur
    │   └── ShareModal.tsx            # Partage de collection
    ├── AddModal/
    │   └── AddModal.tsx              # Ajout de film/série (recherche TMDB)
    ├── DVDCase/
    │   ├── DVDCase.tsx               # Boîtier DVD 3D (tranche, ouverture, poster)
    │   └── DVDDetailModal.tsx        # Détail film (synopsis, casting, streaming)
    └── Shelf/
        ├── Shelf.tsx                 # Étagère complète (rangées, décos, DnD)
        ├── ShelfRow.tsx              # Rangée d'étagère (hover context, touch swipe)
        └── ShelfDecorations.tsx      # Objets décoratifs SVG animés
```

## ✨ Fonctionnalités

### Collections
- Créer, renommer, supprimer des collections
- Partager avec d'autres utilisateurs (viewer/editor)
- Compteur exact de films par collection

### Films / Séries
- Recherche TMDB avec autocomplétion
- Extraction automatique de la couleur dominante du poster pour la tranche
- Marquer comme vu avec note (1-5 étoiles) et commentaire
- Drag & drop pour réorganiser l'ordre sur l'étagère
- Bouton **🎲 Film au hasard** pour choisir un film non vu aléatoirement

### Détail film
- Synopsis, genres, durée, note TMDB
- Casting et réalisateur
- **Plateformes de streaming** (données JustWatch via TMDB) avec liens directs vers Netflix, Disney+, Prime Video, Canal+, etc.
- Boutons vers les sites cinéma (Allociné, CGR, UGC, Pathé)

### Bandeau actualités
- Ticker défilant continu avec les données TMDB
- 3 onglets : Tendances, Au cinéma, Prochainement
- Clic sur un poster → modal détail avec streaming + cinéma

### Profil
- Avatar personnalisable
- Statistiques (titres, vus, note moyenne)
- Profil public accessible par les autres utilisateurs

### Design
- Thème "Cinéma Artistique" — formes organiques (brush shapes), blobs SVG animés
- Dark mode persisté en localStorage
- 11 objets décoratifs SVG animés sur les étagères
- Responsive mobile avec touch swipe hover

## 🎨 Charte graphique

| Élément | Light | Dark |
|---|---|---|
| Fond | `#faf8f4` | `#121018` |
| Texte | `#1a1a1a` | `#e8e4de` |
| Rouge cinéma | `#c41e3a` | `#e84060` |
| Doré | `#b8860b` | `#d4a030` |

Polices : **Playfair Display** (titres) + **DM Sans** (corps)

## 📱 Mobile

- Header simplifié (logo + nom collection + icônes)
- Bottom bar avec navigation contextuelle
- Touch swipe : glisser le doigt sur les tranches = hover
- Tap sur un DVD = ouverture brève + modal détail
- Chat et plante toujours visibles, autres décos masquées
- DVD réduits : spine 22px, hauteur 140px

## 📜 Licence

MIT

## 🙏 Crédits

- Données films/séries : [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Données streaming : [JustWatch](https://www.justwatch.com/) via TMDB
- Hébergement BDD : [Supabase](https://supabase.com/)
