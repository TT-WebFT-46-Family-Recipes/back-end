## Family Recipes - Back End

### Heroku

https://tt-webft-46-family-recipes.herokuapp.com/

## Endpoint Summary

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| POST   | /api/auth/register      | Register user          |
| POST   | /api/auth/login         | Login                  |
| GET    | /api/recipes/allRecipes | Get all recipes        |
| GET    | /api/recipes/:id        | Gets a specific recipe |
| POST   | /api/recipes            | Add a new recipe       |
| PUT    | /api/recipes/:id        | Edit a recipe          |
| DELETE | /api/recipes/:id        | Delete a recipe        |

## Registration

**POST to /api/auth/register**

```
{
    "username": "string", //required, unique
    "password": "string" //required
}
```

returns an object containing the created user data and a token

## Login

**POST to /api/auth/login**

```
{
    "username": "string", //required
    "password": "string" //required
}
```

\*returns an object containing the username and a token

## View All Recipes

**GET from /api/recipes/allRecipes**

\*returns an array containing the details of each recipe as an object

## View a Specific Recipe

**GET from /api/recipes/:id**

\*returns an object containing the details of the specified recipe

## Adding a Recipe

**POST to /api/recipes**

```
{
    "title": "string", //required
    "source": "string", //required
    "ingredients": "text", //required
    "instructions": "text", //required
    "user_id": "number" //optional
}
```

\*returns an object showing the details of the newly created recipe

## Editing a Recipe

**PUT on /api/recipes/:id**

\*returns the message "Recipe updated" if successful

## Deleting a Recipe

**DELETE from /api/recipes/:id**

\*returns the message "Recipe deleted" if successful
