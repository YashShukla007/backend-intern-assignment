-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customer" TEXT NOT NULL,
    "project" TEXT NOT NULL,
    "estimatedValue" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AnalysisResult" (
    "quoteId" TEXT NOT NULL PRIMARY KEY,
    "risk" TEXT NOT NULL,
    "confidence" INTEGER NOT NULL,
    "missingItems" TEXT NOT NULL,
    "analyzedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AnalysisResult_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "QuoteRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
