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

    async findOne(id: string) {
        try {
        const response = await firstValueFrom(
            this.httpService.get(`http://orders-service:3001/orders/${id}`),
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

    async create(body: any) {
        try {
            const response = await firstValueFrom(
                this.httpService.post('http://orders-service:3001/orders', body),
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
}