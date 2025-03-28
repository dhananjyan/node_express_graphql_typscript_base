import { ObjectType, Field, ID, InputType } from "type-graphql";
import { PaginatedResponseType } from "../../graphql/common.type";


// *************************************
// Model Type
// *************************************

@ObjectType()
export class CategoryType {
  @Field(() => ID)
  _id?: string;

  @Field()
  name!: string;

  @Field()
  slug!: string;

  @Field()
  image?: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt?: Date;

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

  @Field({ nullable: true })
  image?: string;

  @Field(_type => ID, { nullable: true })
  parentCategory?: string | null;
}
