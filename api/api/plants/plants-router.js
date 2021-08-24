const router = require("express").Router();
const Plants = require("./plants-model");
const { checkPlantId, checkPlantPayload } = require("./plants-middleware");
const restricted = require("../restricted");

router.get("/", restricted, (req, res, next) => {
    Plants.getPlants()
    .then((plants) => {
        res.status(200).json(plants);
    })
    .catch(next);
});

router.post("/", restricted, checkPlantPayload, (req, res, next) => {
    Plants.createPlant(req.body)
    .then((plant) => {
        res.status(201).json(plant);
    })
    .catch(next);
});

router.put("/:id", restricted, checkPlantId, checkPlantPayload, (req, res, next) => {
    Plants.updatePlant(req.params.id, req.body)
    .then((plant) => {
        res.status(200).json(plant);
    })
    .catch(next);
});

router.delete("/:id", restricted, checkPlantId, (req, res, next) => {
    Plants.deletePlant(req.params.id)
    .then(() => {
        res.status(200).json({ message: `plant with id of ${req.params.id} deleted successfully`});
    })
    .catch(next);
});

router.use((err, req, res, next) => {
    res.status(500).json({ message: "Something went wrong in the router"});
});

module.exports = router;