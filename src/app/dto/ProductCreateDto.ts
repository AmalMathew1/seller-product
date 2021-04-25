import { IsDefined, IsOptional, IsString } from "class-validator";

export class ProductCreateDto {
  @IsString()
  @IsDefined()
  public name: string;

  @IsString()
  @IsOptional()
  public description: string;
}
