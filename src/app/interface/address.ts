import { Geo } from "./geo";

export interface address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}
