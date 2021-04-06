import { IsString } from 'class-validator';
import { IsObjectID } from 'util/CustomClassValidators';

export class CreateReplyDto {
    @IsString()
    message: string;

    @IsObjectID()
    target: string;
}
