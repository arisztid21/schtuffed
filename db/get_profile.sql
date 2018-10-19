SELECT username, email, photos, created_at, user_id FROM Users
JOIN Profiles on user_id = users.id
