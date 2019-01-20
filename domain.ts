type KubeCtlApiVersion = "v1" | "v2";
type KubeCtlKind = "Namespace" | "Pod" | "Service";

export interface IKubeCtlResult<T, U> {
  apiVersion: KubeCtlApiVersion;
  items: IKubeCtlResultItem<T, U>[];
}

export interface IKubeCtlResultItem<T, U> {
  apiVersion: KubeCtlApiVersion;
  kind: KubeCtlKind;
  metadata: T;
  spec: U;
}

export type KubeCtlNamespaceMetaData = {
  creationTimestamp: string;
  name: string;
  namespace: string;
  resourceVersion: string;
  selfLink: string;
  uid: string;
};

export type KubeCtlPodMetaData = {
  name: string;
};

export type KubeCtlPodSpec = {
  containers: KubeCtlPodContainer[];
};

export type KubeCtlPodContainer = {
  env: { name: string; value: string }[];
  image: string;
  ports: { containerPort: number; name: string; protocol: string }[];
};

export type ServicePort = { name: string; port: number };
