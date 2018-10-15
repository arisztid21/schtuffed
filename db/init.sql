drop table if exists Users cascade;
drop table if exists Reviews cascade;
drop table if exists Photos cascade;
drop table if exists Favorite_Restaurants cascade;
drop table if exists Followers cascade;

create table if exists User (
  id serial primary key,
  auth0_id serial not null,
  username text not null,
  email text unique not null,
  created_at text not null
);

create table if exists Reviews (
  id serial primary key,
  ratings decimal,
  description text not null,
  date_posted text not null,
  user_id references user(id),
  profile_review text references profiles(id)
);

create table if exists Photos (
  id serial primary key,
  restaurant_id text,
  user_id references users(id),
  review_id references reviews(id),
  review_photos text,
  user_photos text,
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

select * from users;
select * from profiles;
select * from reviews;
