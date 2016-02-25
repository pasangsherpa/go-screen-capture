# screen-capture
> Node microservice to capture a web page as a screenshot

## Pushing app to heroku

```bash
heroku docker:release --app go-screen-capture
```

## REST API

REST API is available on "/" using:

* GET method
* POST method

Few rules:

* The `"url"` parameter must be specified.

### Available parameters

<dl>
  <dt>url</dt>
  <dd>Website address (URL). This is the only required parameter for the HTTP request. It is unnecessary for the most cases to configure scheme. Example: "github.com".</dd>

  <dt>format</dt>
  <dd>Indicate the file format for output image (default is `"png"`). Possible values: jpg, jpeg, png, gif, pdf</dd>
</dl>


### Query examples

For a quick test with the command line (using `curl`), type:

```bash
curl https://go-screen-capture.herokuapp.com/?url=http://github.com > github.png
```
