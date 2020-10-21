# LetItFly Project

> Author: Jimmy Lan
>
> Last Updated: Oct 21, 2020
 
Let It Fly is an anonymous platform for people to send messages 
("paper cranes") to each other.
This is a course project for CSC309.
Team members: **Jimmy Lan** ([@lanyanxiang](https://github.com/lanyanxiang)), 
[name], [name], [name].

## Project Setup
To view each component in this project separately, use the traditional
approach.
That is, going into each directory ("service") and set up that service
using `npm install` and `npm start`.

To view all components at once in development, we strongly recommend
using `skaffold`.
To have a big picture, you can find the application infrastructure in
the `/infra/k8s` folder.

If you are new to this project, please follow the following steps to run 
a development copy.

### Install `skaffold`, `kubectl`, and `ingress nginx` 
Please ensure that you have a working copy of `skaffold`, which you can find at
`https://skaffold.dev/`.
If the link stops working, please do a quick Google search
on "skaffold".
You can read more about `skaffold` on the official website.

Also, you will need `kubectl`. Please find the installation guide here: 
https://kubernetes.io/docs/tasks/tools/install-kubectl/.

Finally, we will be utilizing `ingress nginx` to balance load and perform
route forwarding. Please apply the following configuration to `kubectl`:

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.40.2/deploy/static/provider/cloud/deploy.yaml
```

or 

```
minikube addons enable ingress
```

You can find the installation guide for `ingress nginx` here: https://kubernetes.github.io/ingress-nginx/deploy/.

### Simulate a Web Page
You need to update your `hosts` file on your machine to 
route `localhost` to `letitfly.dev` so that you can view the application
by typing `letitfly.dev` on your browser.

**Note: The load balancer was not setup to handle requests sending to
`localhost` directly. If you skip this step, you won't be able to view
the application in development mode.**

**MacOS/Linux**: Edit `/etc/hosts`

**Windows**: Edit `C:\Windows\System32\Drivers\etc\hosts`

Append the following entry to the file:
```
127.0.0.1 letitfly.dev
```

**Please ensure that you have root access to your machine when performing
the above operations.**

### Run Deployment Server

In your command line, enter
```
skaffold dev
```

to see the application. Note that due to some existing bugs in `skaffold`,
an error may be thrown causing the process to exit for the first time
when you run the above command.
This error is not caused by our code, and can be solved by simply running 
the command (i.e. `skaffold dev`) again.
