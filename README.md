# TP3 — Microservices avec NestJS

## Présentation

Ce projet implémente une architecture **microservices** avec **NestJS**.
L'application est composée de trois services :

- **users-service** : gestion des utilisateurs
- **orders-service** : gestion des commandes
- **api-gateway** : point d'entrée unique pour les clients

Chaque service est indépendant, sécurisé avec **JWT**, documenté avec **Swagger** et conteneurisé avec **Docker**.

---

## Architecture

Architecture Micro Service : 

- api-gateway
- users-service
- orders-service
- docker-compose.yml

Chaque service suit une structure inspirée de la **Clean Architecture** :

- domain
- application
- adapter.in
- infrastructure

---

## Fonctionnalités

### Users Service
- Création d’utilisateur
- Lecture d’utilisateur
- Mise à jour d’utilisateur
- Authentification JWT

Champs utilisateur :

id  
name  
email  
password  
role  

### Orders Service
- Création de commande
- Lecture de commande

Champs commande :

id  
userId  
status  
totalAmount  
createdAt  

Statuts possibles :

CREATED  
PAID  
SHIPPED  

---

## API Gateway

La gateway centralise les requêtes :

/users  → users-service  
/orders → orders-service  

Elle redirige les requêtes vers les microservices via HTTP.

---

## Sécurité

Authentification avec **JWT**.

1. Login via :

POST /auth/login

2. Utiliser le token dans les requêtes :

Authorization: Bearer <token>

---

## Documentation API

Swagger est disponible sur :

http://localhost:3000/api-docs  
http://localhost:3001/api-docs  
http://localhost:3002/api-docs  

---

## Installation

### Prérequis

- Node.js
- npm
- Docker

---

## Lancer l'application

Avec Docker :

```bash
docker compose -f docker-compose.yml up -d --build
```

Services disponibles :

API Gateway → http://localhost:3000  
Orders Service → http://localhost:3001  
Users Service → http://localhost:3002  

---

## Commandes PowerShell pour tester l'API

### Users Service

#### Authentification (login)

```powershell
$login = Invoke-RestMethod -Method Post `
-Uri "http://localhost:3002/auth/login" `
-ContentType "application/json" `
-Body '{"email":"alice@test.com","password":"secret123"}'

$token = $login.access_token
```

#### Créer un utilisateur

```powershell
Invoke-RestMethod -Method Post `
-Uri "http://localhost:3002/users" `
-Headers @{ Authorization = "Bearer $token" } `
-ContentType "application/json" `
-Body '{"name":"Bob","email":"bob@test.com","password":"secret123","role":"admin"}'
```

#### Récupérer un utilisateur

```powershell
Invoke-RestMethod -Method Get `
-Uri "http://localhost:3002/users/1" `
-Headers @{ Authorization = "Bearer $token" }
```

#### Modifier un utilisateur

```powershell
Invoke-RestMethod -Method Patch `
-Uri "http://localhost:3002/users/1" `
-Headers @{ Authorization = "Bearer $token" } `
-ContentType "application/json" `
-Body '{"name":"Bob Updated","email":"bob@test.com","password":"secret123","role":"admin"}'
```

---

### Orders Service

#### Créer une commande

```powershell
Invoke-RestMethod -Method Post `
-Uri "http://localhost:3001/orders" `
-Headers @{ Authorization = "Bearer $token" } `
-ContentType "application/json" `
-Body '{"userId":1,"status":"CREATED","totalAmount":99.99}'
```

#### Récupérer une commande

```powershell
Invoke-RestMethod -Method Get `
-Uri "http://localhost:3001/orders/1" `
-Headers @{ Authorization = "Bearer $token" }
```

---

### API Gateway

La gateway permet d'accéder aux microservices via un point d'entrée unique.

#### Créer un utilisateur via la Gateway

```powershell
Invoke-RestMethod -Method Post `
-Uri "http://localhost:3000/users" `
-Headers @{ Authorization = "Bearer $token" } `
-ContentType "application/json" `
-Body '{"name":"Bob","email":"bob@test.com","password":"secret123","role":"admin"}'
```

#### Récupérer un utilisateur via la Gateway

```powershell
Invoke-RestMethod -Method Get `
-Uri "http://localhost:3000/users/1" `
-Headers @{ Authorization = "Bearer $token" }
```

#### Créer une commande via la Gateway

```powershell
Invoke-RestMethod -Method Post `
-Uri "http://localhost:3000/orders" `
-Headers @{ Authorization = "Bearer $token" } `
-ContentType "application/json" `
-Body '{"userId":1,"status":"CREATED","totalAmount":99.99}'
```

#### Récupérer une commande via la Gateway

```powershell
Invoke-RestMethod -Method Get `
-Uri "http://localhost:3000/orders/1" `
-Headers @{ Authorization = "Bearer $token" }
```

---

## Tests

Tests avec **Jest**.

Tests unitaires :

npm run test

Tests d'intégration :

npm run test:e2e

---

## Technologies

- NestJS
- TypeScript
- JWT
- Swagger
- Docker
- Jest
