# SubTracker – prenumerationsöversikt

Fullstack-app där användaren registrerar sina digitala prenumerationer (kostnad, kategori, betalningsintervall) och får en dashboard med bl.a. total månadskostnad och kostnad per kategori.

| Del | Teknik | I Azure |
|---|---|---|
| Backend | ASP.NET Core Web API (.NET 10, controllers), EF Core Code First, ASP.NET Core Identity | App Service (Linux, Free F1) |
| Databas | SQL Server – LocalDB lokalt | Azure SQL Database (gratiserbjudandet) |
| Frontend | React (Vite, JavaScript), React-Bootstrap, React Router, Axios | Static Web Apps (Free) – eller App Service om regionen inte tillåter det |
| CI/CD | GitHub Actions – ett workflow för backend och ett för frontend | |

## Inlämning

- GitHub: `<länk till repot>`
- Frontend: `<https://...azurestaticapps.net>`
- API (Scalar): `<https://...azurewebsites.net/scalar>`

## Arkitektur

```text
Webbläsare ──► Azure Static Web Apps (React)
    │
    └── HTTPS-anrop (CORS) ──► Azure App Service (API) ──► Azure SQL Database
```

```text
├── backend/SubTracker.Api/
│   ├── Controllers/   tar emot HTTP-anrop – tunna, ingen affärslogik
│   ├── Services/      affärslogik bakom interfaces (IAuthService, ITokenService …)
│   ├── Dtos/          in- och utdata för API:t (entiteter skickas aldrig direkt)
│   ├── Entities/      EF Core-entiteter (AppUser m.fl.)
│   ├── Mappings/      entitet → DTO
│   ├── Common/        ServiceResult/ServiceError – resultat från services
│   ├── Auth/          JWT-inställningar, token-validering, svenska Identity-fel
│   ├── OpenApi/       JWT-stöd i Scalar
│   ├── Data/          AppDbContext – relationer och index konfigureras här
│   ├── Migrations/    EF Core-migrationer
│   └── Program.cs     databas, Identity, autentisering, CORS, OpenAPI/Scalar
├── frontend/
│   ├── public/staticwebapp.config.json   gör att React Router fungerar i Azure
│   └── src/
│       ├── api/         axios-klient och API-klasser (AuthApi)
│       ├── auth/        AuthProvider (state), useAuth, ProtectedRoute, GuestRoute
│       ├── components/  återanvändbara komponenter
│       ├── hooks/       useForm
│       ├── pages/       en komponent per sida
│       └── utils/       validering
└── .github/workflows/  backend.yml, frontend.yml
```

## Kom igång lokalt

Krav: .NET 10 SDK, Node.js 22+, SQL Server LocalDB (följer med Visual Studio) och `dotnet-ef` (`dotnet tool install --global dotnet-ef`).

**1. Secrets** – sparas med user-secrets, alltså utanför repot (bara första gången per dator). Connection string:

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=(localdb)\MSSQLLocalDB;Database=SubTrackerDb;Trusted_Connection=True" --project backend/SubTracker.Api
```

JWT-nyckel (slumpas fram av Node):

```bash
dotnet user-secrets set "Jwt:Key" "$(node -e "console.log(require('crypto').randomBytes(64).toString('base64'))")" --project backend/SubTracker.Api
```

**2. API:t** – databasen skapas och migrationerna körs automatiskt vid start:

```bash
dotnet run --project backend/SubTracker.Api
```

Scalar (API-dokumentation): <https://localhost:7213/scalar>

**3. Frontend** – i en ny terminal:

```bash
cd frontend
npm install
npm run dev
```

Öppna <http://localhost:5173>. Startsidan visar om API:t och databasen svarar.

### Ändra datamodellen

```bash
dotnet ef migrations add <NamnPåÄndringen> --project backend/SubTracker.Api
```

Migrationen körs automatiskt nästa gång API:t startar – både lokalt och i Azure.

## Konfiguration och secrets

Inga lösenord, nycklar eller connection strings finns i repot. Lokal konfiguration och produktionskonfiguration hålls isär:

| Inställning | Lokalt | Produktion |
|---|---|---|
| `ConnectionStrings:DefaultConnection` | user-secrets | App Service → Environment variables → Connection strings |
| `Jwt:Key` | user-secrets | App Service → App setting `Jwt__Key` (en egen nyckel, inte samma som lokalt) |
| `Cors:AllowedOrigins` | `appsettings.Development.json` (`http://localhost:5173`) | App Service → App setting `Cors__AllowedOrigins__0` |
| `VITE_API_URL` | `frontend/.env.development` | GitHub-variabel, byggs in av `frontend.yml` |
| Deploy av API:t | – | GitHub secret `AZURE_WEBAPP_PUBLISH_PROFILE` |
| Deploy av frontend | – | GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN` (eller `AZURE_FRONTEND_PUBLISH_PROFILE` + variabeln `AZURE_FRONTEND_WEBAPP_NAME` om frontend körs i App Service) |

`appsettings.json` innehåller bara ofarliga standardvärden. Allt som börjar med `VITE_` hamnar i webbläsaren och får därför aldrig vara hemligt.

## Inloggning och säkerhet

- **ASP.NET Core Identity** lagrar användare och hashar lösenord. Kontot låses i 5 minuter efter 5 misslyckade inloggningar.
- **JWT (Bearer)** används eftersom frontend och API ligger på olika domäner i Azure, där cookies blockeras av många webbläsare. Token signeras med `Jwt:Key` och gäller i 60 minuter.
- **Utloggning** byter användarens security stamp i Identity. Varje token innehåller stampen och kontrolleras vid varje anrop, så gamla tokens slutar fungera direkt.
- **Skyddade routes** finns i båda lagren: `[Authorize]` i API:t och `ProtectedRoute` i React, som skickar utloggade användare till `/login`.
- **Validering** sker i båda lagren: DataAnnotations på DTO:erna och Identitys lösenordsregler i API:t, samma regler i frontend för snabb återkoppling.

| Endpoint | Kräver inloggning | Svar |
|---|---|---|
| `POST /api/auth/register` | Nej | 201, 400, 409 |
| `POST /api/auth/login` | Nej | 200, 400, 401 |
| `POST /api/auth/logout` | Ja | 204, 401 |
| `GET /api/auth/me` | Ja | 200, 401 |

## CI/CD

- **`backend.yml`** – vid ändringar i `backend/`: restore → build → publish → deploy till App Service.
- **`frontend.yml`** – vid ändringar i `frontend/`: `npm ci` → lint → build → deploy till Static Web Apps (eller App Service, om variabeln `AZURE_FRONTEND_WEBAPP_NAME` är satt).

Pull requests byggs men deployas inte. Deploy-stegen hoppas över tills GitHub-variablerna `AZURE_WEBAPP_NAME` och `VITE_API_URL` är satta.
