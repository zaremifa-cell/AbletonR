# Quality Control

## Before Editing

- Confirm the requested scope.
- Identify target files.
- Identify unrelated files and sections that must remain unchanged.
- Check whether visual references apply.
- Check whether build or rendered verification will be required.

## During Work

- Keep edits narrow.
- Avoid unrelated cleanup.
- Avoid broad selector changes.
- Preserve accepted interaction patterns unless the request changes them.
- Stop if visual details are ambiguous.

## Visual Quality Check

For visual changes, verify:

- correct section was edited
- layout hierarchy is preserved
- spacing and alignment are close to the reference
- proportions are preserved
- typography weight and size match intended references
- colors and contrast are correct
- no unrelated section changed
- no screenshot pixels were copied or embedded

## Technical Quality Check

- Build passes when build is relevant.
- No unnecessary dependencies were added.
- No unrelated files were modified.
- No build artifacts or derived files were edited manually.
- Session history is updated for meaningful work.

## Reporting

Final reports should include:

- files changed
- what was changed
- verification performed
- unresolved issues
- whether product code was modified
