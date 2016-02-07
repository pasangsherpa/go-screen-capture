# go-screen-capture
> Go microservice to capture a web page as a screenshot

## Using Godep
Install/update godep:

```bash
$  go get -u github.com/tools/godep
```

To have godep determine, save and rewrite your application’s dependencies, navigate to your application’s directory within $GOPATH and run the following command:

```bash
$  godep save -r ./...
```

This will have the following effects:

1. A Godeps/Godeps.json file will be created that contains the JSON representation of the application’s dependencies, the packages that we’re working on (the package spec) and the version of Go you are using locally.

2. Each dependency will be copied into a subdirectory of Godeps/_workspace, mirroring the structure of a $GOPATH.

3. Each application file containing a non local or non std lib import (those that reference packages outside of your application) will be rewritten so that go will import and use the version contained in Godeps/_workspace.


## REST API

REST API is available on "/" using:

* GET method
* POST method with `Content-Type`:
    * *application/json*
    * *application/x-www-form-urlencoded*

Few rules:

* The `"url"` parameter must be specified.
* It is possible to send data using query parameters or [HTTP Message Body](https://en.wikipedia.org/wiki/HTTP_message_body).
* Query parameters will be used in priority and override others.


### Available parameters

<dl>

  <dt>url</dt>
  <dd>Website address (URL). This is the only required parameter for the HTTP request. It is unnecessary for the most cases to configure scheme. Example: "github.com".</dd>

  <dt>format</dt>
  <dd>Indicate the file format for output image (default is `"png"`). Possible values: jpg, jpeg, png, gif, pdf</dd>

  <dt>headers</dt>
  <dd>This property specifies additional HTTP request headers that will be sent to the server for every request issued (for pages and resources). Format: "key1=value1;key2=value2;..." Headers names and values get encoded in US-ASCII before being sent. Please note that setting the 'User-Agent' will overwrite the value set via "agent" parameter.</dd>


### Query examples

For a quick test with the command line (using `curl`), type:

```bash
curl http://localhost:8080/?url=github.com > github.png
curl -H "Content-Type: application/json" -d '{"url":"github.com"}' http://localhost:8080/ > github.png
curl -H "Content-Type: application/x-www-form-urlencoded" -d 'url=github.com' http://localhost:8080/ > github.png
```
