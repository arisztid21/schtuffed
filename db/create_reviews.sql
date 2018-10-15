insert into Reviews(ratings decimal
    ,description
    ,date_posted text not null
    ,user_id references Users(id)
    ,profile_review text references profiles(id)) values()