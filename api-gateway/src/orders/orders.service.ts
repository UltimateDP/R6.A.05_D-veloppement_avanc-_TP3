import {
    HttpException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class OrdersService {
    constructor(private readonly httpService: HttpService) {}

    async findOne(id: string, authHeader?: string) {
        try {
        const response = await firstValueFrom(
            this.httpService.get(`http://orders-service:3001/orders/${id}`, {
            headers: authHeader ? { Authorization: authHeader } : {},
            }),
        );
        return response.data;
        } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            throw new HttpException(err.response.data as any, err.response.status);
        }
        throw new InternalServerErrorException('Orders service unavailable');
        }
    }

    async create(body: any, authHeader?: string) {
        try {
        const response = await firstValueFrom(
            this.httpService.post(`http://orders-service:3001/orders`, body, {
            headers: authHeader ? { Authorization: authHeader } : {},
            }),
        );
        return response.data;
        } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            throw new HttpException(err.response.data as any, err.response.status);
        }
        throw new InternalServerErrorException('Orders service unavailable');
        }
    }

    async update(id: string, body: any, authHeader?: string) {
        try {
        const response = await firstValueFrom(
            this.httpService.patch(`http://orders-service:3001/orders/${id}`, body, {
            headers: authHeader ? { Authorization: authHeader } : {},
            }),
        );
        return response.data;
        } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
            throw new HttpException(err.response.data as any, err.response.status);
        }
        throw new InternalServerErrorException('Orders service unavailable');
        }
    }
}