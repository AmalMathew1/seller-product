import { IsOptional, IsISO8601, IsString } from "class-validator";

export class ProductFilterDto {
  @IsOptional()
  @IsString()
  public id: string;

  @IsOptional()
  @IsISO8601()
  public createdAtStart?: Date;

  @IsOptional()
  @IsISO8601()
  public createdAtEnd?: Date;
}
