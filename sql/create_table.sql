CREATE TABLE User (
    id int NOT NULL primary key AUTO_INCREMENT comment 'primary key',
    create_time DATETIME COMMENT 'create time',
    update_time DATETIME COMMENT 'update time',
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    movie_count int DEFAULT 0,
    series_count int DEFAULT 0,
    anime_count int DEFAULT 0,
    review_count int DEFAULT 0,
    xp int DEFAULT 0
);

CREATE TABLE Review(
    id int NOT NULL primary key AUTO_INCREMENT comment 'primary key',
    create_time DATETIME COMMENT 'create time',
    update_time DATETIME COMMENT 'update time',
    user_id int NOT NULL,
    CONSTRAINT FK_UserReview FOREIGN KEY (user_id) REFERENCES User(id),
    id_type varchar(255),
    content varchar(255),
    grade int,
    already_seen boolean default false,
    in_cinema boolean default false,
    spoiler boolean default false
);