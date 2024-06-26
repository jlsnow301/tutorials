import { Bson } from "https://deno.land/x/mongo/mod.ts";

import getDatabase from "../helpers/db.ts";

interface Resource {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

export class LearningResource {
  static async create(data: Resource) {
    const id = await getDatabase().collection("resources").insertOne(data);
    return { id: id.$oid };
  }

  static async findAll() {
    return await getDatabase().collection("resources").find();
  }

  static async update(id: string, data: Resource) {
    await getDatabase()
      .collection("resources")
      .updateOne({ _id: new Bson.ObjectId(id) }, { $set: data });
  }

  static async delete(id: string) {
    await getDatabase()
      .collection("resources")
      .deleteOne({ _id: new Bson.ObjectId(id) });
  }
}
