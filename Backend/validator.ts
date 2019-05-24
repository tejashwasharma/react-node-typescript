import { IsEmail, IsString, IsNotEmpty} from "class-validator";

export class Models {
    @IsNotEmpty()
    user_id: number;

    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    role: string;

    @IsString()
    category: string;
}