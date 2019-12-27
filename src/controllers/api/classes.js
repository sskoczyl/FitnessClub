const router = require('express').Router();
const Classes = require('../../database/models/class');

router.get('/', (req, res, next) => {
   Classes.getClassesValues(['name', 'description', 'duration'], (err, classes) => {
      if (err) { return next(err) }
      res.json(classes)
   });
});

router.post('/', (req, res, next) => {
   Classes.save(req.body, (err) => {
      if (err) { return next(err); }
      res.sendStatus(201);
   })
});

module.exports = router;
