#!/bin/bash
# Schedule a promo batch send at a specific time today (HH:MM 24-hour format).
# Uses `caffeinate` to prevent Mac sleep during wait.
# Runs in background — terminal can close, but Mac must stay on.
#
# Usage:
#   ./scripts/schedule-send.sh 20:00 scripts/data/promo-ja.csv ja 200
#
# Args:
#   $1 = target time HH:MM (e.g. "20:00")
#   $2 = CSV file path
#   $3 = locale (ko|ja|en)
#   $4 = count limit (e.g. 200)

set -e

TIME="${1:-20:00}"
CSV="${2:-scripts/data/promo-ja.csv}"
LOCALE="${3:-ja}"
LIMIT="${4:-200}"
START="${5:-0}"

# Get project root
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_ROOT="$( cd -- "$SCRIPT_DIR/.." && pwd )"

# Calculate seconds until target time
TODAY=$(date +%Y-%m-%d)
TARGET_EPOCH=$(date -j -f "%Y-%m-%d %H:%M" "$TODAY $TIME" +%s 2>/dev/null || echo "0")
NOW_EPOCH=$(date +%s)

if [ "$TARGET_EPOCH" -eq 0 ]; then
  echo "✘ Invalid time format. Use HH:MM (e.g. 20:00)"
  exit 1
fi

WAIT_SECS=$((TARGET_EPOCH - NOW_EPOCH))

if [ $WAIT_SECS -lt 0 ]; then
  echo "✘ $TIME has already passed today ($(date '+%H:%M'))."
  echo "  Schedule for tomorrow? Add 86400 seconds manually, or run at 00:01 tomorrow."
  exit 1
fi

LOG_FILE="$PROJECT_ROOT/scripts/logs/scheduled-$(date +%Y%m%d-%H%M%S).log"
mkdir -p "$PROJECT_ROOT/scripts/logs"

echo "========================================"
echo "📅 Scheduled Send"
echo "========================================"
echo "  Target time : $TODAY $TIME"
echo "  Wait        : $WAIT_SECS seconds ($(printf '%dh %dm' $((WAIT_SECS/3600)) $(((WAIT_SECS%3600)/60))))"
echo "  CSV         : $CSV"
echo "  Locale      : $LOCALE"
echo "  Start       : $START"
echo "  Limit       : $LIMIT"
echo "  Range       : recipients $START to $((START + LIMIT - 1))"
echo "  Log         : $LOG_FILE"
echo "========================================"
echo ""
echo "⚠  Keep Mac on (no sleep) until $TIME"
echo "   caffeinate will prevent display/system sleep during wait."
echo ""
echo "To cancel: kill $$ (or: kill the PID shown below)"
echo ""

# Run in background with caffeinate (-d prevents display sleep, -i prevents idle sleep)
nohup caffeinate -d -i bash -c "
  cd '$PROJECT_ROOT'
  echo \"\$(date '+%Y-%m-%d %H:%M:%S') Scheduled send initiated\" >> '$LOG_FILE'
  echo \"\$(date '+%Y-%m-%d %H:%M:%S') Waiting $WAIT_SECS seconds until $TIME\" >> '$LOG_FILE'
  sleep $WAIT_SECS
  echo \"\$(date '+%Y-%m-%d %H:%M:%S') Starting batch send\" >> '$LOG_FILE'
  npm run send:promo-batch -- '$CSV' --start $START --limit $LIMIT --locale $LOCALE >> '$LOG_FILE' 2>&1
  echo \"\$(date '+%Y-%m-%d %H:%M:%S') Finished\" >> '$LOG_FILE'
" > /dev/null 2>&1 &

BG_PID=$!
echo "✓ Scheduled in background (PID: $BG_PID)"
echo ""
echo "📊 Monitor progress:"
echo "   tail -f '$LOG_FILE'"
echo ""
echo "❌ Cancel scheduled send:"
echo "   kill $BG_PID"
