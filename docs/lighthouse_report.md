# Lighthouse Report — Lab 13 (Optional)

## Target page
- URL / local route: https://asset-form-guardian.lovable.app/
- Device: Desktop
- Categories: Performance, Accessibility, Best Practices, SEO

## Summary
- Performance: 98
- Accessibility: 98
- Best Practices: 100
- SEO: 100

## Top findings
1. Finding: Performance score is high, but not perfect.
   - Why it matters: Small performance issues can still affect perceived responsiveness on slower devices or networks.
   - Action: Review the Lighthouse report for remaining render-blocking resources or opportunities to reduce JavaScript/CSS payload.

2. Finding: Accessibility score is high, but not perfect.
   - Why it matters: A score below 100 may indicate minor accessibility improvements are still possible.
   - Action: Review any Lighthouse accessibility warnings and improve labels, contrast, focus states, or semantic structure where needed.

3. Finding: Best Practices and SEO scored 100.
   - Why it matters: This indicates the page follows key browser and quality recommendations for the tested categories.
   - Action: Keep these checks in future regression reviews to ensure later UI changes do not reduce quality.

## Evidence
- Exported Lighthouse HTML report:
  - `docs/assets/lighthouse_report.html`

## NFR relevance
- Performance supports UI responsiveness and user experience quality.
- Accessibility supports usability and inclusive access.
- Best Practices supports technical quality and maintainability.