select R.*, P.restaurant_id, P.review_photos, P.review_id from Reviews R join Photos P on R.id = P.review_id;
