---
inclusion: always
---

# Task Execution Protocol - Mandatory for Every Phase

## 1. Purpose

This protocol defines the mandatory execution method for every implementation phase of the Hospitality CMMS project.

This protocol is not optional. It applies to:

1. Prerequisite phases.
2. Feature phases.
3. Refactor phases.
4. Bug-fix phases.
5. Documentation-alignment phases.
6. Mock-data phases.
7. Completion and cleanup phases.

No phase may be executed outside this protocol.

## 2. Governing Document Order

Every phase must follow this document order:

1. `docs/prd.md`
2. `docs/requirements.md`
3. `docs/design.md`
4. `docs/tasks.md`
5. `docs/task-execution-protocol.md`

Interpretation rules:

1. `docs/prd.md` is the product source of truth.
2. `docs/requirements.md` defines what must be delivered.
3. `docs/design.md` defines how it must be structured.
4. `docs/tasks.md` defines when and in what order it must be delivered.
5. This protocol defines how a phase is executed, verified, reviewed, and closed.

If any document conflicts with a higher-priority document:

1. Stop implementation immediately.
2. Record the conflict.
3. Update the lower-priority document before continuing.

## 3. Universal Execution Rules

The following rules apply to every phase:

1. No shortcuts.
2. No undocumented deviations.
3. No implementation before reading the governing docs for the phase.
4. No silent requirement drops.
5. No direct controller reads from `req.body`, `req.params`, or `req.query`.
6. No implementation that bypasses `req.validated`.
7. No implementation that bypasses `req.user` for actor context.
8. No backend domain string duplication when it belongs in `backend/utils/constants.js`.
9. No frontend shared constant duplication when it belongs in `client/src/utils/constants.js`.
10. No non-tree-shakable MUI imports.
11. No `react-router-dom`.
12. No React Hook Form `watch()`.
13. No hardcoded styling tokens when theme tokens are required.
14. No PowerShell- or CMD-specific command syntax in execution guidance or artifacts.
15. No mock-data injection before the phase defined in `docs/tasks.md`.

## 4. Phase Entry Criteria

Before starting any phase, the implementer must confirm:

1. The current phase exists in `docs/tasks.md`.
2. All dependencies listed for the phase are satisfied.
3. The corresponding requirements and design sections are identified.
4. The repository state is understood.
5. The implementation boundaries for the phase are explicit.

If any of these are unclear, stop and clarify before coding.

## 5. Mandatory Six-Step Execution Model

Every phase must execute the following six steps in order.

---

## Step 1: Pre-Execution Git and Workspace Verification

**Purpose**: Ensure complete and accurate Git branch information to prevent issues during new branch creation and checkout.

**Actions**:

1. **Check Current State**:
   - Execute `git status` to check:
     - Current branch name
     - Uncommitted changes (staged/unstaged files)
     - Untracked files
   - Execute `git branch -vv` to display:
     - All local branches
     - Branch tracking information
     - Ahead/behind status relative to remote

2. **Update Remote Information**:
   - Execute `git fetch origin` to update remote tracking information
   - Verify remote branches are synchronized

3. **Handle Uncommitted Changes**:
   - **IF uncommitted changes exist**:
     - Stay on the current branch where uncommitted changes exist
     - Execute `git add .` to stage all changes
     - Execute `git commit -m "descriptive commit message"` with clear description
     - Execute `git push origin <current-branch>` to push to remote
     - Execute `git checkout main` (or appropriate base branch)
     - Execute `git merge <feature-branch>` to merge changes
     - Execute `git push origin main` to push merged changes
     - Execute `git branch -d <feature-branch>` to delete local branch
     - Execute `git push origin --delete <feature-branch>` to delete remote branch
     - **Think twice before acting** - verify branch names and merge targets

4. **Synchronize Local with Remote**:
   - **IF local branch is behind remote**:
     - Execute `git pull origin <branch>` to synchronize
   - **IF merge conflicts detected**:
     - **HALT immediately**
     - Prompt user to resolve conflicts manually
     - Wait for user confirmation before proceeding

5. **Create Feature Branch**:
   - Execute `git checkout -b <descriptive-branch-name>`
   - Use clear, descriptive branch names matching task number and description

6. **Verify Clean State**:
   - Execute `git status` to confirm clean working directory
   - Confirm correct branch is checked out
   - Proceed to Step 2 only after verification

---

## Step 2: Comprehensive Source Analysis

### Purpose

Understand exactly what must be built in the current phase.

### Mandatory analysis inputs

1. `docs/prd.md`
2. `docs/requirements.md`
3. `docs/design.md`
4. `docs/tasks.md`
5. The current repository structure and existing implementation

### Mandatory analysis work

1. Read the `docs/tasks.md` entry for the current phase.
2. Read all referenced requirement sections.
3. Read all referenced design sections.
4. Identify exact files and directories relevant to the phase.
5. Identify related existing code patterns already present in the repo.
6. Identify all PRD modules and workflows touched by the phase.
7. Identify all acceptance criteria touched by the phase.
8. Identify engineering constraints that govern the phase.

