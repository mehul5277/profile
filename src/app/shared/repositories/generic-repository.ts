// interface GenericRepositoryV1<T> {
//     getAll(): Promise<T[]>;
//     getById(id: string | number): Promise<T | null>;
//     create(item: T): Promise<T>;
//     update(id: string | number, item: Partial<T>): Promise<boolean>;
//     delete(id: string | number): Promise<boolean>;
// }


// generic repository interface with type parameters for entity and ID
export interface GenericRepository<T, K = string | number> {
    getAll(): Promise<T[]>;
    getById(id: K): Promise<T | null>;
    create(item: Omit<T, 'id'>): Promise<T>;
    update(id: K, item: Partial<T>): Promise<T | null>;
    delete(id: K): Promise<boolean>;
}

// base repository implementation using a generic type and a database model
export abstract class BaseRepository<T, K = string | number> implements GenericRepository<T, K> {
    // Inject your database client or collection model here
    protected model: any;

    constructor(model: any) {
        this.model = model;
    }

    async getAll(): Promise<T[]> {
        return await this.model.findMany();
    }

    async getById(id: K): Promise<T | null> {
        const item = await this.model.findUnique({ where: { id } });
        return item || null;
    }

    async create(item: Omit<T, 'id'>): Promise<T> {
        return await this.model.create({ data: item });
    }

    async update(id: K, item: Partial<T>): Promise<T | null> {
        return await this.model.update({
            where: { id },
            data: item,
        });
    }

    async delete(id: K): Promise<boolean> {
        try {
            await this.model.delete({ where: { id } });
            return true;
        } catch {
            return false;
        }
    }
}
