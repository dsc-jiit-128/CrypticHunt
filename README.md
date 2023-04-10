# CrypticHunt
BitBox 3.0

### Branches
- backend

# Routes 
## Response
```
{
    error: "",
    messsage: "",
    data: ""
}
```
## API's
- v1 -> without authentication
- v2 -> jwt authentication required
### [POST] /api/v1/user/login
```
{
    user_name: "",
    password: ""
}
```
### [POST] /api/v1/user/register
```
{
    user_name: "",
    email: "",
    password: ""
}
```

### [GET] /api/v2/user/:id
if id=0 then give self data

### [POST] /api/v2/user/createTeam
```
{
    name: ""
}
```

### [POST] /api/v2/user/joinTeam/:id
id is team id get it from team leader

### [POST] /api/v2/question/:id
```
{
    answer: ""
}
```

### [GET] /api/v2/team/leaderboard