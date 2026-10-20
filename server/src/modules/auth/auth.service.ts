import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, code, email, password } = registerDto;
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedCode = code.trim().toUpperCase();

    // Check if email or code already exists
    const existingEmail = await this.usersService.findByEmail(normalizedEmail);
    if (existingEmail) {
      throw new ConflictException({
        field: 'email',
        message: 'Địa chỉ email này đã được sử dụng',
      });
    }

    const existingCode = await this.usersService.findByCode(normalizedCode);
    if (existingCode) {
      throw new ConflictException({
        field: 'code',
        message: 'Mã sinh viên / học viên / mã độc giả này đã được sử dụng',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with race condition handling
    let newUser;
    try {
      newUser = await this.usersService.create({
        name: name.trim(),
        code: normalizedCode,
        email: normalizedEmail,
        password: hashedPassword,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const target = (error.meta?.target as string[]) || [];
        if (target.includes('code')) {
          throw new ConflictException({
            field: 'code',
            message: 'Mã sinh viên / học viên / mã độc giả này đã được sử dụng',
          });
        }
        if (target.includes('email')) {
          throw new ConflictException({
            field: 'email',
            message: 'Địa chỉ email này đã được sử dụng',
          });
        }
      }
      throw error;
    }

    const payload = {
      sub: newUser.id,
      email: newUser.email,
      code: newUser.code,
      role: newUser.role,
    };
    const accessToken = this.jwtService.sign(payload);

    const { password: _, ...userWithoutPassword } = newUser;

    return {
      user: userWithoutPassword,
      accessToken,
    };
  }

  async login(loginDto: LoginDto) {
    const { identifier, password } = loginDto;
    const user = await this.usersService.findByEmailOrCode(identifier);

    if (!user) {
      throw new UnauthorizedException(
        'Email / Mã độc giả hoặc mật khẩu không chính xác',
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException(
        'Email / Mã độc giả hoặc mật khẩu không chính xác',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
      code: user.code,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload);

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
    };
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Không tìm thấy thông tin tài khoản');
    }
    const { password, ...result } = user;
    return result;
  }
}
