"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__ENV__ = exports.__stage__ = exports.__testing__ = exports.__local__ = exports.__dev__ = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV === 'production';
exports.__dev__ = process.env.NODE_ENV === 'development';
exports.__local__ = process.env.NODE_ENV === 'local';
exports.__testing__ = process.env.NODE_ENV === 'testing';
exports.__stage__ = process.env.NODE_ENV === 'stage';
const setEnv = () => {
    if (exports.__dev__) {
        return "./src/.env.development";
    }
    else if (exports.__prod__) {
        return "./src/.env.production";
    }
    else {
        return "./src/.env.local";
    }
};
exports.__ENV__ = setEnv();
//# sourceMappingURL=constants.js.map