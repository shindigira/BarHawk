import requests

url = 'https://api.uber.com/v1/me'
response = requests.get(
    url,
    headers={
        'Authorization': 'Bearer %s' % "8bJ49Gi7ws4b70SUB34XuntD5nQ5vC"
    }
)
data = response.json()
print data