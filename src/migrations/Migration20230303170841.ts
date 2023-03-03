import { Migration } from '@mikro-orm/migrations';

export class Migration20230303170841 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tags" ("id" serial primary key, "name" varchar(255) not null, "color" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "user" ("_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "website" ("id" serial primary key, "image_url" text not null, "webiste_name" varchar(255) not null, "company_name" varchar(255) not null, "author_name" varchar(255) not null, "link" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "website_tags_list" ("website_id" int not null, "tags_id" int not null, constraint "website_tags_list_pkey" primary key ("website_id", "tags_id"));');

    this.addSql('alter table "website_tags_list" add constraint "website_tags_list_website_id_foreign" foreign key ("website_id") references "website" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "website_tags_list" add constraint "website_tags_list_tags_id_foreign" foreign key ("tags_id") references "tags" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "website_tags_list" drop constraint "website_tags_list_tags_id_foreign";');

    this.addSql('alter table "website_tags_list" drop constraint "website_tags_list_website_id_foreign";');

    this.addSql('drop table if exists "tags" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "website" cascade;');

    this.addSql('drop table if exists "website_tags_list" cascade;');
  }

}
