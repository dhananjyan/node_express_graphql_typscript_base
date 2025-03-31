import { ObjectType, Field, ID, InputType, FieldResolver, Root, createUnionType, registerEnumType } from "type-graphql";
import { Permissions, RoleType } from "../Role/Role.type";
import { MutationResponseDataType, PaginatedInputType, PaginatedResponseType } from "../../graphql/common.type";
import { UserTypeEnum } from "./Customer.model";
import mongoose, { Types } from "mongoose";


registerEnumType(UserTypeEnum, {
  name: "UserTypeEnum",
  description: "Types of users in the system",
});

// *************************************
// Model Type
// *************************************

@ObjectType()
export class CustomerType {
  @Field(() => ID)
  _id?: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field()
  password?: string;

  @Field(() => String)
  phoneNumber?: string;

  @Field(() => ID)
  countryId?: Types.ObjectId;

  @Field(_type => [UserTypeEnum])
  userType!: UserTypeEnum[]

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

@ObjectType()
export class TokenDataType {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field(_type => [Permissions])
  permissions!: Permissions[];

  @Field(_type => [UserTypeEnum])
  userType!: UserTypeEnum[]
}

// *************************************
// Response Type
// *************************************

@ObjectType()
export class CustomerLogin extends CustomerType {

  @Field()
  token!: string;

  @Field(() => [String])
  permissions?: string[];
}

@ObjectType()
export class CustomerPaginatedListResponseType extends PaginatedResponseType(CustomerType) {
}

@ObjectType()
export class CustomerLoginResponseType extends MutationResponseDataType(CustomerLogin) {
}


// *************************************
// Input Type
// *************************************

@InputType()
export class createCustomerInputType {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  phoneNumber!: string;

  @Field(_type => ID)
  countryId!: Types.ObjectId;

  @Field(() => [UserTypeEnum])
  userType!: UserTypeEnum[];

  @Field()
  email!: string;

  @Field()
  password!: string;

}

@InputType()
export class FilterCustomerInputType {
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
export class paginatedFilterCustomerInputType extends PaginatedInputType(FilterCustomerInputType) { }

@InputType()
export class UpdateCustomerInputType {

  @Field(_type => ID)
  id!: string;

  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field()
  mobileNumber?: string;

  @Field()
  countryId?: string;

  @Field()
  email?: string;

  @Field(_type => [UserTypeEnum])
  userType?: string[];


}


@InputType()
export class CustomerLoginInputType {
  @Field()
  username!: string;

  @Field()
  password!: string;
}
