import { IsDefined, IsOptional, IsString } from "class-validator";

export class ProductUpdateDto {
  @IsString()
  @IsDefined()
  public name: string;

  @IsString()
  @IsOptional()
  public description: string;
}
