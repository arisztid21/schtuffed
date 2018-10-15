drop table if exists users cascade;
drop table if exists reviews cascade;
drop table if exists photos cascade;
drop table if exists favorite_restaurants cascade;
drop table if exists followers cascade;

create table if exists user (
  id serial primary key,
  auth0_id serial not null,
  username text not null,
  email text unique not null,
  created_at text not null
);

create table if exists reviews (
  id serial primary key,
  ratings decimal,
  description text not null,
  date_posted text not null,
  user_id references user(id),
  profile_review text references profiles(id)
);

create table if exists photos (
  id serial primary key,
  restaurant_id text,
  user_id references users(id),
  review_id references reviews(id),
  review_photos text,
  user_photos text,
);

create table if exists favorite_restaurants (
  id serial primary key,
  user_id references users(id)
  restaurant json
);

create table if exists followers (
  id serial primary key,
  user_id references users(id),
  friends_id integer array
)

select * from users;
select * from profiles;
select * from reviews;
