-- select ratings, description, date_posted, user_id, restaurant_id from reviews
-- join users on (user_id = users.id) where user_id = $1

select r.*, p.review_photos, p.review_id from Reviews r 
join Photos p on p.review_id = r.id 
join users on r.id = users.id where users.id = $1;

