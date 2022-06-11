import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
} from 'class-validator';

export class CreateCommentDto {

    @IsString()
    @Length(2, 300)
    public text: string;

    @IsBoolean()
    public published: boolean;

    @IsNumber()
    @IsNotEmpty()
    public authorId: number

    @IsNumber()
    @IsNotEmpty()
    public postId: number
}