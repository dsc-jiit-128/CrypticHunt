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
### /api/v1/user/login
```
{
    user_name: "",
    password: ""
}
```
### /api/v1/user/register
```
{
    user_name: "",
    email: "",
    password: ""
}
```

### /api/v2/user/:id
if id=0 then give self data

### /api/v2/user/createTeam
```
{
    name: ""
}
```

### /api/v2/user/joinTeam/:id
id is team id get it from team leader
