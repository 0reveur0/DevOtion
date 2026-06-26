-- Allow anon (unauthenticated) users to read reviews
CREATE POLICY "select_reviews_anon" ON reviews FOR SELECT
  TO anon USING (true);

CREATE POLICY "select_review_votes_anon" ON review_votes FOR SELECT
  TO anon USING (true);