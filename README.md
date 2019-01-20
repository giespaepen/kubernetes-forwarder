# Kubernetes Forwarder

> Little port forwarding tool

## Dependencies

- Install yarn. [More information](https://yarnpkg.com/lang/en/docs/install/).
- Node (>8) should be installed.
- Kubectl installed and configured [More information](https://project.rombit.be/wiki/display/DEV/Kubectl+setup)

### Build the project

- Build `yarn build`
- Build and run `yarn build-start`

## How to run?

When you run this the first time, just install all the dependencies by running `yarn`. Then you run the test runner:

```bash
yarn start

# Run the program
yarn start
```

Then you can first select a namespace and then the pods to forward to. Notice that you'll need to have access
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
env NAMESPACE=kafka yarn start
```

##### Practical example, forward to kafka in the staging environment

In the staging environment the kafka and zookeeper are **not on the same cluster**. Therefore you'll need to run two commands:

```bash
# Run the program with port forwarding
env NAMESPACE=kafka yarn start
# Then select the zk-0 pod
```

Then in a separate window run:

```bash
# Run the program with port forwarding
env NAMESPACE=romware-platform yarn start
# Then select the zk-0 pod
```
