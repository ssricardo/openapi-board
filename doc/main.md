# OpenAPI Board

An API Documentation center in organizational level.

## Overview

OaBoard, or OpenAPI Board, is a small set of tools to provide a central swagger-ui point, with some additional features.  
Instead of the commons approach, on which each app holds and needs to provide its own swagger-ui, 
here the idea is to provide this UI and a service to handle the APIs themselves.
  
This idea came up from a wish to integrate this API docs in organizations's build pipelines. 
With that, the API's doc can be deployed as a step on the pipeline.

### Features

* Central Swagger-ui
* Store API specs on DB
  * Keeps multiple versions of an API (historic)
* Compare different versions of an API (easy to track changes)
* Store and manage request samples (showed as Swagger examples)
* Integration with build tools
  * Possible to integrate in build pipeline


## Getting started

The easiest way is to use the existing Docker images and Kubernetes configurations.

