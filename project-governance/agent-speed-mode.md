# Agent Speed Mode

This file defines how the agent should move quickly without becoming careless.

The goal is high efficiency: less repeated explanation from the user, tighter execution, and faster visual iteration.

## Core Principle

Use the lightest process that preserves visual fidelity, scope control, and project memory.

## Modes

### 1. Direct Edit Mode

Use when:

- the user gives an exact change
- the affected section is obvious
- no new visual direction is needed

Process:

1. Read required governance if not already read in the session.
2. Identify exact target files/selectors.
3. State what will not change.
4. Make the narrow edit.
5. Build if relevant.
6. Ask for a user screenshot if visual verification is needed, unless the user explicitly asks for browser verification.
7. Log meaningful work.

Avoid:

- broad plans
- design exploration
- unrelated cleanup

### 2. Visual Direction Mode

Use when:

- the user gives references
- the user asks for a new visual direction
- the request is aesthetic or ambiguous
- several reasonable visual solutions exist

Process:

1. Read `visual-taste-profile.md`.
2. Read `design-decisions.md`.
3. Extract rules from references.
4. Produce an HTML visual brief or 2-3 quick variants.
5. Ask the user to choose or correct direction.
6. Implement only after direction is clear.

Avoid:

- committing to one invented direction too early
- long text-only explanations when a visual artifact would be faster

### 3. Review And Learn Mode

Use when:

- the user gives feedback on a result
- something was rejected
- a repeated mistake appears
- an accepted pattern emerges

Process:

1. Extract the lesson from the chat/session.
2. Update `visual-taste-profile.md` if it is about taste.
3. Update `design-decisions.md` if it is a settled design decision.
4. Update `review/pending-updates.md` if uncertain.
5. Add a session log for meaningful work.

Avoid:

- adding vague permanent rules
- turning one ambiguous reaction into a universal law

### 4. Implementation Mode

Use when:

- a design direction is already clear
- product code or CSS needs implementation

Process:

1. Read relevant governance.
2. Inspect only relevant source files.
3. Make narrow implementation changes.
4. Build.
5. Request a user screenshot for visual approval unless the user explicitly asks for browser verification.
6. Fix only issues in scope.
7. Log session.

Avoid:

- touching source files during governance-only work
- changing shared selectors without checking impact

## Default Behavior

If the user gives a precise instruction, use Direct Edit Mode.

If the user gives references or taste feedback, use Visual Direction Mode or Review And Learn Mode.

If the user asks "what should we do", use Visual Direction Mode and produce a concrete recommendation.
