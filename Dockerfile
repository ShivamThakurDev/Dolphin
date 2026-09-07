FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY Dolphin.sln ./
COPY src/Dolphin.Api/Dolphin.Api.csproj src/Dolphin.Api/
COPY src/Dolphin.Application/Dolphin.Application.csproj src/Dolphin.Application/
COPY src/Dolphin.Domain/Dolphin.Domain.csproj src/Dolphin.Domain/
COPY src/Dolphin.Infrastructure/Dolphin.Infrastructure.csproj src/Dolphin.Infrastructure/
RUN dotnet restore src/Dolphin.Api/Dolphin.Api.csproj
COPY . .
RUN dotnet publish src/Dolphin.Api/Dolphin.Api.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Dolphin.Api.dll"]
