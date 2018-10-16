drop table if exists Users cascade;
drop table if exists Reviews cascade;
drop table if exists Photos cascade;
drop table if exists Favorite_Restaurants cascade;
drop table if exists Followers cascade;

create table Users (
    id serial primary key
    ,auth0_id text not null
    ,username text not null
    ,email text unique not null
    ,created_at text not null
);

create table Reviews(
    id serial primary key
    ,ratings decimal
    ,description text not null
    ,date_posted text not null
    ,user_id integer references Users(id)
);

create table Photos(
    id serial primary key
    ,restaurant_id text
    ,review_photos text
    ,user_photos text
    ,user_id integer references Users(id)
    ,review_id integer references Reviews(id)
);

create table Favorite_restaurants(
    id serial primary key
    ,restaurant json
    ,user_id integer references Users(id)
);

create table Followers(
    id serial primary key
    ,friends_id integer[]
    ,user_id integer references Users(id)
);

<<<<<<< HEAD
select * from users;
select * from profiles;
select * from reviews;
=======
select * from Users;
select * from Reviews;
select * from Photos;
select * from Favorite_restaurants;
select * from Followers;
>>>>>>> 294b21e79740024d0ff113690227edecc5933181
