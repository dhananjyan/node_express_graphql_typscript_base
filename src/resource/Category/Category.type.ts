import { ObjectType, Field, ID, InputType, FieldResolver, Root, createUnionType } from "type-graphql";
import { PaginatedResponseType } from "../../graphql/common.type";


// *************************************
// Model Type
// *************************************

@ObjectType()
export class CategoryType {
  @Field(() => ID)
  _id!: string;

  @Field()
  name!: string;

  @Field()
  slug!: string;

  @Field()
  image?: string;

  @Field(_type => ID)
  parentCategory?: string;

  @Field(() => Date)
  createdAt?: string;

  @Field(() => Date)
  updatedAt?: string;

  @Field(() => [CategoryType])
  childCategory?: CategoryType[];
}


// *************************************
// Response Type
// *************************************


@ObjectType()
export class CategoryPaginatedListResponseType extends PaginatedResponseType(CategoryType) {
}



// *************************************
// Input Type
// *************************************

@InputType()
export class CategoryInputType {
  @Field()
  name!: string;

  @Field()
  slug!: string;

  @Field()
  image?: string;

  @Field(_type => ID, { nullable: true })
  parentCategory?: string | null;
}
