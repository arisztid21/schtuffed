insert into Reviews
<<<<<<< HEAD
  (user_id, description, ratings, date_posted, restaurant_id)
  values
  ($1, $2, $3, $4, $5);
=======
  (ratings, description, date_posted, user_id, restaurant_id)
  values
  ($1, $2, $3, $4, $5) returning *;
>>>>>>> 57f57d6c3894a6c432c21c977abfb165caa1f9b6
