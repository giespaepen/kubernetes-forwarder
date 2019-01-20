# Kubernetes Forwarder

> Little wrapper around kubectl to facilitate port forwarding and to rapidly restart a previous session.

## Requirements

- Node (8+) must be installed
- kubectl must be installed and configured correctly

## How it works

Run `kubernetes-forwarder`

First you select select a namespace and then the pods to forward to. Notice that you'll need to have access
to those namespaces in order to be able to port forward.

### Config file

When you first run this program, you have to select the **namespace** and the **services** to forward. When done
a `config.json` will be saved. The config is automatically loaded when you restart the program. If you don't
want it anymore. Just delete the config file.

#### Optional stuff

##### Run without chosing a namespace

You can run the program, skipping the first step. For example, if you want to connect to a pod of the
shared kafka cluster you can run it like so:

```bash
# Run the program with port forwarding
env NAMESPACE=some-namespace kubernetes-forwarder
```

## Development

### Dependencies

- Install yarn. [More information](https://yarnpkg.com/lang/en/docs/install/).
- Node (>8) should be installed.
- Kubectl installed and configured [More information](https://project.rombit.be/wiki/display/DEV/Kubectl+setup)

### Build the project

- Build `yarn build`
- Build and run `yarn build-start`
