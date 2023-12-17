export interface IEventResponse {
    _id: string;
    title: string;
    description: string;
    price: number;
    date: string;
    creator: {
        _id: string;
        email: string;
    }
}

export interface IEventRequest {
    title: string;
    description: string;
    price: number;
    date: string;
}
