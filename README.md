# go-screen-capture
> Go microservice to capture a web page as a screenshot

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
