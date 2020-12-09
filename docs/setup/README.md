## Setting Up a Local Development Cluster

> Author: Jimmy Lan
>
> Last Updated: 2020-12-09

In this article, we will talk about the steps that you have to take in order
to set up a local copy of our project.

### Viewing Components

To view each component in this project separately, use the traditional
approach.
That is, going into each directory ("service") and set up that service
using `npm install` and `npm start`.

To view all components at once in development, we strongly recommend
you to use `skaffold`.
To have a big picture, you can find the application infrastructure in
the `/infra/k8s` folder.

### Install `Docker`

Please ensure that you have **Docker** installed.
You might find the following link useful: https://www.docker.com/products/docker-desktop.
You will also need to enable **Kubernetes** to run this project successfully.

In the context of **Docker Desktop**, go to settings, select **Kubernetes** from the menu,
check **Enable Kubernetes**, then click Apply & Restart.

### Install `skaffold`, `kubectl`, and `ingress nginx`

To run this project, a working copy of `skaffold` is strongly recommended, as a skaffold configuration file is provided under the root folder of this repository.
You can install skaffold from https://skaffold.dev/.

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

### Add Secrets

Please copy and paste the following command to your terminal:

```
kubectl create secret generic jwt-secret --from-literal JWT_SECRET=asdf
```

Don't worry, we will not use `asdf` as our secret string in the real production site.

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

**Solution:** Click anywhere on the blank spaces on the page, and type the string

```
thisisunsafe
```

Note that there are no spaces between the words above. Also note that you are
not typing into some text boxes. Just click on any blank space on the page and type
the string.

You should be able to see the application now. The setup process is now complete.
