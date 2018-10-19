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
    ,photos text not null
);

create table Reviews(
    id serial primary key
    ,ratings decimal
    ,description text not null
    ,date_posted text not null
    ,user_id integer references Users(id)
    ,restaurant_id text
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

create table Testimonies(
  id serial primary key
  ,user_id integer references Users(id)
  ,title text not null
  ,description text not null
  ,ratings integer
  ,date_posted text not null
)

create table Products(
    id serial primary key
    ,item_name text not null
    ,item_price integer not null
    ,quantity integer not null
    ,order_id integer references orders(id)
    ,item_image text not null
)

create table Orders (
    id serial primary key
    ,product_id integer references products(id)
    ,user_id integer references Users(id)
    ,purchase_date text not null
    ,total integer not null
)

select * from Users;
select * from Reviews;
select * from Photos;
select * from Favorite_restaurants;
select * from Followers;
select * from Testimonies;
select * from Products;
select * from Orders;
