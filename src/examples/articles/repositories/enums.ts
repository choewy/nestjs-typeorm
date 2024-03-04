export enum ArticleTransaction {
  Post = 'Article.post',
  ExistsById = 'Article.exists_by_id',
  FindById = 'Article.find_by_id',
}

export enum ArticleInformationTransaction {
  FindByArticleId = 'Article.find_by_article_id',
  Post = 'ArticleInformation.post',
  IncreaseLikes = 'ArticleInformation.increase_likes',
  DecreaseLikes = 'ArticleInformation.decrease_likes',
}

export enum ArticleLikeHistoryTransaction {
  FindByRelations = 'ArticleLikeHistory.find_by_relations',
  ExistsByRelations = 'ArticleLikeHistory.exists_by_relations',
  Insert = 'ArticleLikeHistory.insert',
  Delete = 'ArticleLikeHistory.delete',
}
