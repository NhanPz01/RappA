create database rappa;
use rappa;

create table word (
	id int auto_increment primary key,
    word varchar(255) not null,
	no_accent varchar(255) null
);

create table user (
	username varchar(32) not null primary key,
    password varchar(255) not null
);

create table member (
	id int auto_increment primary key,
	fullname nvarchar(255) not null,
    username varchar(32) not null,
    foreign key(username) references user(username)
);

