# Build the image and deploy the single Cloud Run service.
#
# Run from the repository root:
#   .\deploy\deploy-cloud-run.ps1 -ProjectId my-project -MongoUri "mongodb+srv://..." -JwtSecret "s3cret"
#
# Requires the Google Cloud CLI (gcloud) and an authenticated account: gcloud auth login

param(
    [Parameter(Mandatory = $true)] [string] $ProjectId,
    [Parameter(Mandatory = $true)] [string] $MongoUri,
    [Parameter(Mandatory = $true)] [string] $JwtSecret,
    [string] $JwtExpiration = "1h",
    [string] $Region = "europe-north1",
    [string] $Service = "drone-delight",
    [string] $Repository = "drone-delight",
    [string] $Memory = "512Mi",
    [string] $Cpu = "1"
)

$ErrorActionPreference = "Stop"

Write-Host "Setting project to $ProjectId" -ForegroundColor Cyan
gcloud config set project $ProjectId

Write-Host "Enabling required APIs" -ForegroundColor Cyan
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com

Write-Host "Ensuring Artifact Registry repository '$Repository'" -ForegroundColor Cyan
$existing = gcloud artifacts repositories describe $Repository --location=$Region 2>$null
if (-not $existing) {
    gcloud artifacts repositories create $Repository `
        --repository-format=docker `
        --location=$Region `
        --description="DroneDelight images"
}

$image = "$Region-docker.pkg.dev/$ProjectId/$Repository/app:latest"

Write-Host "Building and pushing $image" -ForegroundColor Cyan
gcloud builds submit --tag $image .

Write-Host "Deploying Cloud Run service '$Service'" -ForegroundColor Cyan
gcloud run deploy $Service `
    --image $image `
    --region $Region `
    --platform managed `
    --allow-unauthenticated `
    --port 8080 `
    --memory $Memory `
    --cpu $Cpu `
    --set-env-vars "MONGO_URI=$MongoUri,JWT_SECRET=$JwtSecret,JWT_EXPIRATION=$JwtExpiration"

Write-Host "Done." -ForegroundColor Green
gcloud run services describe $Service --region $Region --format "value(status.url)"
