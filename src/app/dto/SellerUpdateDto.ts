import { IsOptional, IsString } from "class-validator";

export class SellerUpdateDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public address: string;
}
