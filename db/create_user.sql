insert into Users
  (auth0_id, username, email, created_at, photos)
  values
  ($1, $2, $3, $4, $5)
  returning *;
