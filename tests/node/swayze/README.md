#API Usage
This project serves as a Node.js-powered API framework that sits in front of the Brightcove Analytics APIs. The Authorization header stuff is handled behind the scenes. For now, until the OAuth system is in place, you can pass the tokens as part of the get request. Please fork the project for any enhancements, as there are many to be made.

##To get account-level information:
/api/v1/json/account/[publisher id]/token:[token]

##To get player information:
/api/v1/json/account/[publisher id]/player/[player id]/token:[token]

##To get video information:
/api/v1/json/account/[publisher id]/video/[video id]/token:[token]

##To get video information for a player:
/api/v1/json/account/[publisher id]/video/[video id]/player/[player id]/token:[token]

##To get video information with a date rage:
/api/v1/json/account/[publisher id]/video/[video id]/from:0/to:123456789/token:[token]

_Note: either of the from and to fields are optional. For instance, if the from is left off, the URL would look like so: /api/v1/json/account/[publisher id]/video/[video id]/to:123456789/token:[token]_

The defaults for both fields are:

* from: beginning of the Unix epoch
* to: current timestamp