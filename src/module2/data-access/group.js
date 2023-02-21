export default class GroupService {
  constructor(sequelize) {
    this.GroupModel = sequelize.models.Group;
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
    const groups = await this.GroupModel.findAll();
    return groups;
  }

  async delete(id) {
    const deletedGroup = await this.GroupModel.destroy({
      where: { id },
    });
    return !!deletedGroup;
  }
}
