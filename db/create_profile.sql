insert into profiles
  (username, email, photos, created_at, user_id)
  values
  ($1, $2, $3, $4, $5)
  returning *;
