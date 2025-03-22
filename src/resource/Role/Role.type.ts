import { ObjectType, Field, ID, InputType, registerEnumType } from "type-graphql";
import { MaxLength, Length } from "class-validator";
import { PaginatedResponseType } from "../../graphql/common.type";

export enum Permissions {
    // User
    USER_CREATE = "USER_CREATE",
    USER_UPDATE = "USER_UPDATE",
    USER_DELETE = "USER_DELETE",
    USER_READ = "USER_READ",

    // Category
    CATEGORY_CREATE = "CATEGORY_CREATE",
    CATEGORY_UPDATE = "CATEGORY_UPDATE",
    CATEGORY_DELETE = "CATEGORY_DELETE",
    CATEGORY_READ = "CATEGORY_READ",
}


registerEnumType(Permissions, {
    name: "Permissions", // Mandatory
    description: "The basic Permissions", // Optional
});

@ObjectType()
export class RoleType {
    @Field(() => ID)
    _id!: string;

    @Field()
    name!: string;

    @Field(_type => [String])
    permissions!: String[];
}


// *************************************
// Response Type
// *************************************

@ObjectType()
export class RolePaginatedListResponseType extends PaginatedResponseType(RoleType) {
    // Add more fields or overwrite the existing one's types
    // @Field(() => [Role])
    // result?: Role[];
}


// *************************************
// Input Type
// *************************************

@InputType()
export class RoleInputType {
    @Field()
    @MaxLength(30)
    name!: string;

    @Field(_type => [Permissions])
    permissions!: Permissions[];
}


@InputType()
export class UpdateRoleInputType {
    @Field()
    @MaxLength(30)
    id!: string;

    @Field({ nullable: true })
    @MaxLength(30)
    name?: string;

    @Field(_type => [Permissions])
    permissions?: Permissions[];
}
