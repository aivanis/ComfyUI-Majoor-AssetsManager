# Maintenance and Testing

## Database Maintenance

Majoor Assets Manager stores its SQLite index in the output-side `_mjr_index` area. The docs now provide much clearer recovery guidance for corruption and rebuild workflows.

Important maintenance actions include:
- reset index
- force delete database and rebuild
- optimize database after heavy scan or delete activity

The docs also explain what is preserved and what is lost during emergency recovery.

## Testing Strategy

The project uses:
- pytest for backend testing
- Vitest for frontend testing
- a canonical quality gate script for combined verification

The current testing docs also clarify coverage thresholds, Windows batch runners, and where reports are written.

## Recommended Commands

```bash
python scripts/run_quality_gate.py
python -m pytest -q
npm run test:js
```

## Canonical Docs

- [Database Maintenance](https://github.com/MajoorWaldi/ComfyUI-Majoor-AssetsManager/blob/main/docs/DB_MAINTENANCE.md)
- [Testing Guide](https://github.com/MajoorWaldi/ComfyUI-Majoor-AssetsManager/blob/main/docs/TESTING.md)
- [API Reference](https://github.com/MajoorWaldi/ComfyUI-Majoor-AssetsManager/blob/main/docs/API_REFERENCE.md)
