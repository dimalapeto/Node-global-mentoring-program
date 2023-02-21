import { Op } from 'sequelize';

export default class UserService {
  constructor(sequelize) {
    this.UserModel = sequelize.models.User;
  }

  async create(userData) {
    const user = await this.UserModel.create(userData);
    return user;
  }

  async findUserById(id) {
    const user = await this.UserModel.findOne({
      where: { id },
    });
    return user;
  }

  async update(userData) {
    const user = await this.UserModel.update(userData, {
      where: { id: userData.id },
    });
    return !!user;
  }

  async getSuggestList(filter, limit) {
    const users = await this.UserModel.findAll({
      include: ['groups'],
      where: {
        login: {
          [Op.substring]: filter,
        },
        isDeleted: {
          [Op.not]: true,
        },
      },
    });
    return users.sort((a, b) => a.login.localeCompare(b.login)).slice(0, limit);
  }

  async delete(id) {
    const user = await this.UserModel.findOne({
      where: { id },
    });
    const userToDelete = user.get();
    userToDelete.isDeleted = true;
    const deletedUser = await this.UserModel.update(userToDelete, {
      where: { id: userToDelete.id },
    });
    return !!deletedUser;
  }
}
