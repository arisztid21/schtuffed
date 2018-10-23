module.exports = {
    getRestaurantReviews: (db) => {
        return db.query("select R.*, P.restaurant_id, P.review_photos, P.review_id from Reviews R join Photos P on R.id = P.review_id where R.restaurant_id = '17030960';")
    },
    createReview: (db, review) => {
        return db.query('insert into Reviews(ratings, description, date_posted, user_id, restaurant_id)values(${ratings}, ${description}, ${date_posted}, ${user_id}, ${restaurant_id}) returning *;', {
            ratings: review.ratings,
            description: review.description,
            date_posted: new Date(),
            user_id: 2,
            restaurant_id: "17030960"
        })
    }
}