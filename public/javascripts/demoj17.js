App = new Backbone.Marionette.Application();

App.addRegions({
    mainRegion: "#content",
    middleRegion: "#middle",
    rightRegion: "#right"
});

Dog = Backbone.Model.extend({
  idAttribute: '_id'   
});

Dogs = Backbone.Collection.extend({
    model: Dog,
    url: '/api/makedog' 
});


ArticleView  = Backbone.Marionette.ItemView.extend({
  template: '#article-template',
  events: {
  "click #delete" : "deleteArticle"
},
deleteArticle: function(){
     this.model.destroy();
        this.remove();
}
});

DogView = Backbone.Marionette.ItemView.extend({
    template: "#dog-template",
    tagName: 'li',
  events: {
    "mouseover div.dog" : "showArticles",
    "click #delete" : "deleteDog"
  },
  deleteDog: function(){
    console.log("Deleting " + this.model.get("_id"));
        this.model.destroy();
        this.remove();
  },
  showArticles: function(){
    console.log("you clicked dog " + this.model.get("_id"));
    var articlesview = new ArticlesView({model: this.model});
    App.middleRegion.show(articlesview);
  }
});


ArticlesView = Backbone.Marionette.CompositeView.extend({
  itemViewContainer: 'ul',
  template: '#articles-template',
  //itemView: ArticleView,
  ui : {
    input : '#new-article'
  },
  events: {
    "click #add-article" : "addarticle",
    "click #delete" : "deleteArticle"
  },
  addarticle: function(evt){
   var foo = this.model.get("articles");
   var articleText = this.ui.input.val().trim();
    if (evt) {
   foo.push({
        articlename : articleText
      });
       evt.preventDefault();
      this.ui.input.val(' ');
  this.render();
    }
  }
});


DogsView = Backbone.Marionette.CompositeView.extend({
   template: "#dogs-template",
   itemView: DogView,
   ui : {
    input : '#new-todo'
  },
 events : {
    'click #add' : 'addDog'
  },
    addDog: function(evt){
     this.collection = doggies;
    var todoText = this.ui.input.val().trim();
    if (evt) { 
      this.collection.create({
        name : todoText
      });
       evt.preventDefault();
      this.ui.input.val(' ');
    }
  }
});


var doggies = new Dogs();
doggies.fetch();
var doggyview = new DogsView({collection: doggies});
App.mainRegion.show(doggyview);
App.start();