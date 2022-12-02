const articlesService = require("./articles.service");
const usersService = require("../users/users.service");


class ArticleController {
  async getAll(req, res, next) {
 
    try {
      const articles = await articlesService.getAll();
      res.json(articles);
    } catch (err) {
      next(err);
    }
  }
  // async getById(req, res, next) {
  //   try {
  //     const id = req.params.id;
  //     const article = await articlesService.get(id);
  //     const articles = await articlesService.getAll();
  //     const articlesFilter = articles.filter((article) => article.user);
  //     if (!articlesFilter) {
  //       throw new NotFoundError();
  //     }
  //     res.json(article);
  //   } catch (err) {
  //     next(err);
  //   }
  // }
  
  async create(req, res, next) {    
    try {
      const article = await articlesService.create(req.body);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      const articleModified = await articlesService.update(id, data);
      res.json(articleModified);
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      const id = req.params.id;
      await articlesService.delete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticleController();
