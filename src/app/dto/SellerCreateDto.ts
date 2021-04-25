import { IsDefined, IsOptional, IsString } from "class-validator";

export class SellerCreateDto {
  @IsString()
  @IsDefined()
  public name: string;

  @IsString()
  @IsOptional()
  public address: string;
}
