create database wsup1;

create sequence new_schema.list_projects_id_seq;

create sequence new_schema.list_sup_workers_id_seq;

create table new_schema.list_projects
(
  id      bigserial not null
    constraint lisy_projects_pkey
    primary key,
  name    varchar(100),
  chat_id bigint
);

create unique index list_projects_chat_id_uindex
  on new_schema.list_projects (chat_id);

create table new_schema.list_sup_workers
(
  id         bigserial not null
    constraint list_sup_workers_pkey
    primary key,
  name       varchar(100),
  tel_number varchar(13)
);

create unique index list_sup_workers_tel_number_uindex
  on new_schema.list_sup_workers (tel_number);

create table new_schema.messages
(
  id             bigint not null
    constraint private_mess_pkey
    primary key,
  sender_user_id bigint,
  data           date,
  text           varchar(3000),
  to_id          varchar(13)
    constraint private_mess_list_sup_workers_tel_number_fk
    references list_sup_workers (tel_number),
  chat_id        bigint,
  from_tp        boolean,
  react_time     bigint,
  timestamp      bigint
);

create table new_schema.messages_group
(
  id             bigint not null
    constraint messages_group_pkey
    primary key,
  sender_user_id bigint,
  data           date,
  text           varchar(3000),
  to_id          varchar(13)
    constraint messages_group_list_sup_workers_tel_number_fk
    references list_sup_workers (tel_number),
  chat_id        bigint
    constraint messages_group_list_projects_chat_id_fk
    references list_projects (chat_id),
  from_tp        boolean,
  react_time     bigint,
  timestamp      integer
);

create unique index messages_group_id_uindex
  on new_schema.messages_group (id);


