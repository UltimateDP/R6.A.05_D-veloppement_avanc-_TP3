import { AppService } from './app.service';
import { OrderStatus } from '../domain/order-status.enum';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  it('should create an order', () => {
    const order = service.createOrder({
      userId: 1,
      status: OrderStatus.PENDING,
      totalAmount: 199.99,
    });

    expect(order.userId).toBe(1);
    expect(order.status).toBe(OrderStatus.PENDING);
    expect(order.totalAmount).toBe(199.99);
  });

  it('should find an order by id', () => {
    const order = service.findOrder({ id: 1 });

    expect(order.id).toBe(1);
  });

  it('should throw if order does not exist', () => {
    expect(() => service.findOrder({ id: 999 })).toThrow();
  });

  it('should update an order', () => {
    const updatedOrder = service.updateOrder(
      { id: 1 },
      {
        userId: 2,
        status: OrderStatus.SHIPPED,
        totalAmount: 299.99,
      },
    );

    expect(updatedOrder.userId).toBe(2);
    expect(updatedOrder.status).toBe(OrderStatus.SHIPPED);
    expect(updatedOrder.totalAmount).toBe(299.99);
  });
});