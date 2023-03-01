export default class GroupService {
  constructor(sequelize) {
    this.GroupModel = sequelize.models.Group;
    this.UserModel = sequelize.models.User;
    this.sequelize = sequelize;
  }

  async create(groupData) {
    const group = await this.GroupModel.create(groupData);
    return group;
  }

  async findGroupById(id) {
    const group = await this.GroupModel.findOne({
      where: { id },
    });
    return group;
  }

  async update(groupData) {
    const group = await this.GroupModel.update(groupData, {
      where: { id: groupData.id },
    });
    return !!group;
  }

  async findAll() {
    const groups = await this.GroupModel.findAll({
      include: {
        model: this.UserModel,
        as: 'users',
        through: { attributes: [] },
      },
    });
    return groups;
  }

  async delete(id) {
    const deletedGroup = await this.GroupModel.destroy({
      where: { id },
    });
    return !!deletedGroup;
  }

  async addUsersToGroup(groupId, userIds) {
    try {
      const result = await this.sequelize.transaction(async (t) => {
        const users = await this.UserModel.findAll(
          {
            where: {
              id: userIds,
            },
          },
          { transaction: t }
        );

        const group = await this.GroupModel.findOne(
          {
            where: { id: groupId },
          },
          { transaction: t }
        );

        await group.addUser(users, { transaction: t });

        return group;
      });

      return !!result;
    } catch (error) {
      return { isError: true, error };
    }
  }
}
