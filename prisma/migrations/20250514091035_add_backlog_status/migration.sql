-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'BACKLOG',
    "title" TEXT NOT NULL
);
INSERT INTO "new_Task" ("id", "order", "status", "title") SELECT "id", "order", "status", "title" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
