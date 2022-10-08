# openApi-center Project

This project contains small general-purpose parts of the openApi-center project.  
It includes:  

* DevOps configs / scripts
    * Kube configs
* Documentation
* Some sample files
* Some scripts for running all locally 

## Further details

* [doc/main](Start here)
* [doc/components](Components overview)
* [doc/plans](Ideas and plans for the future)

## Build

Use the kubernetes and helm config to setup a k8s cluster, based on docker images.  

Bring the cluster up with:

> helm install openapi-center ./ops/helm-chart

### From the sources

> Veeeery high level description (draft)

* First build the backend. Use the gradle build (the docker config generated). Then run the *dcoker build*
* Build the front-end, just with the *docker build* (it calls ng)
* Customize the k8s, if wanted
* From *kubectl*, apply the k8s configs

> Check out the README from each project  

### Useful notes:

*Locally:*  

> eval $(minikube docker-env)


**Addressing:**  

To run locally (without Kubernetes), you need a web server in front of all, in order to map the address of the backend
to URI that the frontend looks up.  

Example:  

> My local config with nginx:

        server {
            listen 80;
            server_name oab;
                
            location / {
                proxy_pass http://localhost:4200/;
            }
        
            # Actually not needed anymore (probably - TODO: check it)
            location /view/ {
                proxy_pass http://localhost:8090/api-docs/;
            }
        
            # the FE refereces the BE as the same server with follow URI
            location /api/ {
                proxy_pass http://localhost:8080/;
            }
        }
        

An alternative way: It's also possible to use a node / express script (provided on this project) instead of above config.


To use K8s Ingress and access the resources, first apply this base descriptors:

https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml

----

 