import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
    constructor(private readonly httpService: HttpService) {}

    async findAll() {
        const response = await firstValueFrom(
        this.httpService.get('http://localhost:3001/orders'),
        );
        return response.data;
    }

    async findOne(id: string) {
        const response = await firstValueFrom(
        this.httpService.get(`http://localhost:3001/orders/${id}`),
        );
        return response.data;
    }

    async create(body: any) {
        const response = await firstValueFrom(
        this.httpService.post('http://localhost:3001/orders', body),
        );
        return response.data;
    }
}