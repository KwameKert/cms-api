const Sermon = require("../../models/Sermon");
const { getPagination, getPagingData } = require("../utils/helper");

const responseApi = (res, status, data, message) => {
  return res.status(status).send({ data, message });
};

async function saveSermon(req, res) {
  try {
    let sermon = await Sermon.create({ ...req.body });
    return responseApi(res, 201, sermon, "Sermon saved successfully");
  } catch (error) {
    console.error(error);
    return responseApi(res, 500, null, error.message);
  }
}

async function updateSermon(req, res) {
  try {
    let sermon = await getSermon({ id: req.body.id });
    if (!sermon) {
      return responseApi(res, 400, null, "No sermon found");
    }
    await Sermon.update({ ...req.body }, { where: { id: req.body.id } });
    let updatedSermon = await Sermon.findByPk(req.body.id);
    return responseApi(res, 200, updatedSermon, "Sermon updated successfully");
  } catch (error) {
    console.error(error.message);
    return responseApi(res, 500, null, error.message);
  }
}

async function fetchSermons(req, res) {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    let data = await Sermon.findAndCountAll({
      order: [["id", "DESC"]],
      limit: size,
      offset: offset,
    });
    let sermons = getPagingData(data, page, size);
    if (sermons.length < 1) {
      return responseApi(res, 204, null, "No sermons found");
    }
    return responseApi(res, 200, sermons, "Sermons found");
  } catch (error) {
    console.error(error.message);
    return responseApi(res, 500, null, error.message);
  }
}

async function fetchRecommendedSermons(req, res) {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    let data = await Sermon.findAndCountAll({
      order: [["id", "DESC"]],
      where: { featured: true },
      limit: size,
      offset: offset,
    });
    let sermons = getPagingData(data, page, size);
    if (sermons.length < 1) {
      return responseApi(res, 204, null, "No sermons found");
    }
    return responseApi(res, 200, sermons, "Sermons found");
  } catch (error) {
    console.error(error.message);
    return responseApi(res, 500, null, error.message);
  }
}

async function getSermon(query) {
  let sermon = await Sermon.findOne({ ...query });
  return sermon;
}

module.exports = {
  saveSermon,
  updateSermon,
  fetchSermons,
  fetchRecommendedSermons,
};
