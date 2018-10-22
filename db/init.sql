drop table if exists Users cascade;
drop table if exists Reviews cascade;
drop table if exists Photos cascade;
drop table if exists Favorite_Restaurants cascade;
drop table if exists Followers cascade;
drop table if exists Testimonies cascade;
drop table if exists Products cascade;
drop table if exists Cart cascade;
drop table if exists Orders cascade;


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
    ,friends_id integer
    ,user_id integer references Users(id)
);

create table Testimonies(
    id serial primary key
    ,user_id integer references Users(id)
    ,title text not null
    ,description text not null
    ,ratings integer
    ,date_posted text not null
);

create table Products(
    id serial primary key
    ,item_name text not null
    ,item_price integer not null
    ,quantity integer
    ,item_image text not null
);

create table Cart(
    id serial primary key
    ,product_id integer references products(id)
    ,user_id integer references Users(id)
    ,total integer 
    ,quantity integer
);

create table Orders (
    id serial primary key
    ,product_id integer references products(id)
    ,user_id integer references Users(id)
    ,cart_id integer references Cart(id)
    ,purchase_date text not null
    ,total integer not null
);

insert into products(item_name, item_price, quantity, item_image) values('hat', 15, 10, 'https://res.cloudinary.com/arisztid21/image/upload/v1539896286/Screen_Shot_2018-10-18_at_11.39.14_AM.png');
insert into products(item_name, item_price, quantity, item_image) values('bottle', 15, 30, 'https://res.cloudinary.com/arisztid21/image/upload/v1539896307/Screen_Shot_2018-10-18_at_11.43.36_AM.png');
insert into products(item_name, item_price, quantity, item_image) values('tee shirt', 25, 100, 'https://res.cloudinary.com/arisztid21/image/upload/v1539896316/Screen_Shot_2018-10-18_at_11.47.00_AM.png');

select r.*, p.review_photos, p.review_id from Reviews r join Photos p on p.review_id = r.id;


select * from Users;
select * from Reviews;
select * from Photos;
select * from Favorite_restaurants;
select * from Followers;
select * from Testimonies;
select * from Products;
select * from Cart;
select * from Orders;