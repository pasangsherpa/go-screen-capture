FROM pasangsherpa/go-webloop:heroku

# set env vars
ENV APP go-screen-capture

# install webloop
RUN go get -u -tags gtk_3_10 github.com/pasangsherpa/webloop/...