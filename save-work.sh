#!/usr/bin/env bash
set -euo pipefail

# Skrypt zapisuje stan pracy:
# 1) git add -A
# 2) git commit -m "<wiadomość>"
# 3) git push
# 4) wypisuje link do commita na GitHubie (permalink)

# Wejście: opcjonalny 1. argument = wiadomość commita
# Jeśli brak, zapyta interaktywnie.

# --- Ustal katalog repo (uruchamiaj z app/dxmanager) ---
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "${REPO_ROOT}" ]]; then
  echo "❌ Uruchom w katalogu repo (np. app/dxmanager) – nie znaleziono .git"
  exit 1
fi
cd "$REPO_ROOT"

# --- Wiadomość commita ---
if [[ $# -ge 1 && -n "${1:-}" ]]; then
  COMMIT_MSG="$1"
else
  read -r -p "Podaj wiadomość commita: " COMMIT_MSG
  if [[ -z "$COMMIT_MSG" ]]; then
    echo "❌ Wiadomość commita nie może być pusta."
    exit 1
  fi
fi

# --- Dodaj i zatwierdź ---
git add -A
if ! git diff --cached --quiet; then
  git commit -m "$COMMIT_MSG"
else
  echo "ℹ️ Brak zmian do zapisania (working tree clean)."
fi

# --- Wypchnij ---
# Ustal aktualną gałąź
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
git push -u origin "$BRANCH"

# --- Zbuduj link do ostatniego commita ---
SHA="$(git rev-parse HEAD)"
REMOTE_URL="$(git config --get remote.origin.url || true)"

# Zamiana URL na https://github.com/owner/repo
# Obsługa: https i ssh (git@github.com:owner/repo.git)
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
  echo "✅ Zapisano i wypchnięto, ale nie udało się zbudować linku do GitHuba (nieznany format remote.origin.url)."
  echo "SHA: ${SHA}"
fi
