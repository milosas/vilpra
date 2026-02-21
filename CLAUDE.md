# Vilpra Project

## Architecture
This project follows a 3-layer architecture:
- **Layer 1 (Directives):** `directives/` — Markdown SOPs defining what to do
- **Layer 2 (Orchestration):** Claude agent — intelligent routing & decisions
- **Layer 3 (Execution):** `execution/` — deterministic Python scripts

## Directory Structure
```
vilpra/
├── directives/       # Markdown SOPs
├── execution/        # Python scripts (tools)
├── .tmp/             # Intermediate files (never commit)
├── .env              # API keys & secrets (never commit)
└── CLAUDE.md         # This file
```

## Rules
- Check `execution/` for existing scripts before creating new ones
- Update directives when discovering edge cases, API limits, or better approaches
- All intermediate files go in `.tmp/`
- Deliverables go to cloud services, not local files
- Self-correct: fix errors, update tools, update directives
