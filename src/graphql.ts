
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ENUM_ROLE {
    ADMIN = "ADMIN",
    REVIEWER = "REVIEWER",
    USER = "USER"
}

export enum ENUM_USER_TYPE {
    MEMBER = "MEMBER",
    CLIENT = "CLIENT"
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

    abstract getMe(): Nullable<User> | Promise<Nullable<User>>;

    abstract author(id: string): Nullable<Author> | Promise<Nullable<Author>>;

    abstract authors(): Nullable<Nullable<Author>[]> | Promise<Nullable<Nullable<Author>[]>>;

    abstract post(id: string, baseInput: BaseInput): Nullable<Post> | Promise<Nullable<Post>>;

    abstract posts(baseInput: BaseInput): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;
}

export class LoginRespose {
    token?: Nullable<string>;
}

export abstract class IMutation {
    abstract createAuthor(newAuth?: Nullable<IAuthor>): Nullable<Author> | Promise<Nullable<Author>>;

    abstract createPost(newPost?: Nullable<IPost>): Nullable<Post> | Promise<Nullable<Post>>;

    abstract testSubscription(test?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract singleUpload(file: Upload): Nullable<File> | Promise<Nullable<File>>;
}

export class Author {
    _id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    posts?: Nullable<Nullable<Post>[]>;
}

export class Permission {
    _id: string;
    name?: Nullable<string>;
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

export class Role {
    _id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    roleId?: Nullable<string>;
    permissionId?: Nullable<string>;
}

export class File {
    filename: string;
    mimetype: string;
    encoding: string;
}

export class User {
    _id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    fullName?: Nullable<string>;
    type?: Nullable<ENUM_USER_TYPE>;
}

export class UserRole {
    _id: string;
    userId?: Nullable<string>;
    roleId?: Nullable<string>;
}

export type SCalar = any;
export type Upload = any;
type Nullable<T> = T | null;
