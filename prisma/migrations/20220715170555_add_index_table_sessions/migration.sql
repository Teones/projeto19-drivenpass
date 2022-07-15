-- CreateIndex
CREATE INDEX "sessions_userId_token_idx" ON "sessions"("userId", "token");
