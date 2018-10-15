drop table if exists Users cascade;
drop table if exists Reviews cascade;
drop table if exists Photos cascade;
drop table if exists Favorite_restaurants cascade;
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
    ,user_id references Users(id)
);

create table Photos(
    id serial primary key
    ,restaurant_id text
    ,user_id references Users(id)
    ,review_id references Reviews(id)
    ,review_photos text
    ,user_photos text
);

create table Favorite_restaurants(
    id serial primary key
    ,user_id references Users(id)
    ,restaurant json
);

create table Followers(
    id serial primary
    ,user_id references Users(id)
    ,friends_id integer ARRAY
);

select * from Users;
select * from Reviews;
select * from Photos;
select * from Favorite_restaurants;
select * from Followers;