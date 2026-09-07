import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTipDto {
  @IsInt()
  placeId!: number;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  note!: string;
}
