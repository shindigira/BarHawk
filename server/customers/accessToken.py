import requests

# Once your user has signed in using the previous step you should redirect
# them here

parameters = {
    'redirect_uri': 'http://localhost:3000',
    'code': 'JNGS5Ti80Tu1Hp4Bv5MFhtToc39x0E',
    'grant_type': 'authorization_code',
}

response = requests.post(
    'https://login.uber.com/oauth/token',
    auth=(
        'lOP16uWPKTcEXgfG7Ps_FkvJ5_GK4Xni',
        'tAsKnrtg7HX_1Z9_Rj4H28zBE5irgdHEO35-9NEb',
    ),
    data=parameters,
)

# This access_token is what we'll use to make requests in the following
# steps
access_token = response.json().get('access_token')


url = 'https://api.uber.com/v1/me'
response = requests.get(
    url,
    headers={
        'Authorization': 'Bearer %s' % access_token
    }
)
data = response.json()
print access_token