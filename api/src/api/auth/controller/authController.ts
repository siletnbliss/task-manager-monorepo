import { RequestHandler } from "express";
import loginService from "../service/loginService";
import { LoginUserDto, RegisterUserDto } from "../models/loginDto";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import registerService from "../service/registerService";

class AuthController {
  login: RequestHandler = async (req, res) => {
    const body: LoginUserDto = req.body;
    const loginResponse = await loginService.loginUser(
      body.username,
      body.password
    );
    let serviceResponse: ServiceResponse<{ access_token: string } | null> =
      ServiceResponse.failure(
        "Invalid credentials",
        null,
        StatusCodes.UNAUTHORIZED
      );
    if (loginResponse) {
      serviceResponse = ServiceResponse.success("Verified", loginResponse);
    }

    res.status(serviceResponse.statusCode).send(serviceResponse);
  };

  register: RequestHandler = async (req, res) => {
    const body: RegisterUserDto = req.body;
    const serviceResponse = await registerService.registerUser(body);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };
}

const authController = new AuthController();
export default authController;
