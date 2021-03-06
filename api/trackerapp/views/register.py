import json
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def register_user(request):
    '''Handles the creation of a new user for authentication

    Method arguments:
      request -- The full HTTP request object
    '''

    # Load the JSON string of the request body into a dict
    req_body = json.loads(request.body.decode())

    # Create a new user by invoking the `create_user` helper method
    # on Django's built-in User model
    try:
        new_user = User.objects.create_user(
            username=req_body['username'],
            email=req_body['email'],
            password=req_body['password'],
            first_name=req_body['first_name'],
            last_name=req_body['last_name']
        )
        new_user.save()

        # Use the REST Framework's token generator on the new user account
        token = Token.objects.create(user=new_user)

        # Return the token to the client
        data = json.dumps(
            {
                "valid": True,
                "user_id": new_user.id,
                "token": token.key
            }
        )
        return HttpResponse(data, content_type='application/json')

    except Exception as x:
        return HttpResponse(x, content_type='application/json')
