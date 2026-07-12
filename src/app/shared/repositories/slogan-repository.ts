import { Slogan } from "../models/app.model";
import { GenericRepository } from "./generic-repository";
export class SloganRepository implements GenericRepository<Slogan> {
    getById(id: string | number): Promise<Slogan | null> {
        throw new Error("Method not implemented.");
    }
    create(item: Omit<Slogan, 'id'>): Promise<Slogan> {
        throw new Error("Method not implemented.");
    }
    update(id: string | number, item: Partial<Slogan>): Promise<Slogan | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string | number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    private slogans: Slogan[] = [];
    async getAll(): Promise<Slogan[]> {
        return this.slogans;
    }
}