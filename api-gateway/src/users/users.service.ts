import {
    HttpException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class UsersService {
    constructor(private readonly httpService: HttpService) {}

    async create(body: any, authHeader?: string) {
        try {
        const response = await firstValueFrom(
            this.httpService.post('http://users-service:3002/users', body, {
            headers: authHeader ? { Authorization: authHeader } : {},
            }),
        );
        return response.data;
        } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            throw new HttpException(err.response.data as any, err.response.status);
        }
        throw new InternalServerErrorException('Users service unavailable');
        }
    }

    async login(body: { email: string; password: string }) {
        try {
        const response = await firstValueFrom(
            this.httpService.post('http://users-service:3002/users/login', body),
        );
        return response.data;
        } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            throw new HttpException(err.response.data as any, err.response.status);
        }
        throw new InternalServerErrorException('Users service unavailable');
        }
    }

    async find(id: string | number, authHeader?: string) {
        try {
        const response = await firstValueFrom(
            this.httpService.get(`http://users-service:3002/users/${id}`, {
            headers: authHeader ? { Authorization: authHeader } : {},
            }),
        );
        return response.data;
        } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            throw new HttpException(err.response.data as any, err.response.status);
        }
        throw new InternalServerErrorException('Users service unavailable');
        }
    }

    async update(id: string | number, body: any, authHeader?: string) {
        try {
        const response = await firstValueFrom(
            this.httpService.patch(`http://users-service:3002/users/${id}`, body, {
            headers: authHeader ? { Authorization: authHeader } : {},
            }),
        );
        return response.data;
        } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            throw new HttpException(err.response.data as any, err.response.status);
        }
        throw new InternalServerErrorException('Users service unavailable');
        }
    }
}