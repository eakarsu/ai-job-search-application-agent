#!/usr/bin/env bash
set -euo pipefail
project_dir="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
cd "$project_dir"
[ -d node_modules ] || npm install
port="${FRONTEND_PORT:-3075}"
exec npm run dev -- -H 127.0.0.1 -p "$port"
