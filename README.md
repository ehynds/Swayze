#API Usage
This project serves as a Node.js-powered API framework that sits in front of the Brightcove Analytics APIs. The Authorization header stuff is handled behind the scenes. For now, until the OAuth system is in place, you can pass the tokens as part of the get request. Please fork the project for any enhancements, as there are many to be made.

##To get account-level information:
/api/v1/json/account/[publisher id]/token:[token]

##To get player information:
/api/v1/json/account/[publisher id]/player/[player id]/token:[token]

##To get information on all players:
/api/v1/json/account/[publisher id]/player/token:[token]

*__Caution: this will fetch all players and their corresponding analytics information from the account, and can potentiall be very slow.__*

##To get video information for a player:
/api/v1/json/account/[publisher id]/video/[video id]/player/[player id]/token:[token]

_To get video information including information from the Read API add the query param ?readAPIToken=[read api token] to the end of the URL._

##To get video information:
/api/v1/json/account/[publisher id]/video/[video id]/token:[token]

##To get all video information:
/api/v1/json/account/[publisher id]/video/token:[token]

_Note: Because there is no current default limit set for this method, we're setting one of 10. That value can be overriden, but I suggest you don't since it will cause slowdowns. Also, the Read API request for the video information will only be made if the limit is set to 10 or less._

_To get video information including information from the Read API add the query param ?readAPIToken=[read api token] to the end of the URL._

##To get video information with a date rage:
/api/v1/json/account/[publisher id]/video/[video id]/token:[token]?from=[from timestamp]&to=[to timestamp]

_Note: either of the from and to fields are optional. For instance, if the from is left off, the URL would look like so: /api/v1/json/account/[publisher id]/video/[video id]/token:[token]?to=[to timestamp]_

The defaults for both fields are:

* from: beginning of the Unix epoch
* to: current timestamp

##To override or update the video fields being retrieved with video information that includes Read API calls:
Pass a comma-separated list of the specific video fields you're looking to fetch (e.g. videoFields=id,name,customFields).

If you only want to add additional fields to the request and not completely override the entire list, pass in updateVideoFields=true as well as the list of video fields you're looking to add (e.g. videoFields=customFields&updateVideoFields=true).

#Query Params
Anything that modifies the response (time range, paging, etc.) will be a query param. An example above explains the time range details. Below is the concise list and what they do:
* from: timestamp of where to start the date range. Defaults to unix epoch.
* to: timestamp of where to end the date range. Defaults to current time.
* limit: how many videos to limit that get returned. Right now, get all videos has no default for limit, so we're setting a default of 10. It can be overriden, but beware massive slowdowns.
* sort: Sorts the order of the response. summary.video_view would give back the most viewed videos in the time period, sort=alltime.video_view would give back the most viewed videos all time.
* skip: specifies how many records to skip. For instance, if you limit the first page to 10 items returned, you would use skip=10 on the next call to get the next page.

#Helpful Info
* When parsing the timestamps in javascript, make sure to parseInt() on the timestamp itself before passing it to new Date();.