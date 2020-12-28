# Pencil: Backend
Annotated topic search API.

## Access
Live API hosted [here](https://lk-pencil-backend.herokuapp.com).  

**Heads up**: I am using Heroku's free tier, so the first request needs to wake up the sleeping dyno and will take a second :)

## Usage
- `/topics`- list [topics](https://lk-pencil-backend.herokuapp.com/topics)
- `/questions`- list [questions](https://lk-pencil-backend.herokuapp.com/questions)
- `/search`- search questions by annotations, e.g [Questions tagged 'Inheritance'](https://lk-pencil-backend.herokuapp.com/search?q=Inheritance)

## Todo:
- Include testing in CI
- Centralize logging
- Testing

## Improvement candidates:
- Cache load queries
- Topic graph updates(shouldn't be that complicated since we're using a singly linked list)
- Index updates(most naive implementation would be deleting all question index entries and rebuilding)
- 
