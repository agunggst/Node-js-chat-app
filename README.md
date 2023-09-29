# Node.js Chat App

Hi! pada project ini saya membuat aplikasi chat menggunakan Node.js + Express, Sequelize sebagai orm-nya,
PostgreSQL, dan EJS sebagai tampilan view server side render. Project ini bertujuan untuk mendalami lebih lanjut mengenai relasi database many-to-many pada PostgreSQL dan Sequelize, dengan relation diagram yang dapat dilihat pada ERD.png


## Disclaimer

Chat app pada project ini tidak di desain untuk realtime, mekanisme login usernya pun masih sangat sederhana, menggunakan toggle `false/true` untuk login bergantian antar user.

## User

|Attribute       |Data Type   		             |
|----------------|-------------------------------|
|id				 |`Integer [primary key]`        |
|username        |`String`            			 |
|avatar          |`String`						 |
|isLogin         |`Boolean`						 |
|createdAt       |`Timestamp`				     |
|updatedAt       |`Timestamp`				     |

### GET /users
```json
[
  {   
    "id": 1,
    "username": "agunggst",
    "avatar": "<link>",
    "isLogin": true,
    "createdAt": "2023-09-28T22:56:57.775Z",
    "updatedAt": "2023-09-28T23:43:01.626Z"
  },
]
```

### GET /users/switch-user
```json
{
  "data": {
    "userData": {
      "id": 1,
      "username": "agunggst",
      "avatar": "<link>",
      "isLogin": true,
      "createdAt": "2023-09-28T22:56:57.775Z",
      "updatedAt": "2023-09-28T23:43:01.626Z"
    },
    "users": [
      {
        "id": 4,
        "username": "yuri",
        "avatar": "<link>",
        "isLogin": false,
        "createdAt": "2023-09-28T22:56:57.775Z",
        "updatedAt": "2023-09-28T22:56:57.775Z"
      }
    ]
  }
}
```

### GET /users/switch-user/:id
Mengganti user yang sedang login, lalu redirect ke halaman `/`

## Room

|Attribute       |Data Type   		             |
|----------------|-------------------------------|
|id				 |`Integer [primary key]`        |
|roomName        |`String`            			 |
|roomAvatar          |`String`						 |
|userId         |`Boolean`						 |
|createdAt       |`Timestamp`				     |
|updatedAt       |`Timestamp`				     |

### GET /rooms/:id
```json
{
  "data": {
    "userData": {
      "id": 1,
      "username": "agunggst",
      "avatar": "<link>",
      "isLogin": true,
      "createdAt": "2023-09-28T22:56:57.775Z",
      "updatedAt": "2023-09-28T23:43:01.626Z"
    },
    "roomData": {
      "id": 1,
      "roomName": "School Group",
      "roomAvatar": "<link>",
      "userId": 1,
      "createdAt": "2023-09-28T22:56:57.782Z",
      "updatedAt": "2023-09-28T22:56:57.782Z"
    },
    "participants": [
      {
        "userId": 4,
        "roomId": 1,
        "createdAt": "2023-09-28T22:56:57.786Z",
        "updatedAt": "2023-09-28T22:56:57.786Z",
        "user": {
          "id": 4,
          "username": "yuri",
          "avatar": "<link>",
          "isLogin": false,
          "createdAt": "2023-09-28T22:56:57.775Z",
          "updatedAt": "2023-09-28T22:56:57.775Z"
        }
      }
    ],
    "messages": [
      {
        "id": 1,
        "userId": 1,
        "roomId": 1,
        "message": "ngajak doang terus ilang ga ini",
        "createdAt": "2023-09-28T22:56:57.799Z",
        "updatedAt": "2023-09-28T22:56:57.799Z",
        "user": {
          "id": 1,
          "username": "agunggst",
          "avatar": "<link>",
          "isLogin": true,
          "createdAt": "2023-09-28T22:56:57.775Z",
          "updatedAt": "2023-09-28T23:43:01.626Z"
        }
      }
    ]
  }
}
```

### GET /rooms/:id/participants
```json
{
  "data": {
    "roomData": {
      "id": 1,
      "roomName": "School Group",
      "roomAvatar": "<link>",
      "userId": 1,
      "createdAt": "2023-09-28T22:56:57.782Z",
      "updatedAt": "2023-09-28T22:56:57.782Z"
    },
    "participants": [
      {
        "userId": 4,
        "roomId": 1,
        "createdAt": "2023-09-28T22:56:57.786Z",
        "updatedAt": "2023-09-28T22:56:57.786Z",
        "user": {
          "id": 4,
          "username": "yuri",
          "avatar": "<link>",
          "isLogin": false,
          "createdAt": "2023-09-28T22:56:57.775Z",
          "updatedAt": "2023-09-28T22:56:57.775Z"
        }
      }
    ]
  }
}
```

### GET /rooms/:id/add-participant
```json
{
  "data": {
    "roomData": {
      "id": 2,
      "roomName": "Basecamp",
      "roomAvatar": "<link>",
      "userId": 1,
      "createdAt": "2023-09-28T22:56:57.782Z",
      "updatedAt": "2023-09-28T22:56:57.782Z"
    },
    "nonParticipants": [
      {
        "id": 4,
        "username": "yuri",
        "avatar": "<link>",
        "isLogin": false,
        "createdAt": "2023-09-28T22:56:57.775Z",
        "updatedAt": "2023-09-28T22:56:57.775Z"
      },
    ]
  }
}
```

### GET /rooms/:id/add-participant/:userId
Menambahkan userId ke dalam participant room, dan redirect ke `/rooms/:id`

### GET /rooms/:id/delete-participant/:userId
Menghapus userId dari participant room, dan redirect ke `/rooms/:id`

## Participant (conjunction table users - rooms)

|Attribute       |Data Type   		             |
|----------------|-------------------------------|
|id				 |`Integer [primary key]`        |
|userId        |`Integer [foreign key]`            			 |
|roomId          |`Integer [foreign key]`			|
|createdAt       |`Timestamp`				     |
|updatedAt       |`Timestamp`				     |


## Message

|Attribute       |Data Type   		             |
|----------------|-------------------------------|
|id				 |`Integer [primary key]`        |
|userId        |`Integer [foreign key]`            			 |
|roomId          |`Integer [foreign key]`						 |
|message         |`String`						 |
|createdAt       |`Timestamp`				     |
|updatedAt       |`Timestamp`				     |

### POST /messages/send/:roomId
Body:
```json
{
  "message": "Hello!"
}
```
`Create` message di suatu room, dan redirect ke `/rooms/:id`