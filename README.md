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
you to use `skaffold`.
To have a big picture, you can find the application infrastructure in
the `/infra/k8s` folder.

If you are new to this project, please follow the following steps to run 
a development copy.

### Install `Docker`

Please ensure that you have **Docker** installed.
You might find the following link useful: https://www.docker.com/products/docker-desktop.
Also, please ensure that Kubernetes is enabled.

In the context of **Docker Desktop**, go to settings, select **Kubernetes** from the menu,
check **Enable Kubernetes**, then click Apply & Restart.

### Install `skaffold`, `kubectl`, and `ingress nginx` 
Please ensure that you have a working copy of `skaffold`, which you can find at
https://skaffold.dev/.
If the link stops working, please do a quick Google search
using keyword "skaffold".
You can read more about `skaffold` on the official website.

Also, you will need `kubectl`. Please find the installation guide here: 
https://kubernetes.io/docs/tasks/tools/install-kubectl/.

Finally, we will be utilizing `ingress nginx` to balance load and perform
route forwarding. Please apply the following configuration to `kubectl`:

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.40.2/deploy/static/provider/cloud/deploy.yaml
```

You can find the full installation guide for `ingress nginx` here: https://kubernetes.github.io/ingress-nginx/deploy/.

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

### Navigate to the App

Open your browser, type `letitfly.dev` in the address bar in order to access the app.

**Problem:** After running `skaffold dev` and navigating to letitfly.dev in your browser,
you will see a big warning saying **"Your Connection is Not Private"**. 
This is because `https` is used in the setup of the load balancer, but `localhost`
cannot be accessed using `https`.

**Solution:** Stay on the page, and type the string
```
thisisunsafe
```

Note that there are no spaces between the words above.

## Contributing

Please follow our workflow when contributing to the codebase.
A typical workflow and important conventions will be briefly introduced here.

### Branch Naming Convention

Please come up with 4 unique characters (using your name as a starting point is recommended) and add them 
to the beginning of your branch name. Following the 4 characters with a `/` character, then add the feature
that you are working on in this branch. For example, `lany/set-up` would be a good branch name.

For the second part of the branch name (i.e. after the `/` character), use the following prefixes:
* `bugfix-` for fixing a bug
* `hotfix-` for hot fixes
* `release-` for release branches

If you are naming a feature branch, do not add a prefix to the branch name.

### Pull Requests

Because this project was initially setup by CSC309 course team, we have no access to settings where we can
implement CI/CD or change the default branch. Therefore, we will eliminate `develop` branch and allow everyone
to merge directly into the `master` branch.

Before you merge your branch, please create a pull request. This way, your code can potentially be reviewed by 
other people, and so the overall code quality may be improved.

### Writing Documentation

Please write documentation when needed for your components. The folder `/docs` is used for more detailed
documentation files.

* **Have fun!**
