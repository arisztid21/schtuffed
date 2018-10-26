update Testimonies set title = $1, description = $2, ratings = $3 where id = $4 and user_id = $5 returning *
