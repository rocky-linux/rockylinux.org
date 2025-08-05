# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the Rocky Linux website.

## Workflows

### check-download-urls.yml

This workflow automatically checks all URLs in the `data/downloads.json` file to ensure they are accessible.

#### When it runs:

- **On push/PR**: When `data/downloads.json` is modified
- **Daily**: At 2 AM UTC (scheduled check)
- **Manual**: Can be triggered manually from the Actions tab

#### What it does:

1. Extracts all URLs from the nested JSON structure
2. Checks each URL using HTTP HEAD requests
3. Reports any URLs that return errors or non-success status codes
4. Creates issues or PR comments when failures are detected

#### Local testing:

You can test the URL checker locally using the standalone script:

```bash
# Run the URL checker
node scripts/check-download-urls.js

# Or make it executable and run directly
chmod +x scripts/check-download-urls.js
./scripts/check-download-urls.js
```

#### Features:

- **Batch processing**: Checks URLs in batches to avoid overwhelming servers
- **Progress indicator**: Shows real-time progress when run locally
- **Detailed reporting**: Shows the JSON path and error details for each failed URL
- **GitHub integration**: Automatically comments on PRs and creates issues for scheduled runs

#### Expected behavior:

- URLs returning 2xx or 3xx status codes are considered successful
- 4xx or 5xx status codes are reported as failures
- Network errors and timeouts are also reported
- Docker Hub URLs are expected to return 200 (they don't support HEAD requests)

### Other Workflows

- **playwright.yml**: Runs Playwright end-to-end tests
- **validate_markdown_filenames.yml**: Ensures markdown files follow naming conventions
- **Validate.yml**: General validation workflow

## Adding New Workflows

When adding new workflows:

1. Place the workflow file in this directory
2. Use descriptive names ending with `.yml`
3. Document the workflow purpose and triggers
4. Consider adding manual trigger option (`workflow_dispatch`)
5. Add appropriate error handling and notifications