### Required analysis output

Before proceeding to Step 3, the implementer must be able to state:

1. Phase goal.
2. Exact scope included.
3. Exact scope excluded.
4. Files expected to be created.
5. Files expected to be modified.
6. Primary dependencies and risks.
7. Completion criteria for the phase.

---

## Step 3: Previous Phase and Dependency Analysis

### Purpose

Protect consistency across phases and avoid architectural drift.

### Mandatory actions

1. Identify all completed prerequisite phases for the current phase.
2. Review the repository artifacts produced by those phases.
3. Review established patterns in:
   - constants usage
   - validation and middleware structure
   - service design
   - theme and component design
   - routing structure
   - state management
4. Verify that the current phase will extend those patterns instead of creating contradictory structures.
5. Identify any missing prerequisite artifact that the current phase depends on.

### Required blocking behavior

If a prerequisite artifact is missing or inconsistent:

1. Stop implementation.
2. Record the gap.
3. Resolve the dependency gap before building on top of it.

### Required analysis output

Before proceeding to Step 4, the implementer must know:

1. Which prior artifacts are reused.
2. Which prior patterns must be preserved.
3. Which gaps need correction before implementation.

---

## Step 4: Phase Implementation Without Deviation

### Purpose

Implement the phase exactly as defined by requirements and design.

### Mandatory implementation rules

1. Only implement what is in scope for the phase, plus unavoidable prerequisite internal plumbing directly required by that scope.
2. Keep backend controllers thin.
3. Keep backend business logic in services.
4. Use `req.validated` and `req.user` correctly.
5. Use backend constants from `backend/utils/constants.js`.
6. Use frontend constants from `client/src/utils/constants.js`.
7. Use JSDoc for every exported module and every non-trivial helper.
8. Use MUI `styled()` for reusable custom styling.
9. Use theme tokens instead of hardcoded design values.
10. Use tree-shakable MUI imports only.
11. Use `react-router` imports only.
12. Do not use React Hook Form `watch()`.
13. Preserve route, workflow, data-model, and screen traceability back to the governing docs.
14. For non-request execution paths such as jobs, imports, and automated escalation, pass a service-layer actor context that remains structurally compatible with the `req.user` contract required by the PRD.
15. Do not introduce mock data unless the current phase is the designated mock-data phase.

### Mandatory implementation checkpoints

During implementation, the implementer must continuously verify:

1. File placement matches `docs/design.md`.
2. Feature behavior matches `docs/requirements.md`.
3. Route/API/model alignment matches `docs/prd.md`.
4. Responsive behavior is preserved where the phase touches the UI.
5. Role and permission impacts are accounted for where relevant.
6. Audit and notification impacts are accounted for where relevant.
7. System-triggered phases preserve actor-context compatibility and audit attribution behavior.
8. Documentation-touching phases preserve numbering integrity, section references, and cross-document traceability.

### Required implementation output

At the end of Step 4, the phase must have:

1. All required files created or updated.
2. All in-scope flows implemented.
3. All in-scope UI or API surfaces present.
4. All in-scope constraints honored.

---

## Step 5: Self-Verification and User Review Preparation

### Purpose

Verify completeness before asking the user to review.

### Mandatory self-verification actions

1. Compare implemented work against the current phase entry in `docs/tasks.md`.
2. Compare implemented work against the referenced requirement sections.
3. Compare implemented work against the referenced design sections.
4. Review changed files carefully.
5. Verify no prohibited pattern was introduced.
6. Verify no unrelated files were accidentally changed.
7. Verify that any required commands or verification steps were actually run.

### Required verification categories

The implementer must verify, where relevant to the phase:

1. Backend behavior.
2. Frontend behavior.
3. Route coverage.
4. Model and constant alignment.
5. Permission and scope behavior.
6. Responsive behavior.
7. Audit and notification behavior.
8. Documentation alignment.
9. System-triggered actor behavior where the phase touches jobs, imports, or automated actions.

### User review preparation output

Before asking the user for review, the implementer must be able to summarize:

1. What was implemented.
2. Which files were created or modified.
3. Which requirements were satisfied.
4. Which design decisions were realized.
5. Any limitations, blockers, or deferred items.

### User review rule

Do not proceed to Step 6 until:

1. The user has reviewed the implementation.
2. The user has either requested changes, which must loop back through Steps 2 through 5, or explicitly approved proceeding.

---

## Step 6: Post-Approval Git Finalization

**Purpose**: Add, commit, push implementation, checkout, merge, and synchronize between local and remote repositories. Delete related branches after detailed verification.

**Actions**:

1. **Verify Current State**:
   - Execute `git status` to check:
     - Current branch (should be feature branch)
     - All modified/created files
     - No unintended changes
   - Execute `git branch -vv` to display branch tracking information
   - Execute `git fetch origin` to update remote tracking information

