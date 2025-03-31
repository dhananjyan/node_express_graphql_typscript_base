import { ObjectType, Field, ID, InputType, Float, Int } from "type-graphql";
import { PaginatedResponseType } from "../../graphql/common.type";
import { Types } from "mongoose";


// *************************************
// Model Type
// *************************************

@ObjectType()
export class ProductType {
  @Field(_type => ID)
  _id?: Types.ObjectId;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => Int)
  stock!: number;

  @Field(() => String)
  category!: Types.ObjectId;

  @Field(() => [String])
  images!: string[];

  @Field(() => Float, { nullable: true })
  discount?: number;

  @Field(() => Float, { nullable: true })
  rating?: number;

  @Field(() => ID)
  merchant!: Types.ObjectId;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}



// *************************************
// Response Type
// *************************************

@ObjectType()
export class ProductPaginatedListResponseType extends PaginatedResponseType(ProductType) {
}


// *************************************
// Input Type
// *************************************

@InputType()
export class ProductInputType {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(_type => Float)
  price!: number;

  @Field(_type => Int)
  stock!: number;

  @Field(_type => ID)
  category!: Types.ObjectId;

  @Field(_type => [String])
  images!: string[];

  @Field(_type => Float, { nullable: true })
  discount?: number;

  @Field(_type => Float, { nullable: true })
  rating?: number;

  @Field(_type => ID)
  merchant!: Types.ObjectId;
}
