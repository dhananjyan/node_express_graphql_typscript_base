import { ObjectType, Field, ID, InputType, FieldResolver, Root, createUnionType } from "type-graphql";
import { Permissions, RoleType } from "../Role/Role.type";
import { MutationResponseDataType, PaginatedInputType, PaginatedResponseType } from "../../graphql/common.type";


// *************************************
// Model Type
// *************************************

@ObjectType()
export class UserType {
  @Field(() => ID)
  _id?: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field(_type => [ID])
  roles!: string[];

  @Field()
  password?: string;

  @Field(() => [RoleType])
  userRoles?: RoleType[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

@ObjectType()
export class TokenDataType extends UserType {
  @Field(_type => [Permissions])
  permissions!: Permissions[];
}


// *************************************
// Response Type
// *************************************

@ObjectType()
export class Login extends UserType {

  @Field()
  token!: string;

  @Field(() => [String])
  permissions?: String[];
}

@ObjectType()
export class UserPaginatedListResponseType extends PaginatedResponseType(UserType) {
}


@ObjectType()
export class LoginResponseType extends MutationResponseDataType(Login) {
}

// const SearchResultUnion = createUnionType({
//   name: "SearchResult", // Name of the GraphQL union
//   types: () => [UserPaginatedList, ErrorResponse()] as const, // function that returns tuple of object types classes
// });



// *************************************
// Input Type
// *************************************

@InputType()
export class createUserInputType {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  mobileNumber!: string;
  @Field()
  country!: string;

  @Field(() => [String])
  roles?: string[];

  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class FilterUserInputType {
  @Field({ nullable: true })
  firstName: string;

  @Field(_type => String, { nullable: true })
  lastName?: string;

  @Field(_type => String, { nullable: true })
  mobileNumber?: string;
  @Field(_type => String, { nullable: true })
  country!: string;

  @Field(() => [String], { nullable: true })
  roles?: String[];

  @Field(_type => String, { nullable: true })
  email?: string;
}

@InputType()
export class paginatedFilterUserInputType extends PaginatedInputType(FilterUserInputType) { }

@InputType()
export class UpdateUserInputType {

  @Field(_type => ID)
  id!: string;

  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field()
  mobileNumber?: string;
  @Field()
  country?: string;

  @Field(() => [String])
  roles?: String[];

  @Field()
  email?: string;

  // @Field()
  // password?: string;
}



@InputType()
export class LoginInputType {
  @Field()
  username!: string;

  @Field()
  password!: string;
}
