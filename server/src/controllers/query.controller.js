import Query from "../models/query.model.js";

export const createQuery = async (req, res) => {
  try {
    const newQuery = await Query.create(req.body);
    res.status(201).json(newQuery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getQueries = async (req, res) => {
  try {
    const queries = await Query.find().populate("packageId");
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateQueryStatus = async (req, res) => {
  try {
    const updatedQuery = await Query.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedQuery) {
      return res.status(404).json({ message: "Query not found" });
    }
    res.status(200).json(updatedQuery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
