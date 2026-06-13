-- Add vote_count column to reviews
ALTER TABLE reviews ADD COLUMN vote_count INTEGER NOT NULL DEFAULT 0;

-- Prevent self-voting: raise exception if user votes on their own review
CREATE OR REPLACE FUNCTION prevent_self_vote()
RETURNS TRIGGER AS $$
DECLARE
  review_owner UUID;
BEGIN
  SELECT user_id INTO review_owner FROM reviews WHERE id = NEW.review_id;
  IF review_owner = NEW.user_id THEN
    RAISE EXCEPTION 'Users cannot vote on their own reviews';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER check_self_vote
  BEFORE INSERT ON review_votes
  FOR EACH ROW EXECUTE FUNCTION prevent_self_vote();

-- Maintain vote_count on reviews via triggers
CREATE OR REPLACE FUNCTION update_review_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE reviews SET vote_count = vote_count + 1 WHERE id = NEW.review_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE reviews SET vote_count = GREATEST(vote_count - 1, 0) WHERE id = OLD.review_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_vote_count_insert
  AFTER INSERT ON review_votes
  FOR EACH ROW EXECUTE FUNCTION update_review_vote_count();

CREATE TRIGGER trigger_vote_count_delete
  AFTER DELETE ON review_votes
  FOR EACH ROW EXECUTE FUNCTION update_review_vote_count();