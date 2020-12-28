# Pencil: Backend
Annotated topic search API.

## Access
Live API hosted [here](https://lk-pencil-backend.herokuapp.com).

## Usage
- `/topics`- list topics
- `/questions`- list questions
- `/search`- search questions by annotations, e.g [Questions tagged 'Inheritance'](https://lk-pencil-backend.herokuapp.com/search?q=Inheritance)

## Todo:
- Include testing in CI
- Centralize logging

## Improvement candidates:
- Cache load topic queries
- Topic graph updates(shouldn't be that complicated since we're using a singly linked list)
- Index updates(most naive implementation would be deleting all question index entries and rebuilding)
- 
