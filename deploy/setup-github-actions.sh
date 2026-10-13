#!/usr/bin/env bash
#
# One-time setup so that GitHub Actions can deploy DroneDelight to Cloud Run
# using a service account key.
#
# Run this in the Google Cloud Shell (https://console.cloud.google.com/ -> the
# terminal icon in the top bar) or anywhere else with an authenticated gcloud.
#
#   curl -fsSL -o setup.sh <raw-url-of-this-file>   # or just copy-paste it
#   bash setup.sh <PROJECT_ID> [REGION] [SERVICE] [AR_REPO]
#
# Defaults: REGION=europe-west1, SERVICE=drone-delight, AR_REPO=drone-delight

set -euo pipefail

PROJECT_ID="${1:-}"
REGION="${2:-europe-west1}"
SERVICE="${3:-drone-delight}"
AR_REPO="${4:-drone-delight}"
SA_NAME="github-actions"

if [ -z "$PROJECT_ID" ]; then
  echo "Usage: bash setup.sh <PROJECT_ID> [REGION] [SERVICE] [AR_REPO]"
  exit 1
fi

SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

echo "==> Setting project to ${PROJECT_ID}"
gcloud config set project "$PROJECT_ID"

echo "==> Enabling APIs"
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  iam.googleapis.com

echo "==> Creating service account ${SA_EMAIL}"
gcloud iam service-accounts create "$SA_NAME" \
  --display-name="GitHub Actions deployer" 2>/dev/null \
  || echo "    service account already exists"

echo "==> Granting roles"
for role in roles/run.admin roles/artifactregistry.writer roles/iam.serviceAccountUser; do
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="$role" \
    --condition=None --quiet >/dev/null
  echo "    ${role}"
done

echo "==> Creating Artifact Registry repository ${AR_REPO}"
gcloud artifacts repositories create "$AR_REPO" \
  --repository-format=docker \
  --location="$REGION" \
  --description="DroneDelight images" 2>/dev/null \
  || echo "    repository already exists"

KEY_FILE="gha-${SA_NAME}.json"
echo "==> Creating service account key: ${KEY_FILE}"
gcloud iam service-accounts keys create "$KEY_FILE" --iam-account="$SA_EMAIL"

cat <<EOF

============================================================
Done. Now add the following to the GitHub repository:

Settings -> Secrets and variables -> Actions, tab "Secrets":

  GCP_SA_KEY   = the full content of ${KEY_FILE}
  MONGO_URI    = your MongoDB Atlas connection string
  JWT_SECRET   = a long random string

No variables are needed: project, region and service name live in
.github/workflows/deploy.yml.

Then push to main (or run the "Deploy to Cloud Run" workflow manually).
============================================================

Delete the key file once you copied it into GitHub:
  rm ${KEY_FILE}
EOF
