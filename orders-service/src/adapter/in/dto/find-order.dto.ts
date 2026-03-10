import { IsNumberString} from 'class-validator';

export class FindOrderDto {
    @IsNumberString()
    id: string;
}
