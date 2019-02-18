# Kubernetes Forwarder

> Little wrapper around kubectl to facilitate port forwarding and to rapidly restart a previous session.

## Requirements

- Node (8+) must be installed
- kubectl must be installed and configured correctly

## How it works

Run `kubernetes-forwarder`

First you select select a namespace and then the pods to forward to. Notice that you'll need to have access
to those namespaces in order to be able to port forward.

### Configstore
The program uses the package config store to store your last connection. When you rerun the command, the last
connection will be reused. If you want to **override** the last connection, run: `kubernetes-forwarder new`.

## Development

### Dependencies

- Install yarn. [More information](https://yarnpkg.com/lang/en/docs/install/).
- Node (>8) should be installed.
- Kubectl installed and configured [More information](https://project.rombit.be/wiki/display/DEV/Kubectl+setup)

### Build the project

- Build `yarn build`
- And run `yarn start`, run `yarn start:new` to override the last connection in the config
