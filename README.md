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
│   ├── Services/      affärslogik
│   ├── Dtos/          in- och utdata för API:t (entiteter skickas aldrig direkt)
│   ├── Entities/      EF Core-entiteter (AppUser m.fl.)
│   ├── Data/          AppDbContext – relationer och index konfigureras här
│   ├── Migrations/    EF Core-migrationer
│   └── Program.cs     databas, CORS, OpenAPI/Scalar, health check
├── frontend/
│   ├── public/staticwebapp.config.json   gör att React Router fungerar i Azure
│   └── src/  api/  components/  pages/
└── .github/workflows/  backend.yml, frontend.yml
```

`Controllers/`, `Services/` och `Dtos/` fylls på när funktionerna byggs.

## Kom igång lokalt

Krav: .NET 10 SDK, Node.js 22+, SQL Server LocalDB (följer med Visual Studio) och `dotnet-ef` (`dotnet tool install --global dotnet-ef`).

**1. Connection string** – sparas med user-secrets, alltså utanför repot (bara första gången per dator):

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=(localdb)\MSSQLLocalDB;Database=SubTrackerDb;Trusted_Connection=True" --project backend/SubTracker.Api
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
| `Cors:AllowedOrigins` | `appsettings.Development.json` (`http://localhost:5173`) | App Service → App setting `Cors__AllowedOrigins__0` |
| `VITE_API_URL` | `frontend/.env.development` | GitHub-variabel, byggs in av `frontend.yml` |
| Deploy av API:t | – | GitHub secret `AZURE_WEBAPP_PUBLISH_PROFILE` |
| Deploy av frontend | – | GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN` (eller `AZURE_FRONTEND_PUBLISH_PROFILE` + variabeln `AZURE_FRONTEND_WEBAPP_NAME` om frontend körs i App Service) |

`appsettings.json` innehåller bara ofarliga standardvärden. Allt som börjar med `VITE_` hamnar i webbläsaren och får därför aldrig vara hemligt.

## CI/CD

- **`backend.yml`** – vid ändringar i `backend/`: restore → build → publish → deploy till App Service.
- **`frontend.yml`** – vid ändringar i `frontend/`: `npm ci` → lint → build → deploy till Static Web Apps (eller App Service, om variabeln `AZURE_FRONTEND_WEBAPP_NAME` är satt).

Pull requests byggs men deployas inte. Deploy-stegen hoppas över tills GitHub-variablerna `AZURE_WEBAPP_NAME` och `VITE_API_URL` är satta.
