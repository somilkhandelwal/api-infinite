const findOrCreate = (model, payload) =>
  model.findOrCreate({
    where: { email: payload.email },
    defaults: {
      ...payload
    }
  });

const findUser = (model, payload) =>
  model.findOne({
    where: {
      email: payload
    },
    logging: false
  });

const findByPk = (model, id) => model.findByPk(id);

const findAll = model => model.findAll();

module.exports = {
  findOrCreate,
  findAll,
  findUser,
  findByPk
}
