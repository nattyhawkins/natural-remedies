# Wellbean
##### Full-stack | Solo | 8 days

This was my final project for the General Assembly SEI course, completed solo over 8 days. Wellbean is a full-stack application where users can search, favourite, review and post natural remedies and their ingredients, all saved to registered users’ profiles.

[View site](http://wellbean-app.herokuapp.com/)

![Wellbean](/client/src/assets/readme/hero.png)


## Technologies
- Python
- Django
- PostgreSQL
- JavaScript
- React.js
- Bootstrap
- SASS
- TablePlus
- Insomnia
- React router, hooks
- Axios
- Moment
- JWT 
- Base64
- Django REST framework
- Git/GitHub
- Cloudinary

## Code Installation
- Clone or download the repo
- `pipenv` to install Python packages
- `pipenv shell` to activate virtual environment
- For each of the following models: jwt_auth, benefits, active_ingredients, recipes, comments -> run:  
    `python manage.py loaddata <MODEL>/seeds.json` to install data from database
- `client` to go to the front end directory
- `npm i` to install frontend dependencies
- `npm run build`
- `..` to go back to main directory, run `python manage.py runserver` to start the app then navigate to server address provided

## Brief
The project must:
- Use a Python Django API using Django REST Framework to serve your data from a Postgres database
- Consume your API with a separate front end built with React
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
- Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
- Have a visually impressive design
- Be deployed online so it's publicly accessible.

## Planning
After deciding on a wellness theme, I started to draw out the pages on Excalidraw to help visualise all the main components. Initially, the plan was to just have ingredients and feature information including speculated health benefits. However, incorporating recipes provided another use for the app. The plan was to reuse the components wherever possible to save time on front end development. Features deemed lower priority are recoloured orange, indicating a stretch goal. 

![wireframe](/client/src/assets/readme/wireframe1.png)
![wireframe](/client/src/assets/readme/wireframe2.png)

With a better vision in mind, I wrote out the model structures and relationships on QuickDBD. This still untitled project would centre around 2 principal models: recipes and ingredients. I decided to have benefits assigned to ingredients, which in turn are assigned to recipes, as opposed to assigning benefits separately to ingredients and recipes. Recipes would then be automatically associated with all the benefits of their assigned ingredients, and prevent users from having to assign their own benefits when creating a recipe.

![database diagram](/client/src/assets/readme/dbd.png)



## Build Process
### Set up and Back end: Days 0-2
On reflection of previous projects, I felt that there was, at times, a tendency towards trying to tackle too many things at once and spreading ourselves on the thin side. Wanting to learn from this, I made a conscious effort to work through this project very methodically. This would make future tasks more straightforward if I had already coded with them in mind, and streamline the process when refactored code is already on hand for repurpose. I took each component in turn, developing to completion as appropriate, so that once I moved on, I wouldn’t need to come back to it.

#### Set up
After creating a Git repo with development and feature branches, I went through some initial steps to set the project up on VSCode:
create new django project inside its own virtual environment with pipenv
update the default SQLite database to PostgreSQL
Install django rest framework to make use of its off-the-shelf tools

#### Model schema
Boring bit out the way, I moved on to building the principal apps, not forgetting to add them to ‘installed apps’  in the project settings. Following my database diagram made in the planning stage, I started defining the model schema by extending the Model class from Django’s built-in models package, assigning relationships where appropriate, and registering them in the admin system.

```
class Active_Ingredient(models.Model):
    name = models.CharField(max_length=50)
    latin_name = models.CharField(max_length=50)
    image = models.CharField(max_length=300)
    bg_image = models.CharField(max_length=300, default=None, blank=True, null=True)
    description = models.TextField(max_length=50000)
    benefits = models.ManyToManyField(
        'benefits.Benefit',
        related_name="active_ingredients",
    )

    def __str__(self):
        return f"{self.name}"
```

The Benefit model should have a many-to-many relationship with Active_Ingredient, so any one ingredient can be associated with multiple benefits and vice versa. The foreign field needs to be directed to the appropriate model in the first argument, and assigned a key name for the corresponding field when reverse populating ingredients onto benefits in the second. That last bit defining `__str__` just adds a title for each model instance in the admin system.

#### Journey of a request: URL patterns, views, serializers, and Insomnia
So far, my models were ready to go and coming through on the admin system after migrating. I took the opportunity to familiarise myself with the admin system and seed the database, creating a few instances of each model so there’s something to interact with. I also ran a few commands to back them up. So, now the tables existed in the database, I needed to write routes to interact with them.

Each request from the front end is directed via a chain of URL patterns, using Django’s ‘urls’ package. 
If the request address has a match, it can continue. If not, the request is rejected with an error. Of course, at this stage I did not have a front end. This is where Insomnia came in to generate requests and handle responses.

I used Django’s REST framework to build view classes that interact with the database, making use of its predefined tools. In this view, two functions are defined. The first is designed to be a reusable function that will try to retrieve a single row from the Active_Ingredient table, and handle any related exceptions internally. The second function calls on the first to retrieve the row that matches the primary key (pk) on the request.

```
class Active_IngredientDetailView(APIView):
  def get_active_ingredient(self, pk):
      try:
        return Active_Ingredient.objects.get(pk=pk)
      except Active_Ingredient.DoesNotExist as e:
        raise NotFound(str(e))
      except Exception as e:
        return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

  def get(self, _request, pk):
      active_ingredient = self.get_active_ingredient(pk)
      active_ingredient = PopulatedActive_IngredientSerializer(active_ingredient)
      return Response(active_ingredient.data)
  ```

 Before the response object from the database can be returned, it needs to be ‘serialised’ into a Python data type. This allows the response to be rendered into JSON for the flight back to the front end, or Insomnia.                              

The generic serializer defined for the Active_Ingredient model extends Django REST framework’s ModelSerializer class, acting as a serializer cookie-cutter. 

```
from ..models import Active_Ingredient
from rest_framework import serializers

class Active_IngredientSerializer(serializers.ModelSerializer):
    class Meta:
      model = Active_Ingredient
      fields = '__all__'
```

Whilst this is all well and good, in the context of the front end where this request type will actually be used, we will want to also receive related fields to other models. For example, the page that displays a single ingredient should also display related comments, favourites, benefits and recipes. For this reason, I defined a unique serializer, extending the generic, that will populate these relationships, with each of these models in turn taking their own specific serializers depending on their requirements.

```
class PopulatedActive_IngredientSerializer(Active_IngredientSerializer):
    comments = OwnedCommentSerializer(many=True)
    favourites = OwnedFavouriteSerializer(many=True)
    benefits = BenefitSerializer(many=True)
    recipes = RecipeSerializer(many=True)
```

It is clear to see that a web of serializers can quickly accumulate which runs the risk of circular imports. This became a challenge for some of the User views, which I’ll come back to later. 

#### Authentication
Django comes with its own default authentication, but I needed to build my own to do all the things I needed it to. Resetting the authentication settings at this stage required dropping the database to then migrate, recreate a superuser and reseed the database with the backups all from scratch. In future, I’d look to start with this before setting up the other apps to avoid the hassle. 

Now back up and running, I wrote user registration and login endpoints. The registration view was much like any other post function I had written, leveraging the generic serializer to post the request data in the respective table. However, this serializer would need an extra validation check not already covered by the ModelSerializer: a custom function to ensure the user correctly matched their password with the password confirmation. For the login view, I used the username and password from the post request to retrieve the user from the User table and validate against the saved password. Then, I built up the token with JWT, using Datetime for the expiry, and returning with a 202 response. 

Some requests I wanted to allow access only if the user was logged in, such as posting a comment or, more obviously, loading their profile. This required a custom authentication class, extending the BaseAuthentication provided by the REST framework, and decoding the authorization token on the request header. Redirecting the rest framework default authentication to this class in the project settings is a simple method of restricting permissions.

Now with the app fully authenticated, there was one final function required of the User model: relating database rows created by the user to the user. For this, I returned to the User model schema and defined three many-to-one foreign fields, matching them up with foreign keys defined on each of the respective models. Having not used this relationship type before, I followed its definition in the documentation as well as VSCodes in-built assistant, printing out the error in the console to solve errors.

On User model schema:
```
    comments = models.ManyToOneRel(
        field = 'ForeignKey',
        to = 'comments.Comment',
        field_name = 'comments',
        related_name="owner",
    )
```

On Comment model schema:
```
    owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='comments',
    on_delete=models.CASCADE
    )
```

### Front end

#### Day 3: Navigation and Authentication
On day 3 I turned my attention to setting up the front end. As with previous projects, I began by building the browser router with react-router-dom and the main skeleton of pages, navigable via a navbar. I like to start this way as it provides a template to build upon once it's visible in the browser. Then I focused on authentication. This is an important part of the app and I didnt want to leave it until the end. I decided to use Bootstrap tabs inside modular components as I liked that it doesn’t direct you away from whatever page you are on, especially as I wrote conditionals that trigger the modal if not logged in for the permission restricted requests, such as favouriting. I spent a healthy amount of time on making this slick, with good error handling, so that once I moved on, I didn't need to come back to it. 

![Login and register modal](/client/src/assets/readme/auth.png)

#### Index page
To be as time conscious as possible, I prefer to leave the home page until the end so if I run short on time, I can pull something simple together and focus on other tasks. Therefore I went straight to the index page. My main aim here was to create one component to be used by both the recipe and ingredient models, but with unique url addresses. To get round this, I set the route path with a placeholder, obtaining the target model from the url with useParams and setting conditional reasoning to display the relevant component. Unfortunately, due to the varying structure of recipes and ingredients, it wasn’t quite that simple. The small difference just meant anything I did for ingredients needed a separate solution for recipes, and another conditional. 

```
modelLoad === 'active_ingredients' ?
  <IndexIngredients items={items} model={model} benefits={benefits}
    setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow} />
  :
  <IndexRecipes items={items} model={model} benefits={benefits}
    setBenefits={setBenefits}setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
```

#### Filters
On day 4, I fixed up some filters. By adding query parameters to the request address, a new request would be sent whenever a new filter occurs. Now I just needed to figure out how to rewrite the recipe and ingredient list views to filter the response in the backend. Still relatively new to Django, this was a question for the internet. I had done something similar in MongoDB, so I had an aim in mind. I came across a very wide range of potential methods on Django documentation as well as stack overflow. Many seemed to overcomplicate what I was trying to do or miss out a crucial part of the syntax, until I stumbled on a w3 schools page and it all fell into place.

```
class RecipeListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )
  def get(self, request):
        search = request.query_params.get('search')
        benefit = request.query_params.get('benefit')
        benefit = benefit if benefit != 'default' else ''
        includes = request.query_params.get('includes')
        recipes = Recipe.objects.filter(
          name__icontains=search, 
          active_ingredients__benefits__name__icontains=benefit,
          active_ingredients__name__icontains=includes,
          ).distinct()
        serialized_recipes = SemiPopulatedRecipeSerializer(recipes, many=True)
        return Response(serialized_recipes.data, status.HTTP_200_OK)
```

Once I was happy with the index page, I moved on to the single item page. Since I had already spent a lot of time building a fully functional comments section for my previous project, it made sense to incorporate those rather than reinventing the wheel. I used a stripped back version, without likes or sub-comments, wanting to spend more time learning something new. For the favourites, I followed the same strategy I came up with for likes in my previous project, using the response status code to check whether the user had liked the item or not. The recommendations section was a stretch goal which I had time to implement later on.

![Comments](/client/src/assets/readme/comments.png)


#### Profile
The trick for setting up the profile as quickly as possible was reusing components anywhere I could. Once I had the ‘get profile’ response coming through with all the necessary fields, it was easy enough to feed through the required props from the response to the React components. My favourite feature on this page was using Bootstrap carousel to paginate favourites, displaying up to three recipes / ingredients at a time. I wrote a function to partition the favourites array into nested arrays of length at most three. Then for responsiveness, set an event listener on window resizing to dynamically change the number of items on each carousel slide. 

![Favourites carousel](/client/src/assets/readme/carousel.png)ç


### Finishing touches - day 6-8
At this point I had more or less reached my MVP. There was still plenty of time to implement my original home page design in full. I added recommendations, then developed the styling and responsiveness. 

I had decided to miss functionality for users to post their own recipe in favour of smoothing out rough edges ahead of the deadline. But when the last day came and I felt there was nothing left, I took the risk, making sure to build in a new feature branch in case things went awry.

![Create recipe form](/client/src/assets/readme/recipe-form.png)

The two main potential blockers on this form were the upload image and multi-select input. Having already got to grips with Cloudinary for user profile picture uploads, the first went down without a fight. I did, however, notice that if you try to submit the recipe too quickly, the Cloudinary request hasn’t had a chance to complete and an error appears. This led me to adding a spinner while the upload is running. 

Whilst I was familiar with single select input, this was the first time I’d implemented a multi-select, but I was determined to get it in before the deadline. I followed the same principles as far as possible then weighed up my options until I could see a solution. I set a state to track the ids of selected ingredients in an array called ‘selectField’. Then, using three if statements, I set the three possible outcomes: 
The user selects ‘None’, with id ‘default’, to clear their selection
The user reselects an items to remove it
The user selects an item
Finally, a useEffect updates the overall formFields state tracking the form entries as a whole and handles errors.

```
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    if (error !== []) setError([])
  }

  const handleSelectChange = (e) => {
    if (e.target.value === 'default'){
      setSelectField([])
    } else if (selectField.includes(parseInt(e.target.value))){
      const removeIngredient = [... selectField].filter(ingredient => ingredient !== parseInt(e.target.value))
      setSelectField(removeIngredient)
    } else {
      setSelectField([ ...selectField, parseInt(e.target.value) ])
    }
  }

  useEffect(() => {
    setFormFields({ ...formFields, 'active_ingredients': selectField })
    if (error !== []) setError([])
  }, [selectField])
```


## Challenges
### Complex Django relationships
For the most part, the Django apps followed a similar structure requiring just a few tweaks here and there on the views and relationships. Once one was set up, I could use it as a reference for the next. This worked well up until the ‘get profile’ view. In order to retrieve the logged user, I also wanted the user’s comments, favourites and created recipes populated on the request. So far so good. For this I used a ‘populated user serializer’ including these three models as foreign fields. After testing this out on the front end, I realised I also needed to populate these three foreign fields another level deeper: 
for each comment, the associated recipe or ingredient 
for each favourite, the associated recipe or ingredient 
for each recipe, the featured ingredients and favourites

The first was simple. I created a new comment serializer featuring the generic ingredient and recipe serializers, but without the owner serializer to avoid circular import. 

The second began the same. However, after creating the new serializer, I realised this branch of the tree would need another level. In order to display the favourites with all the necessary information, each recipe / ingredient would also need their full list of favourites and benefits. So, that pathway is user > favourite > recipe / ingredient > favourite and benefit. As expected, I got circular import errors.

I’ll leave out the details of the third but rest assured it was even worse than the second, giving rise to two more generations. Untangling this web of relationships took patience, logic and some trial and error. I tried writing and rewriting serializers and mapping out family trees on paper. I was convinced the serializer pathways were correct but couldn’t shake the circular import error. After stepping back for a second, I realised there was a stupidly simple solution for this: throw the offending serializers into a new file. It worked  which was both relieving and frustrating due to the simplicity of the solution. 

```
class Favourite(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    active_ingredient = models.ForeignKey(
      'active_ingredients.Active_Ingredient',
      related_name = 'favourites',
      on_delete = models.CASCADE,
      default=None, blank=True, null=True
    )
    recipe = models.ForeignKey(
      'recipes.Recipe',
      related_name = 'favourites',
      on_delete = models.CASCADE,
      default=None, blank=True, null=True
    )
    owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='favourites',
    on_delete=models.CASCADE,
    )

    def __str__(self):
        reference = self.active_ingredient if self.active_ingredient else self.recipe
        return f"{self.owner} - {reference}"
```


### Recipe vs Ingredient
Potentially the biggest challenge of the whole project was juggling the recipes with the ingredients. As previously mentioned, their relationship and internal structures complicated the sharing of components. Sharing components with different browser routes caused further problems when navigating directly between the two. For instance, when clicking between the recipe index and the ingredient index. Console logging some things out helped me to understand that on first load, the code runs in the correct order. But, when navigating to the other index, there is a brief mismatch of, say, ingredients being fed into the recipe component that is being rendered, or vice versa. My solution for this was to add another state, ‘modelLoad’, that updates to match the new ‘model’ referenced in the browser route once the new response has fully loaded. Then, adding the condition that the ‘model’, defined by the url address placeholder, strictly equals modelLoad before rendering the ingredient or recipe components.

I reached Level 2 of this problem when implementing the recommendations on the single page, where featured ingredients are recommended on the recipe pages and vice versa. Therefore, I’d need a ‘recLoad’ as well as ‘modelLoad’, and a chain of conditions.

```
{items.length > 0 && item && (model === modelLoad) && (recModel === recLoad)
  && (modelLoad === 'active_ingredients' ?
    <>
      <SingleIngredient item={item} favouriteStatus={favouriteStatus} handleFavourite={handleFavourite} setShow={setShow}/>
      {!recError && 
      <Row className='collection d-flex groups-row justify-content-start flex-wrap mt-5'>
        <h4 className='highlight'>RECOMMENDED</h4>
        <IndexRecipes items={items} model='recipes' benefits={benefits} setBenefits={setBenefits} 
          setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
      </Row>
      }
    </>
    : modelLoad === 'recipes' ?
      <SingleRecipe item={item} items={items} setShowAddRecipe={setShowAddRecipe} recError={recError} 
        favouriteStatus={favouriteStatus} handleFavourite={handleFavourite} setShow={setShow} setRefresh={setRefresh} 
        refresh={refresh} benefits={benefits} setBenefits={setBenefits}/>
      :
      <></>
  )}
```

I really enjoy this kind of problem solving where once you fully understand what’s wrong and can visualise the steps, it's just about finding a route through to make all the ends meet.

## Wins
The challenges that are eventually solved always feel like the biggest wins. But aside from these, I’m really pleased with the error handling and generally navigation of the website. Each page features conditionals that catch potential errors and display an animation, such as an api request malfunctioning or simply loading. 

![loading spinner](/client/src/assets/readme/spinner.png)

Each page is also intuitively linked to other pages through recommendations or ‘benefit’ buttons that link to the index page filtered by the selected benefit. The organisation of components and methodical approach I took to developing the app feels logical, which means going back and making changes even after some time has passed is much easier.


## Key Takeaways
- Developing server side in Python with Django
- Following documentation to implement new concepts
- Working with relational databases in PostgreSQL and TablePlus
- Uploading images with Cloudinary
- Complex conditional reasoning for rendering components
- Time management, planning and prioritisation for a solo project of this scale


## Bugs
- No favicon
- Due to the relationship of benefits on ingredients and ingredients on recipes, some recipes suggest inaccurate benefits. For example, lavender is supposed to be good for digestion, but a lavender candle probably isn’t… My initial reasoning for this was to make it easier to add recipes so users don’t have to assign benefits. On reflection, the cons might outweigh the pros here.


## Future Improvements
- More filters on the index pages
- Better / more recommendations. Can recommend pages that share a benefit. These could go inside a carousel like the favourites on the profile page to allow pagination of results.
- Buttons to share page on other platforms
