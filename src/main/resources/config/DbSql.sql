-- Create table
create table CONTACT
(
  id      NUMBER not null,
  name    VARCHAR2(255),
  age     NUMBER,
  phone   VARCHAR2(20),
  address VARCHAR2(255)
)
tablespace PRACTICE
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
-- Add comments to the columns 
comment on column CONTACT.name
  is '姓名';
comment on column CONTACT.age
  is '年龄';
comment on column CONTACT.phone
  is '手机';
comment on column CONTACT.address
  is '地址';
-- Create/Recreate primary, unique and foreign key constraints 
alter table CONTACT
  add primary key (ID)
  using index 
  tablespace PRACTICE
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );