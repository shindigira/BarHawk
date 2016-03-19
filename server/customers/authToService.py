from rauth import OAuth2Service
uber_api = OAuth2Service(
     client_id='lOP16uWPKTcEXgfG7Ps_FkvJ5_GK4Xni',
     client_secret='tAsKnrtg7HX_1Z9_Rj4H28zBE5irgdHEO35-9NEb',
     name='BarHawk',
     authorize_url='https://login.uber.com/oauth/authorize',
     access_token_url='https://login.uber.com/oauth/token',
     base_url='https://api.uber.com/v1/',
 )
parameters = {
    'response_type': 'code',
    'redirect_uri': 'http://localhost:3000',
    'scope': 'profile',
}
# Redirect user here to authorize your application
def fn():
    login_url = uber_api.get_authorize_url(**parameters)
    return login_url
print fn()