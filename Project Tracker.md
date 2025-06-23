# CS 476 Project Tracker

Communication Channel: https://discord.gg/sydyDkvg

Track progress:

 `- [ ]` - means not started.
 
 `- [x]`  - means work in progress.
 
 `- [✔]` - means completed.


## Phase 1 │ Week 1 (15 – 21 May) – Project Kick‑off & Proposal
| Status | Task | Owner |
|--------|------|-------|
| - [✔] | Form team of five | — |
| - [✔] | Create GitHub repo | — |
| - [✔] | Draft **3‑page proposal** (title, problem, roles, main requirements, names) | — |
| - [✔] | Submit proposal on UR Courses **by 21 May** | — |

## Phase 2 │ Weeks 2‑3 (22 May – 4 Jun) – Requirements & High‑Level Design
| Status | Task | Owner |
|--------|------|-------|
| - [✔] | Finalise detailed functional‑requirements list for **Project Manager** & **Administrator** | — |
| - [✔] | Create Use‑Case diagram – Project Manager | Sherik |
| - [✔] | Create Use‑Case diagram – Administrator | Dongho |
| - [✔] | Draw Activity diagrams for the two use cases | Hrudit |
| - [x] | Define two  examples per role for Correctness, Time‑efficiency, Robustness | Hrudit |
| - [✔] | Produce 3‑tier architecture diagram and list ≥ 3 benefits | Sherik |
| - [✔] | Choose GoF patterns (Factory, Observer) & sketch class diagrams | Dongho |
| - [✔] | Set up project skeleton (server, Access/SQL DB link, Home web page) | Ishan |
| - [x] | Configure unit‑test framework & add a sample test | Sheryar |

## Phase 3 │ Weeks 4-5 (5 – 18 Jun) – Core Build I  
*Identity, create-project flow, General tab, change tracking*  
| Status | Task | Owner |
|--------|------|-------|
| **Auth & Users** |
| - [x] | Login Page Set Up | Hrudit |
| - [ ] | Signup Page Set Up | Sherik |
| - [ ] | Home Page Set Up | Sherik |
| - [ ] | Users table with 3 roles in SQLite (Req 1) | Sherik |
| - [ ] | Hash passwords (bcrypt) | Ishan |
| - [ ] | **Email 2-factor login** & password-complexity check (Req 13) | Ishan |
| **Projects base** |
| - [✔] | Project General tab Set up | Sheryar |
| - [✔] | `POST /projects` → create project, give **unique Project ID** (Req 7) | Sheryar |
| - [✔] | Enforce mandatory fields: name, description, PM (Req 5) | Sheryar |
| - [✔] | React **General tab** (CRUD) | Sheryar |
| - [✔] | Audit table; log every change (Req 3) | Dongho |
| **Quality gates** |
| - [✔] | Unit tests for login & project-create | Dongho |

---

## Phase 4 │ Weeks 6-7 (19 Jun – 2 Jul) – Core Build II & Integration  
| Status | Task | Owner |
|--------|------|-------|
| **Financial tab** |
| - [✔] | Budget & Change-Order fields (Req 9) | Sheryar |
| **Schedule tab** |
| - [ ] | Milestone list + simple bar view; rule: End ≥ Start (Req 15) | — |
| **Delivery tab** |
| - [✔] | Risks table + Lessons Learned notes | Hrudit |
| **Change Log tab** |
| - [✔] | Show audit history of budget, schedule, scope (Req 3) | Sherik |
| **Admin area** |
| - [ ] | Screen to grant tab access; lock until PM approves (Req 14) | Dongho |
| **Validation & security** |
| - [ ] | Rate-limit `/login`; friendly error messages | Dongho |

---

## Phase 5 │ Weeks 8-9 (3 – 16 Jul) – Testing & Release  
| Status | Task | Owner |
|--------|------|-------|
| - [ ] | **Manual 10-user concurrency test** (Req 2) | — |
| - [ ] | “Export to PDF” button – whole project (Req 6) | — |
| - [ ] | Simple nightly **SQLite backup / restore script** (Req 12) | — |
| - [ ] | Cross-browser smoke test (Chrome, Firefox, Edge) (Req 10) | — |
| - [ ] | User Guide with screenshots + short API README | — |
| - [ ] | Basic Dockerfile for one-command launch | — |
| - [ ] | Tag **v1.0** and push release | — |
| - [ ] | Submit package to UR Courses | — |

---

## Phase 6 │ Week 10 (≥ 17 Jul) – Presentation & Demo
| Status | Task | Owner |
|--------|------|-------|
| - [ ] | 10-slide deck (problem → design → demo) | — |
| - [ ] | Record 3-min walkthrough video | — |
| - [ ] | Live demo + Q&A | — |

## Continuous Good Practice (all phases)
| Status | Task | Owner |
|--------|------|-------|
| - [ ] | Keep every task as a GitHub issue with an assignee | — |
| - [ ] | Use clear commit messages `[ISSUE-ID] short description` | — |
| - [ ] | Write unit tests for new backend functions | — |

