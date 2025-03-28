import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";

class BaseService<T extends Document> {
    protected model: Model<T>; // ✅ Corrected type

    constructor(model: Model<T>) {
        this.model = model;
    }

    async getAll(condition: FilterQuery<T>): Promise<T[]> {
        return await this.model.find(condition);
    }

    async getOne(condition: FilterQuery<T>): Promise<T | null> {
        return await this.model.findOne(condition);
    }

    async getByIds(ids: string[]): Promise<T[]> {
        return await this.model.find({ _id: { $in: ids } });
    }

    async create(payload: Partial<T>): Promise<T> {
        const doc = new this.model(payload);
        return doc.save();
    }

    async update(id: string, updateData: UpdateQuery<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    }

    async delete(id: string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id);
    }

    async getPaginated(payload: { filters?: Partial<T>; skip?: number; limit?: number }): Promise<{ data: T[]; total: number }> {
        const { skip = 0, limit = 10, filters = {} } = payload;

        const [data, total] = await Promise.all([
            this.model.find(filters).skip(skip).limit(limit).exec(),
            this.model.countDocuments(filters).exec(),
        ]);

        return { data, total }; // ✅ Convert to plain objects
    }
}

export default BaseService;
