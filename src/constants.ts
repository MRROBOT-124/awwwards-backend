export const __prod__ = process.env.NODE_ENV ==='production';
export const __dev__ = process.env.NODE_ENV === 'development';
export const __local__ = process.env.NODE_ENV === 'local';
export const __testing__ = process.env.NODE_ENV === 'testing';
export const __stage__ = process.env.NODE_ENV === 'stage';

const setEnv = () => {
    if(__dev__) {
        return "./src/.env.development"
    }
    else if(__prod__) {
        return "./src/.env.production"
    }
    else {
        return "./src/.env.local"
    }
}

export const __ENV__ = setEnv();