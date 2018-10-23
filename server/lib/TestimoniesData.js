module.exports = {
    getTestimony: (db) => {
        return db.query('select * from testimonies')
    }, 
    createTestimony: (db, testimony) => {
        return db.query('insert into Testimonies (user_id, title, description, ratings, date_posted) values (${user_id}, ${title}, ${description}, ${ratings}, ${date_posted}) returning *;', {
            user_id: testimony.user_id, 
            title: testimony.title, 
            description: testimony.description, 
            ratings: testimony.ratings, 
            date_posted: testimony.date_posted
        })
    }
}