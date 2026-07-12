// import { BaseRepository } from "./base-repository";

// // Define the User interface
// export class UserRepository extends BaseRepository<User> {

//     constructor(dbUserModel: any) {
//         // Initialize your database client or collection model here
//         super(dbUserModel);
//     }

//     //add custome queries unique to users
//     async findByEmail(email: string): Promise<User | null> {
//         return await this.model.findUnique({ where: { email } });
//     }
// }