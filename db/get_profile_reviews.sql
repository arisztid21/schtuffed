select ratings, description, date_posted, user_id from reviews
join users on (user_id = users.id) where user_id = $1
