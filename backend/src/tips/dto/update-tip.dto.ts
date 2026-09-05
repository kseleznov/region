import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTipDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  note!: string;
}