2. **Stage and Commit Changes**:
   - Review all changes carefully: `git diff`
   - Stage all changes: `git add .`
   - Verify staged changes: `git status`
   - Commit with descriptive message: `git commit -m "feat: [Task N] Descriptive task title and summary"`
   - Use conventional commit format: `feat:`, `fix:`, `refactor:`, `docs:`, etc.

3. **Push Feature Branch**:
   - Push to remote: `git push origin <feature-branch>`
   - Verify push success
   - Confirm remote branch exists: `git branch -r`

4. **Checkout Base Branch**:
   - Checkout main/master: `git checkout main` (or appropriate base branch)
   - Verify clean state: `git status`
   - Pull latest changes: `git pull origin main`

5. **Merge Feature Branch**:
   - **CRITICAL: Think twice before merging**
   - Verify you are on correct base branch: `git branch`
   - Merge feature branch: `git merge <feature-branch>`
   - **IF merge conflicts occur**:
     - **HALT immediately**
     - Prompt user to resolve conflicts manually
     - Wait for user confirmation
     - Verify resolution: `git status`
   - **IF merge successful**:
     - Verify merged changes: `git log --oneline -5`
     - Confirm all expected files are present

6. **Push Merged Changes**:
   - Push to remote: `git push origin main`
   - Verify push success
   - Confirm remote is updated: `git log origin/main --oneline -5`

7. **Delete Feature Branch (Local and Remote)**:
   - **CRITICAL: Verify merge success before deleting**
   - Confirm feature branch is fully merged: `git branch --merged`
   - Delete local branch: `git branch -d <feature-branch>`
   - Delete remote branch: `git push origin --delete <feature-branch>`
   - Verify deletion: `git branch -a` (feature branch should not appear)

8. **Final Synchronization Verification**:
   - Execute `git status` - should show clean working directory
   - Execute `git branch -vv` - should show main branch in sync with origin
   - Execute `git log --oneline -5` - should show recent commit
   - Confirm local and remote are synchronized

9. **Cleanup Verification**:
   - Verify no orphaned branches: `git branch -a`
   - Verify no uncommitted changes: `git status`
   - Verify correct branch: `git branch` (should be on main)

### Mandatory final verification

At the end of Step 6, the implementer must verify:

1. The correct branch is checked out.
2. The working tree is clean.
3. The intended commit exists.
4. The remote is synchronized if remote workflow is active.

---

## 6. Phase Completion Gate

A phase is complete only when all statements below are true:

1. The phase scope in `docs/tasks.md` is fully implemented.
2. The relevant requirement sections are satisfied.
3. The relevant design sections are satisfied.
4. No prohibited implementation pattern was introduced.
5. The user has reviewed the implementation.
6. The user has explicitly approved proceeding to Git finalization.
7. Git finalization is complete if the workflow requires it.

## 7. Loop Rule for Requested Changes

If the user requests changes after review:

1. Return to Step 2.
2. Re-analyze the updated request.
3. Re-check design and task impact.
4. Re-implement only after updated understanding is clear.
5. Re-run Step 5 before asking for review again.

This loop continues until the user gives explicit approval.

## 8. Phase-Specific Special Rules

### 8.1 Prerequisite phases

Prerequisite phases must focus on:

1. Foundational structure.
2. Shared conventions.
3. Required architecture.

They must not introduce feature shortcuts that later phases will need to undo.

### 8.2 Feature phases

Feature phases must deliver complete vertical slices for the phase scope, including:

1. Backend support.
2. Frontend support.
3. Route/screen support.
4. Permission behavior.
5. Audit or notification integration where required.

### 8.3 Mock-data phase

The mock-data phase must not begin until:

1. All core models exist.
2. Constants sources of truth exist.
3. Main feature domains are present.
4. The mock-data phase is active in `docs/tasks.md`.

### 8.4 Documentation and alignment phases

Documentation and alignment phases must:

1. Re-read all affected governing documents together rather than patching one file in isolation.
2. Correct section numbering, broken references, and wording defects that could mislead later implementation.
3. Preserve document precedence and update lower-priority documents when traceability gaps are found.
4. Verify that every changed statement still maps to a PRD requirement, design decision, or task-phase obligation.

### 8.5 Background-job and system-triggered phases

Background-job, scheduler, import, and automated-action phases must:

1. Follow the same requirements and design analysis steps as HTTP-request phases.
2. Pass a synthetic or service-layer actor context compatible with the `req.user` shape whenever downstream services require actor, tenant, permission, or audit information.
3. Reuse the same constants, business rules, and audit pathways as interactive flows rather than introducing job-only rule forks.
4. Verify notification, escalation, retry, and idempotency behavior where the phase scope includes automated processing.

## 9. Enforcement

This protocol is mandatory for every phase.

Failure to follow it causes:

1. Incomplete requirement coverage.
2. Design drift.
3. Inconsistent repository structure.
4. Review churn.
5. Git confusion.

Success in following it produces:

1. Traceable delivery.
2. Predictable phase execution.
3. Cleaner review cycles.
4. Better architectural consistency.
5. Safer multi-phase implementation.
