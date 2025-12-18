import { RequestHandler } from "express";
import loginService from "../service/loginService";
import { LoginUserDto } from "../models/loginDto";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";

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
      serviceResponse = ServiceResponse.success("Verified", {
        access_token: loginResponse.access_token,
      });
    }

    res.status(serviceResponse.statusCode).send(serviceResponse);
  };
}

const authController = new AuthController();
export default authController;
