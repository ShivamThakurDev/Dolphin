# Dolphin ERP/HRMS

Dolphin is a startup-grade HRMS/ERP monorepo inspired by modern SaaS products such as Keka, built with .NET 9, Angular 18, PostgreSQL, Bootstrap 5, SignalR, JWT auth, FluentValidation, Serilog and Docker.

## Solution Layout

- `src/Dolphin.Api`: versioned Web API, JWT auth, Swagger, middleware, SignalR hubs.
- `src/Dolphin.Application`: CQRS requests, DTOs, validators, pipeline behaviors and ports.
- `src/Dolphin.Domain`: DDD entities, enums, aggregate roots and tenant-aware primitives.
- `src/Dolphin.Infrastructure`: EF Core PostgreSQL, repositories, seed data, JWT/token services, file storage.
- `apps/dolphin-web`: Angular 18 HRMS shell with Bootstrap, NgRx providers, Chart.js and reusable UI pieces.
- `tests/Dolphin.Tests`: unit and architecture tests.

## Local Run

```powershell
docker compose up --build
```

API: `http://localhost:5154/swagger`

Web: `http://localhost:4200`

Demo login seed:

- Tenant: `demo`
- Email: `admin@dolphin.local`
- Password: `Admin@12345`

## Backend Standards

- All public APIs are versioned under `/api/v1`.
- Responses use `ApiResponse<T>` with `success`, `data`, `errors` and `traceId`.
- Tenant data derives from `TenantEntity` and is filtered by `TenantId`.
- Refresh tokens are random secrets stored as SHA-256 hashes and rotated on refresh.
- Write workflows use MediatR commands plus FluentValidation.
- Infrastructure implements application ports and never leaks EF Core into Domain.

## Frontend Standards

- Responsive app shell with purple topbar, dark icon sidebar and employee self-service profile patterns.
- Reusable components exist for stat cards, status badges and data tables.
- HTTP calls flow through an auth interceptor that attaches JWT and tenant headers.
- NgRx is registered for app-wide state slices as workflows deepen.
- Theme tokens support light/dark mode without rewriting component markup.

## Roadmap

1. Replace `EnsureCreated` with EF Core migrations before production.
2. Add full role/permission persistence instead of demo hard-coded role claims.
3. Connect Angular login/dashboard/employee forms to the API.
4. Implement approvals for leave, attendance regularization, assets and documents.
5. Add payroll, recruitment, performance, expenses, billing and AI HR assistant modules.
