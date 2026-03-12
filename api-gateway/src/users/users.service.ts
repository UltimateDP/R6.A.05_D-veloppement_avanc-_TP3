import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(private readonly httpService: HttpService) {}

    async findAll() {
        const response = await firstValueFrom(
        this.httpService.get('http://localhost:3002/users'),
        );
        return response.data;
    }

    async findOne(id: string) {
        const response = await firstValueFrom(
        this.httpService.get(`http://localhost:3002/users/${id}`),
        );
        return response.data;
    }

    async create(body: any) {
        const response = await firstValueFrom(
        this.httpService.post('http://localhost:3002/users', body),
        );
        return response.data;
    }
}