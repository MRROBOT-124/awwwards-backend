"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230225104447 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230225104447 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
        this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    }
    async down() {
        this.addSql('alter table "user" drop constraint "user_username_unique";');
        this.addSql('alter table "user" drop constraint "user_email_unique";');
    }
}
exports.Migration20230225104447 = Migration20230225104447;
//# sourceMappingURL=Migration20230225104447.js.map