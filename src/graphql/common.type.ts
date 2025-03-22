import { ClassType, Field, InputType, Int, ObjectType } from "type-graphql";
import { TokenDataType } from "../resource/User/User.type";
// import { User } from "../resource/User/User.type";
// import { Permissions } from "../resource/Role/Role.type";



export interface Context {
    user?: TokenDataType;
}

export function PaginatedResponseType<TItem extends object>(TItemClass: ClassType<TItem>) {
    @ObjectType()
    abstract class PaginatedResponseClass {
        // Runtime argument
        @Field(_type => [TItemClass])
        // Generic type
        item?: TItem[] | undefined;

        @Field(_type => Number)
        total?: number | undefined;

        @Field(_type => Boolean)
        hasMore?: boolean | undefined;
    }
    return PaginatedResponseClass;
}


export function PaginatedInputType<TItem extends new (...args: any[]) => {}>(Base: TItem) {
    @InputType()
    abstract class PaginatedInput extends Base {
        @Field(() => Int, { defaultValue: 1 })
        page!: number;

        @Field(() => Int, { defaultValue: 10 })
        limit!: number;
    }
    return PaginatedInput;
}


export function ErrorResponseType() {
    @ObjectType()
    abstract class ErrorResponseClass {

        @Field(_type => Int)
        status!: number;

        @Field(_type => String)
        message?: string;
    }
    return ErrorResponseClass;
}

export function MutationResponseDataType<TData extends object>(TDataClass: ClassType<TData>) {
    @ObjectType()
    abstract class MutationResponse extends ErrorResponseType() {

        @Field(_type => TDataClass, { nullable: true })
        // Generic type
        data?: TData | null;
    }

    return MutationResponse;
}

@ObjectType()
export class MutationResponseType extends ErrorResponseType() { }


export class ServiceResponse extends ErrorResponseType() { }


