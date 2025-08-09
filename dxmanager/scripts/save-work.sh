#!/usr/bin/env bash
set -euo pipefail

# Skrypt zapisuje stan pracy:
# 1) git add -A
# 2) git commit -m "<wiadomość>"
# 3) git push
# 4) wypisuje link do commita na GitHubie (permalink)

# Wejście: opcjonalny 1. argument = wiadomość commita
# Jeśli brak, zapyta interaktywnie.

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "${REPO_ROOT}" ]]; then
  echo "❌ Uruchom w katalogu repo (np. app/dxmanager) – nie znaleziono .git"
  exit 1
fi
cd "$REPO_ROOT"

if [[ $# -ge 1 && -n "${1:-}" ]]; then
  COMMIT_MSG="$1"
else
  read -r -p "Podaj wiadomość commita: " COMMIT_MSG
  if [[ -z "$COMMIT_MSG" ]]; then
    echo "❌ Wiadomość commita nie może być pusta."
    exit 1
  fi
fi

git add -A
if ! git diff --cached --quiet; then
  git commit -m "$COMMIT_MSG"
else
  echo "ℹ️ Brak zmian do zapisania (working tree clean)."
fi

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
git push -u origin "$BRANCH"

SHA="$(git rev-parse HEAD)"
REMOTE_URL="$(git config --get remote.origin.url || true)"

to_https_url() {
  local url="$1"
  if [[ "$url" =~ ^https?:// ]]; then
    echo "$url" | sed -E 's|\.git$||'
  elif [[ "$url" =~ ^git@github\.com:(.*)$ ]]; then
    echo "https://github.com/${BASH_REMATCH[1]%.git}"
  else
    echo ""
  fi
}

HTTPS_REMOTE="$(to_https_url "$REMOTE_URL")"
if [[ -n "$HTTPS_REMOTE" ]]; then
  COMMIT_URL="${HTTPS_REMOTE}/commit/${SHA}"
  echo ""
  echo "✅ Zapisano i wypchnięto."
  echo "🔗 Link do commita: ${COMMIT_URL}"
else
  echo "✅ Zapisano i wypchnięto, ale nie udało się zbudować linku."
  echo "SHA: ${SHA}"
fi
