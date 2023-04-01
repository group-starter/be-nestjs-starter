
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    ADMIN = "ADMIN",
    REVIEWER = "REVIEWER",
    USER = "USER"
}

export class ILogin {
    username: string;
    password: string;
}

export class IAuthor {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    postId?: Nullable<string>;
}

export class BaseInput {
    nodeId: string;
    profileId: string;
}

export class IPost {
    title: string;
    votes?: Nullable<number>;
    authorId: string;
}

export interface ByUser {
    _id: string;
    fullName: string;
}

export abstract class IQuery {
    abstract login(argsLogin: ILogin): Nullable<LoginRespose> | Promise<Nullable<LoginRespose>>;

    abstract author(id: string): Nullable<Author> | Promise<Nullable<Author>>;

    abstract authors(): Nullable<Nullable<Author>[]> | Promise<Nullable<Nullable<Author>[]>>;

    abstract post(id: string, baseInput: BaseInput): Nullable<Post> | Promise<Nullable<Post>>;

    abstract posts(baseInput: BaseInput): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;

    abstract getMe(): Nullable<User> | Promise<Nullable<User>>;
}

export class LoginRespose {
    token?: Nullable<string>;
}

export abstract class IMutation {
    abstract createAuthor(newAuth?: Nullable<IAuthor>): Nullable<Author> | Promise<Nullable<Author>>;

    abstract createPost(newPost?: Nullable<IPost>): Nullable<Post> | Promise<Nullable<Post>>;

    abstract testSubscription(test?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export class Author {
    _id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    posts?: Nullable<Nullable<Post>[]>;
}

export class Post {
    _id: string;
    title: string;
    votes?: Nullable<number>;
    authorId: string;
}

export abstract class ISubscription {
    abstract connectSubscription(test: string): Nullable<SCalar> | Promise<Nullable<SCalar>>;
}

export class User {
    _id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    fullName?: Nullable<string>;
}

export type SCalar = any;
type Nullable<T> = T | null;
