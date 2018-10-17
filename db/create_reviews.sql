insert into Reviews
  (ratings, description, date_posted, user_id, restaurant_id)
  values
  ($1, $2, $3, $4, $5) returning *;