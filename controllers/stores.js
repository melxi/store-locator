const Store = require("../models/Store");

//@route GET /api/v1/stores
//@desc get all stores
//@access public
exports.getStores = async (req, res, next) => {
  try {
    const store = await Store.find();

    res.status(200).json({
      success: true,
      count: store.length,
      data: store
    });
  } catch (err) {
    next(err);
    res.status(500).json({ error: "Server error" });
  }
};

//@route POST /api/v1/stores
//@desc add a store
//@access public
exports.createStore = async (req, res, next) => {
  try {
    const store = await new Store({
      storeId: req.body.storeId,
      address: req.body.address
    });

    await store.save();
    res.status(201).json({
      success: true,
      data: store
    });
  } catch (err) {
    next(err);
  }
};
