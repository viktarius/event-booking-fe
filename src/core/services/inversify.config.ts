import "reflect-metadata";
import { Container } from 'inversify';
import { EventRequestService, IEventRequestService } from './event-request.service';
import { BookingRequestService, IBookingRequestService } from './booking-request.service';
import { AuthRequestService, IAuthRequestService } from './auth-request.service';

export const TYPES = {
    EventRequestService: Symbol.for('EventRequestService'),
    BookingRequestService: Symbol.for('BookingRequestService'),
    AuthRequestService: Symbol.for('AuthRequestService'),
}

const container = new Container();
container.bind<IEventRequestService>(TYPES.EventRequestService).to(EventRequestService).inSingletonScope();
container.bind<IBookingRequestService>(TYPES.BookingRequestService).to(BookingRequestService).inSingletonScope();
container.bind<IAuthRequestService>(TYPES.AuthRequestService).to(AuthRequestService).inSingletonScope();

export { container };
