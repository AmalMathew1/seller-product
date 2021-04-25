import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class SearchParamsDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  public limit: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  public offset: number;
}
