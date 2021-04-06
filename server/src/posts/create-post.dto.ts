import {
    IsAlphanumeric,
    IsAscii,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { IsObjectID } from 'util/CustomClassValidators';

export default class CreatePostsDto {
    @IsString()
    @IsAscii()
    @MinLength(5)
    @MaxLength(100)
    title: string;

    @IsString()
    @IsAscii()
    @IsNotEmpty()
    @MaxLength(5000)
    content: string;

    @IsObjectID()
    @IsAlphanumeric()
    @IsOptional()
    parent?: string;
}
