import {Body, Controller, Delete, Get, Headers, Param, Put} from "@nestjs/common";
import adminSdk from "../../../config/adminSdk";
import {UserService} from "./userService";
import {User} from "./user.entity";

@Controller('user')
export class UserController {

  constructor(private userRepository: UserService) {
  }

  @Get('')
  async getAll() {
    return this.userRepository.getRepository().find();
  }

  @Get('me')
  async me(@Headers() headers: any) {
    const token = headers.authorization?.split('Bearer ')[1]
    if (!token) {
      return 'User not found'
    }
    const firebaseUser = await adminSdk.getFirebaseUser(token)
    return this.userRepository.getRepository().findOneOrFail(firebaseUser.uid)
  }

  @Put('me')
  async put(@Headers() headers: any, @Body() body: User) {
    const token = headers.authorization?.split('Bearer ')[1]
    if (!token) {
      return 'User not found'
    }
    const firebaseUser = await adminSdk.getFirebaseUser(token)
    return this.userRepository.getRepository().update(firebaseUser.uid, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return  this.userRepository.getRepository().delete(id);
  }
}
