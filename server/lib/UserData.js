module.exports = {
    getUser: (db) => {
        return db.query("select * from Users where auth0_id = 'facebook|2364333683593240' limit 1;")
    },
    createUser: (db, user) => {
        return db.query('insert into Users (auth0_id, username, email, created_at, photos) values (${auth0_id}, ${username}, ${email}, ${created_at}, ${photos}) returning *;', {
            auth0_id: user.auth0_id,
            username: user.username,
            email: user.email,
            created_at: user.created_at,
            photos: user.photos
        })
    }
}