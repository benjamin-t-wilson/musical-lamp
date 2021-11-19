# Github API Facade

This is a pretty simple API built around the Github API

## Install

```
npm install
```

## Run the server

```
npm run dev
```

## Run the tests

```
npm run test
```

- Coverage is output to the `/coverage` folder

# REST API

Endpoint documentation for available endpoints in the API

---

### Get all pull requests

Gets a list of pull requests for a given repo, including related commits

`GET /pullrequests/:username:/:repo`

```
curl -i -H 'Accept: application/json' http://localhost:8081//pullrequests/benjamin-t-wilson/musical-lamp/
```

#### Response

```
[
	{
		"id":  number,
		"url":  string,
		"number":  number,
		"state":  string",
		"title":  string,
		"body":  string,
		"created_at":  string,
		"updated_at":  string,
		"user":  {
			"login":  string,
			"avatar_url":  string,
			"url":  string
		},
		"commits":  [
				{
				"url":  string,
				"name":  string,
				"email":  string,
				"message":  string
				}
			]
	}
]
```

---
