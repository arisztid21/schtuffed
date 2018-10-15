drop table if exists Users cascade;
drop table if exists Reviews cascade;
drop table if exists Photos cascade;
drop table if exists Favorite_restaurants cascade;
drop table if exists Followers cascade;

Users (
    id serial primary key
    ,auth0_id serial not null
    ,username text not null
    ,email text unique not null
    ,created_at text not null
);

Reviews(
    id serial primary key
    ,ratings decimal
    ,description text not null
    ,date_posted text not null
    ,user_id references Users(id)
    ,profile_review text references profiles(id)
);

Photos(
    id serial primary key
    ,restaurant_id text
    ,user_id references Users(id)
    ,review_id references Reviews(id)
    ,review_photos text
    ,user_photos text
);

Favorite_restaurants(
    id serial primary key
    ,user_id references Users(id)
    ,restaurant json
);

Followers(
    id serial primary
    ,user_id references Users(id)
    ,friends_id integer ARRAY
);

select * from Users;
select * from Profiles;
select * from Reviews;