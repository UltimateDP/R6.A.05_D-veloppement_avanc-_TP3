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

    async getHello() {
        try {
        const response = await firstValueFrom(
            this.httpService.get('http://orders-service:3001/orders'),
        );
        return response.data;
        } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            throw new HttpException(
            err.response.data as any,
            err.response.status,
            );
        }
        throw new InternalServerErrorException('Orders service unavailable');
        }
    }

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

    async find(id: string) {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`http://users-service:3001/users/${id}`),
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