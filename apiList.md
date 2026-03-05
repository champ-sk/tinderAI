##authRouter
Post /signup
Post /login
Post /logout

#profileRouter
Get /profile/view 
Ptach /profile/edit
Patch /profile/password


#connectionRequestRouter
Post
request/send/match/:userId
request/send/ignored/:userId
request/review/accepted/:requestId
request/review/rejected/:requestId


#userRouter
get
/user/connection 
/user/requests 
/user/feed
