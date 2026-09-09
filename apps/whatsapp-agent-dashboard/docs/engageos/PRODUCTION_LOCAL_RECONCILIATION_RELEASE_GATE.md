# Production-local reconciliation release gate

Before merge:

1. exact-head `test:agent` must pass, including `test:production-local-reconciliation`;
2. TypeScript must pass;
3. production Next build must pass;
4. migration-regression must pass;
5. authenticated Inbox browser regression must pass;
6. review must show no unresolved blocker.

After merge, production cleanup remains a separate operation. It must verify the known live source SHA and the preserved dirty-patch SHA-256 before changing tracked production files, and it must preserve rollback evidence. High-risk runtime/write flags remain disabled.
